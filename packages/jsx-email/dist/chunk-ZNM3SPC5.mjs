// src/render.tsx
import { render } from "jsx-email";
import {
  resolveElementProps,
  evaluateVisibility,
  getByPath
} from "@json-render/core";

// src/components/standard.tsx
import {
  Html as EmailHtml,
  Head as EmailHead,
  Body as EmailBody,
  Container as EmailContainer,
  Section as EmailSection,
  Row as EmailRow,
  Column as EmailColumn,
  Heading as EmailHeading,
  Text as EmailText,
  Link as EmailLink,
  Button as EmailButton,
  Img as EmailImg,
  Hr as EmailHr,
  Preview as EmailPreview,
  Markdown as EmailMarkdown,
  Code as EmailCode,
  Font as EmailFont,
  Tailwind as EmailTailwind,
  Conditional as EmailConditional,
  Raw as EmailRaw,
  Background as EmailBackground,
  ColorScheme as EmailColorScheme
} from "jsx-email";
import { jsx } from "react/jsx-runtime";
function HtmlComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ jsx(EmailHtml, { lang: p.lang ?? void 0, dir: p.dir ?? void 0, children });
}
function HeadComponent({
  children
}) {
  return /* @__PURE__ */ jsx(EmailHead, { children });
}
function BodyComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ jsx(EmailBody, { style: p.style ?? void 0, children });
}
function ContainerComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ jsx(EmailContainer, { style: p.style ?? void 0, children });
}
function SectionComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ jsx(EmailSection, { style: p.style ?? void 0, children });
}
function RowComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ jsx(EmailRow, { style: p.style ?? void 0, children });
}
function ColumnComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ jsx(EmailColumn, { style: p.style ?? void 0, children });
}
function HeadingComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ jsx(EmailHeading, { as: p.as ?? "h2", style: p.style ?? void 0, children: p.text });
}
function TextComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ jsx(EmailText, { style: p.style ?? void 0, children: p.text });
}
function LinkComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ jsx(EmailLink, { href: p.href, style: p.style ?? void 0, children: p.text });
}
function ButtonComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ jsx(
    EmailButton,
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
  return /* @__PURE__ */ jsx(
    EmailImg,
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
  return /* @__PURE__ */ jsx(EmailHr, { style: p.style ?? void 0 });
}
function PreviewComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ jsx(EmailPreview, { children: p.text });
}
function MarkdownComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ jsx(
    EmailMarkdown,
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
  return /* @__PURE__ */ jsx(
    EmailCode,
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
  return /* @__PURE__ */ jsx(
    EmailFont,
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
  return /* @__PURE__ */ jsx(EmailTailwind, { production: p.production ?? void 0, children });
}
function ConditionalComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ jsx(
    EmailConditional,
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
  return /* @__PURE__ */ jsx(
    EmailRaw,
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
  return /* @__PURE__ */ jsx(
    EmailBackground,
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
  return /* @__PURE__ */ jsx(EmailColorScheme, { mode: p.mode });
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
import { Fragment, jsx as jsx2 } from "react/jsx-runtime";
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
    if (!evaluateVisibility(element.visible, ctx)) {
      return null;
    }
  }
  const resolvedProps = resolveElementProps(
    element.props,
    ctx
  );
  const resolvedElement = { ...element, props: resolvedProps };
  const Component = registry[resolvedElement.type];
  if (!Component) return null;
  if (resolvedElement.repeat) {
    const items = getByPath(stateModel, resolvedElement.repeat.statePath) ?? [];
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
      return /* @__PURE__ */ jsx2(Component, { element: resolvedElement, emit: noopEmit, children: children2 }, key);
    });
    return /* @__PURE__ */ jsx2(Fragment, { children: fragments });
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
  return /* @__PURE__ */ jsx2(Component, { element: resolvedElement, emit: noopEmit, children: children && children.length > 0 ? children : void 0 }, elementKey);
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
  return root ?? /* @__PURE__ */ jsx2(Fragment, {});
}
async function renderToHtml(spec, options) {
  const document = buildDocument(spec, options);
  return render(document);
}
async function renderToPlainText(spec, options) {
  const document = buildDocument(spec, options);
  return render(document, { plainText: true });
}

export {
  standardComponents,
  renderToHtml,
  renderToPlainText
};
//# sourceMappingURL=chunk-ZNM3SPC5.mjs.map