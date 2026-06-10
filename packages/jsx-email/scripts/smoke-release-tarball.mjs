import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  symlinkSync,
  writeFileSync,
  appendFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const entryPoints = [
  "@json-render/jsx-email",
  "@json-render/jsx-email/render",
  "@json-render/jsx-email/catalog",
  "@json-render/jsx-email/server",
];

const packageDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packageJsonPath = join(packageDir, "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
const requireFromPackage = createRequire(packageJsonPath);

const args = process.argv.slice(2);

function readOption(name) {
  const index = args.indexOf(name);
  if (index === -1) {
    return undefined;
  }

  const value = args[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${name} requires a value`);
  }

  return value;
}

function resolvePackageRoot(packageName) {
  let currentDir = dirname(requireFromPackage.resolve(packageName));
  let packageRoot;

  while (currentDir !== dirname(currentDir)) {
    const candidatePackageJson = join(currentDir, "package.json");

    if (existsSync(candidatePackageJson)) {
      const candidate = JSON.parse(readFileSync(candidatePackageJson, "utf8"));

      if (candidate.name === packageName) {
        packageRoot = currentDir;
      }
    }

    currentDir = dirname(currentDir);
  }

  if (packageRoot) {
    return packageRoot;
  }

  throw new Error(`Could not resolve package root for ${packageName}`);
}

const packDestination =
  readOption("--pack-destination") ??
  mkdtempSync(join(tmpdir(), "json-render-jsx-email-pack-"));
const providedTarball = readOption("--tarball");

mkdirSync(packDestination, { recursive: true });

const tarballName = `${packageJson.name
  .replace(/^@/, "")
  .replace("/", "-")}-${packageJson.version}.tgz`;

const tarballPath = providedTarball
  ? resolve(providedTarball)
  : join(resolve(packDestination), tarballName);

if (!providedTarball) {
  execFileSync("pnpm", ["pack", "--pack-destination", packDestination], {
    cwd: packageDir,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

if (!existsSync(tarballPath)) {
  throw new Error(`Expected tarball at ${tarballPath}`);
}

const contents = execFileSync("tar", ["-tzf", tarballPath], {
  encoding: "utf8",
}).trim().split("\n");

const requiredFiles = [
  "package/package.json",
  "package/dist/index.mjs",
  "package/dist/index.js",
  "package/dist/render.mjs",
  "package/dist/render.js",
  "package/dist/catalog.mjs",
  "package/dist/catalog.js",
  "package/dist/server.mjs",
  "package/dist/server.js",
];

for (const file of requiredFiles) {
  if (!contents.includes(file)) {
    throw new Error(`Tarball is missing ${file}`);
  }
}

const extractDir = mkdtempSync(join(tmpdir(), "json-render-jsx-email-unpack-"));
execFileSync("tar", ["-xzf", tarballPath, "-C", extractDir], {
  encoding: "utf8",
});

const consumerDir = mkdtempSync(join(tmpdir(), "json-render-jsx-email-consumer-"));
const consumerNodeModules = join(consumerDir, "node_modules");
const scopedPackageDir = join(consumerNodeModules, "@json-render");
const installedPackageDir = join(scopedPackageDir, "jsx-email");

mkdirSync(scopedPackageDir, { recursive: true });
cpSync(join(extractDir, "package"), installedPackageDir, { recursive: true });

for (const dependencyName of ["@json-render/core", "jsx-email", "react", "zod"]) {
  const dependencyDir = realpathSync(resolvePackageRoot(dependencyName));
  const dependencyTarget = join(consumerNodeModules, dependencyName);

  mkdirSync(dirname(dependencyTarget), { recursive: true });
  symlinkSync(dependencyDir, dependencyTarget, "dir");
}

writeFileSync(
  join(consumerDir, "package.json"),
  JSON.stringify({ type: "module" }, null, 2),
);

const importScript = `
const entryPoints = ${JSON.stringify(entryPoints)};

for (const specifier of entryPoints) {
  const mod = await import(specifier);
  if (Object.keys(mod).length === 0) {
    throw new Error(\`No exports loaded for \${specifier}\`);
  }
  console.log(\`Loaded \${specifier}\`);
}
`;

const output = execFileSync(
  process.execPath,
  ["--input-type=module", "--eval", importScript],
  {
    cwd: consumerDir,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  },
);

console.log(`Produced ${tarballPath}`);
console.log(output.trim());

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `tgz=${tarballPath}\n`);
}
