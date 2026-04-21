"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/catalog.ts
var catalog_exports = {};
__export(catalog_exports, {
  standardComponentDefinitions: () => standardComponentDefinitions
});
module.exports = __toCommonJS(catalog_exports);
var import_zod = require("zod");
var styleSchema = import_zod.z.record(import_zod.z.string(), import_zod.z.any()).nullable();
var standardComponentDefinitions = {
  // ==========================================================================
  // Document Structure
  // ==========================================================================
  Html: {
    props: import_zod.z.object({
      lang: import_zod.z.string().nullable(),
      dir: import_zod.z.enum(["ltr", "rtl"]).nullable()
    }),
    slots: ["default"],
    description: "Top-level HTML email wrapper. Must be the root element. Children should include Head and Body.",
    example: { lang: "en", dir: "ltr" }
  },
  Head: {
    props: import_zod.z.object({}),
    slots: ["default"],
    description: "Email head section. Place inside Html. Can contain Font and Preview components.",
    example: {}
  },
  Body: {
    props: import_zod.z.object({
      style: styleSchema
    }),
    slots: ["default"],
    description: "Email body wrapper. Place inside Html after Head. Contains all visible email content.",
    example: { style: { backgroundColor: "#f6f9fc" } }
  },
  Container: {
    props: import_zod.z.object({
      style: styleSchema
    }),
    slots: ["default"],
    description: "Constrains content width for email clients. Place inside Body. Typically max-width 600px.",
    example: {
      style: {
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px 0 48px"
      }
    }
  },
  Section: {
    props: import_zod.z.object({
      style: styleSchema
    }),
    slots: ["default"],
    description: "Groups related content. Renders as a table-based section for email compatibility.",
    example: { style: { padding: "24px", backgroundColor: "#ffffff" } }
  },
  Row: {
    props: import_zod.z.object({
      style: styleSchema
    }),
    slots: ["default"],
    description: "Horizontal layout row. Use inside Section for multi-column layouts.",
    example: { style: {} }
  },
  Column: {
    props: import_zod.z.object({
      style: styleSchema
    }),
    slots: ["default"],
    description: "Column within a Row. Set width via style for proportional layouts.",
    example: { style: { width: "50%" } }
  },
  // ==========================================================================
  // Content Components
  // ==========================================================================
  Heading: {
    props: import_zod.z.object({
      text: import_zod.z.string(),
      as: import_zod.z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]).nullable(),
      style: styleSchema
    }),
    slots: [],
    description: "Heading text at various levels. h1 is largest, h6 is smallest.",
    example: { text: "Welcome!", as: "h1" }
  },
  Text: {
    props: import_zod.z.object({
      text: import_zod.z.string(),
      style: styleSchema
    }),
    slots: [],
    description: "Body text paragraph. Use style for font size, color, weight, and alignment.",
    example: { text: "Thank you for signing up." }
  },
  Link: {
    props: import_zod.z.object({
      text: import_zod.z.string(),
      href: import_zod.z.string(),
      style: styleSchema
    }),
    slots: [],
    description: "Hyperlink with visible text and a URL.",
    example: {
      text: "Visit our website",
      href: "https://example.com",
      style: { color: "#2563eb" }
    }
  },
  Button: {
    props: import_zod.z.object({
      text: import_zod.z.string(),
      href: import_zod.z.string(),
      width: import_zod.z.number(),
      height: import_zod.z.number(),
      backgroundColor: import_zod.z.string().nullable(),
      textColor: import_zod.z.string().nullable(),
      borderColor: import_zod.z.string().nullable(),
      borderRadius: import_zod.z.number().nullable(),
      borderSize: import_zod.z.number().nullable(),
      fontSize: import_zod.z.number().nullable(),
      align: import_zod.z.enum(["left", "center", "right"]).nullable(),
      style: styleSchema
    }),
    slots: [],
    description: "Call-to-action button rendered as a link styled as a button. `width` and `height` are REQUIRED (in pixels) \u2014 jsx-email uses them to compute the button's padding/layout.",
    example: {
      text: "Get Started",
      href: "https://example.com",
      width: 160,
      height: 44,
      backgroundColor: "#5F51E8",
      textColor: "#ffffff",
      borderRadius: 4,
      fontSize: 16
    }
  },
  Image: {
    props: import_zod.z.object({
      src: import_zod.z.string(),
      alt: import_zod.z.string().nullable(),
      width: import_zod.z.number().nullable(),
      height: import_zod.z.number().nullable(),
      style: styleSchema
    }),
    slots: [],
    description: "Image from a URL. src must be a fully qualified URL. Specify width and height for consistent rendering.",
    example: {
      src: "https://picsum.photos/400/200?random=1",
      alt: "Hero image",
      width: 400,
      height: 200
    }
  },
  Hr: {
    props: import_zod.z.object({
      style: styleSchema
    }),
    slots: [],
    description: "Horizontal rule separator between content sections.",
    example: {
      style: { borderColor: "#e6ebf1", margin: "20px 0" }
    }
  },
  // ==========================================================================
  // Utility Components
  // ==========================================================================
  Preview: {
    props: import_zod.z.object({
      text: import_zod.z.string()
    }),
    slots: [],
    description: "Preview text shown in email client inboxes before the email is opened. Place inside Html.",
    example: { text: "You have a new message from Acme Corp" }
  },
  Markdown: {
    props: import_zod.z.object({
      content: import_zod.z.string(),
      markdownContainerStyles: styleSchema,
      markdownCustomStyles: import_zod.z.record(import_zod.z.string(), import_zod.z.any()).nullable()
    }),
    slots: [],
    description: "Renders markdown content as email-safe HTML. Supports headings, paragraphs, lists, links, bold, italic, and code.",
    example: {
      content: "# Hello\n\nThis is **bold** and *italic* text."
    }
  },
  // ==========================================================================
  // jsx-email Extras
  // ==========================================================================
  Code: {
    props: import_zod.z.object({
      content: import_zod.z.string(),
      language: import_zod.z.string(),
      theme: import_zod.z.string().nullable(),
      style: styleSchema
    }),
    slots: [],
    description: "Syntax-highlighted code block. Uses Shiki for highlighting \u2014 language must be a Shiki-supported identifier (e.g. 'typescript', 'python', 'bash'). Optional theme defaults to 'nord'.",
    example: {
      content: "const greeting: string = 'hello';",
      language: "typescript"
    }
  },
  Font: {
    props: import_zod.z.object({
      fontFamily: import_zod.z.string(),
      fallbackFontFamily: import_zod.z.union([
        import_zod.z.enum([
          "Arial",
          "Helvetica",
          "Verdana",
          "Georgia",
          "Times New Roman",
          "serif",
          "sans-serif",
          "monospace",
          "cursive",
          "fantasy"
        ]),
        import_zod.z.array(
          import_zod.z.enum([
            "Arial",
            "Helvetica",
            "Verdana",
            "Georgia",
            "Times New Roman",
            "serif",
            "sans-serif",
            "monospace",
            "cursive",
            "fantasy"
          ])
        )
      ]),
      fontStyle: import_zod.z.string().nullable(),
      fontWeight: import_zod.z.union([import_zod.z.number(), import_zod.z.string()]).nullable(),
      webFont: import_zod.z.object({
        format: import_zod.z.enum([
          "woff",
          "woff2",
          "truetype",
          "opentype",
          "embedded-opentype",
          "svg"
        ]),
        url: import_zod.z.string()
      }).nullable()
    }),
    slots: [],
    description: "Declares a web font for the email. Must be placed inside Head. Not all email clients support web fonts \u2014 always provide a fallbackFontFamily.",
    example: {
      fontFamily: "Inter",
      fallbackFontFamily: "sans-serif",
      webFont: {
        format: "woff2",
        url: "https://fonts.example.com/inter.woff2"
      }
    }
  },
  Tailwind: {
    props: import_zod.z.object({
      production: import_zod.z.boolean().nullable()
    }),
    slots: ["default"],
    description: "Enables Tailwind/UnoCSS utility class names on descendants at render time. Wrap Body (or a subtree) with this to use Tailwind classes via the standard `className` / `class` attribute on supported descendants. Set production: true to prefix class names for production builds.",
    example: { production: false }
  },
  Conditional: {
    props: import_zod.z.object({
      expression: import_zod.z.string().nullable(),
      mso: import_zod.z.boolean().nullable(),
      head: import_zod.z.boolean().nullable()
    }),
    slots: ["default"],
    description: "Wraps children in an email-client conditional comment (e.g. Outlook/MSO). Provide EITHER `expression` (raw IE/MSO expression such as 'mso' or 'gte mso 9') OR `mso: true` \u2014 never both. Set `head: true` when used inside Head.",
    example: { mso: true }
  },
  Raw: {
    props: import_zod.z.object({
      content: import_zod.z.string(),
      disablePlainTextOutput: import_zod.z.boolean().nullable()
    }),
    slots: [],
    description: "Emits raw HTML content verbatim into the output. Use sparingly \u2014 the content is not sanitized. Set disablePlainTextOutput: true to omit the content from plain-text rendering.",
    example: { content: "<!-- tracking pixel -->" }
  },
  Background: {
    props: import_zod.z.object({
      src: import_zod.z.string(),
      bgColor: import_zod.z.string().nullable(),
      bgRepeat: import_zod.z.enum(["repeat", "no-repeat"]).nullable(),
      width: import_zod.z.number().nullable(),
      height: import_zod.z.number().nullable(),
      style: styleSchema
    }),
    slots: ["default"],
    description: "Background image wrapper (renders as a styled <td>). src is a required, fully-qualified image URL. Children render on top of the background.",
    example: {
      src: "https://picsum.photos/600/200?random=42",
      bgRepeat: "no-repeat",
      width: 600,
      height: 200
    }
  },
  ColorScheme: {
    props: import_zod.z.object({
      mode: import_zod.z.enum([
        "dark",
        "dark only",
        "light",
        "light dark",
        "light dark only",
        "light only",
        "normal"
      ])
    }),
    slots: [],
    description: "Declares the email's preferred color scheme (light/dark). Place inside Head.",
    example: { mode: "light dark" }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  standardComponentDefinitions
});
//# sourceMappingURL=catalog.js.map