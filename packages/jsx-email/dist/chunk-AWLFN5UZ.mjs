// src/schema.ts
import { defineSchema } from "@json-render/core";
var schema = defineSchema(
  (s) => ({
    spec: s.object({
      root: s.string(),
      elements: s.record(
        s.object({
          type: s.ref("catalog.components"),
          props: s.propsOf("catalog.components"),
          children: s.array(s.string()),
          visible: s.any()
        })
      )
    }),
    catalog: s.object({
      components: s.map({
        props: s.zod(),
        slots: s.array(s.string()),
        description: s.string(),
        example: s.any()
      })
    })
  }),
  {
    defaultRules: [
      "The root element MUST be an Html component. Its children MUST include Head and Body components.",
      "Body should contain a Container component to constrain width (typically 600px max for email clients).",
      "All styles MUST be inline. Email clients strip <style> tags, so every component that accepts a style prop should use it for visual customization.",
      "Image src must be a fully qualified URL (absolute, not relative). For placeholder images use https://picsum.photos/{width}/{height}?random={n}.",
      "Emails are static documents. There are no interactive actions or form inputs.",
      "Use Section, Row, and Column for layout. These map to table-based email structures for maximum compatibility.",
      "Use Preview to set the preview text shown in email client inboxes before opening.",
      "Use Heading (h1-h6) and Text for all text content. Raw strings are not supported.",
      "Button renders as a link styled as a button. Always provide both text and href.",
      "Prefer Tailwind for styling when the design calls for utility classes \u2014 wrap Body (or a subtree) in a Tailwind component to enable Tailwind class names on descendants.",
      "Use Conditional to show content only in specific email clients (e.g., Outlook via MSO comments).",
      "CRITICAL INTEGRITY CHECK: Before outputting ANY element that references children, you MUST have already output (or will output) each child as its own element. If an element has children: ['a', 'b'], then elements 'a' and 'b' MUST exist."
    ]
  }
);

export {
  schema
};
//# sourceMappingURL=chunk-AWLFN5UZ.mjs.map