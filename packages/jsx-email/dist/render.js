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

// src/render.tsx
var render_exports = {};
__export(render_exports, {
  renderToHtml: () => renderToHtml,
  renderToPlainText: () => renderToPlainText,
  standardComponents: () => standardComponents
});
module.exports = __toCommonJS(render_exports);
var import_jsx_email2 = require("jsx-email");
var import_core = require("@json-render/core");

// src/components/standard.tsx
var import_jsx_email = require("jsx-email");
var import_jsx_runtime = require("react/jsx-runtime");
function HtmlComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_email.Html, { lang: p.lang ?? void 0, dir: p.dir ?? void 0, children });
}
function HeadComponent({
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_email.Head, { children });
}
function BodyComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_email.Body, { style: p.style ?? void 0, children });
}
function ContainerComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_email.Container, { style: p.style ?? void 0, children });
}
function SectionComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_email.Section, { style: p.style ?? void 0, children });
}
function RowComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_email.Row, { style: p.style ?? void 0, children });
}
function ColumnComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_email.Column, { style: p.style ?? void 0, children });
}
function HeadingComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_email.Heading, { as: p.as ?? "h2", style: p.style ?? void 0, children: p.text });
}
function TextComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_email.Text, { style: p.style ?? void 0, children: p.text });
}
function LinkComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_email.Link, { href: p.href, style: p.style ?? void 0, children: p.text });
}
function ButtonComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_jsx_email.Button,
    {
      href: p.href,
      width: p.width,
      height: p.height,
      backgroundColor: p.backgroundColor ?? void 0,
      textColor: p.textColor ?? void 0,
      borderColor: p.borderColor ?? void 0,
      borderRadius: p.borderRadius ?? void 0,
      borderSize: p.borderSize ?? void 0,
      fontSize: p.fontSize ?? void 0,
      align: p.align ?? void 0,
      style: p.style ?? void 0,
      children: p.text
    }
  );
}
function ImageComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_jsx_email.Img,
    {
      src: p.src,
      alt: p.alt ?? void 0,
      width: p.width ?? void 0,
      height: p.height ?? void 0,
      style: p.style ?? void 0
    }
  );
}
function HrComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_email.Hr, { style: p.style ?? void 0 });
}
function PreviewComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_email.Preview, { children: p.text });
}
function MarkdownComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_jsx_email.Markdown,
    {
      markdownContainerStyles: p.markdownContainerStyles ?? void 0,
      markdownCustomStyles: p.markdownCustomStyles ?? void 0,
      children: p.content
    }
  );
}
function CodeComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_jsx_email.Code,
    {
      language: p.language,
      theme: p.theme ?? void 0,
      style: p.style ?? void 0,
      children: p.content
    }
  );
}
function FontComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_jsx_email.Font,
    {
      fontFamily: p.fontFamily,
      fallbackFontFamily: p.fallbackFontFamily,
      fontStyle: p.fontStyle ?? void 0,
      fontWeight: p.fontWeight ?? void 0,
      webFont: p.webFont ?? void 0
    }
  );
}
function TailwindComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_email.Tailwind, { production: p.production ?? void 0, children });
}
function ConditionalComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_jsx_email.Conditional,
    {
      expression: p.expression ?? void 0,
      mso: p.mso ?? void 0,
      head: p.head ?? void 0,
      children
    }
  );
}
function RawComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_jsx_email.Raw,
    {
      content: p.content,
      disablePlainTextOutput: p.disablePlainTextOutput ?? void 0
    }
  );
}
function BackgroundComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_jsx_email.Background,
    {
      src: p.src,
      bgColor: p.bgColor ?? void 0,
      bgRepeat: p.bgRepeat ?? void 0,
      width: p.width ?? void 0,
      height: p.height ?? void 0,
      style: p.style ?? void 0,
      children
    }
  );
}
function ColorSchemeComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_email.ColorScheme, { mode: p.mode });
}
var standardComponents = {
  Html: HtmlComponent,
  Head: HeadComponent,
  Body: BodyComponent,
  Container: ContainerComponent,
  Section: SectionComponent,
  Row: RowComponent,
  Column: ColumnComponent,
  Heading: HeadingComponent,
  Text: TextComponent,
  Link: LinkComponent,
  Button: ButtonComponent,
  Image: ImageComponent,
  Hr: HrComponent,
  Preview: PreviewComponent,
  Markdown: MarkdownComponent,
  Code: CodeComponent,
  Font: FontComponent,
  Tailwind: TailwindComponent,
  Conditional: ConditionalComponent,
  Raw: RawComponent,
  Background: BackgroundComponent,
  ColorScheme: ColorSchemeComponent
};

// src/render.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var noopEmit = () => {
};
function renderElement(elementKey, spec, registry, stateModel, repeatItem, repeatIndex, repeatBasePath) {
  const element = spec.elements[elementKey];
  if (!element) return null;
  const ctx = {
    stateModel,
    repeatItem,
    repeatIndex,
    repeatBasePath
  };
  if (element.visible !== void 0) {
    if (!(0, import_core.evaluateVisibility)(element.visible, ctx)) {
      return null;
    }
  }
  const resolvedProps = (0, import_core.resolveElementProps)(
    element.props,
    ctx
  );
  const resolvedElement = { ...element, props: resolvedProps };
  const Component = registry[resolvedElement.type];
  if (!Component) return null;
  if (resolvedElement.repeat) {
    const items = (0, import_core.getByPath)(stateModel, resolvedElement.repeat.statePath) ?? [];
    const repeat = resolvedElement.repeat;
    const fragments = items.map((item, index) => {
      const repeatKey = repeat.key;
      const key = repeatKey && typeof item === "object" && item !== null ? String(item[repeatKey] ?? index) : String(index);
      const childPath = `${repeat.statePath}/${index}`;
      const children2 = resolvedElement.children?.map(
        (childKey) => renderElement(
          childKey,
          spec,
          registry,
          stateModel,
          item,
          index,
          childPath
        )
      );
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Component, { element: resolvedElement, emit: noopEmit, children: children2 }, key);
    });
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: fragments });
  }
  const children = resolvedElement.children?.map(
    (childKey) => renderElement(
      childKey,
      spec,
      registry,
      stateModel,
      repeatItem,
      repeatIndex,
      repeatBasePath
    )
  );
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Component, { element: resolvedElement, emit: noopEmit, children: children && children.length > 0 ? children : void 0 }, elementKey);
}
function buildDocument(spec, options = {}) {
  const {
    registry: customRegistry,
    includeStandard = true,
    state = {}
  } = options;
  const mergedState = {
    ...spec.state,
    ...state
  };
  const registry = {
    ...includeStandard ? standardComponents : {},
    ...customRegistry
  };
  const root = renderElement(spec.root, spec, registry, mergedState);
  if (!root) {
    console.warn(
      `[json-render/jsx-email] Root element "${spec.root}" not found in spec.elements`
    );
  }
  return root ?? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, {});
}
async function renderToHtml(spec, options) {
  const document = buildDocument(spec, options);
  return (0, import_jsx_email2.render)(document);
}
async function renderToPlainText(spec, options) {
  const document = buildDocument(spec, options);
  return (0, import_jsx_email2.render)(document, { plainText: true });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  renderToHtml,
  renderToPlainText,
  standardComponents
});
//# sourceMappingURL=render.js.map