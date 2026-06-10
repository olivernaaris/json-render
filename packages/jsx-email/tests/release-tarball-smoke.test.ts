import { execFileSync } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("@json-render/jsx-email release tarball smoke", () => {
  it("loads Segmentflow entry points from the packed tarball shape", () => {
    const packDir = mkdtempSync(join(tmpdir(), "json-render-jsx-email-pack-"));

    const output = execFileSync(
      "pnpm",
      [
        "--filter",
        "@json-render/jsx-email",
        "smoke:tarball",
        "--",
        "--pack-destination",
        packDir,
      ],
      {
        cwd: join(__dirname, "../../.."),
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      },
    );

    expect(output).toContain("Loaded @json-render/jsx-email");
    expect(output).toContain("Loaded @json-render/jsx-email/render");
    expect(output).toContain("Loaded @json-render/jsx-email/catalog");
    expect(output).toContain("Loaded @json-render/jsx-email/server");
  });
});
