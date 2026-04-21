import React from "react";
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
  ColorScheme as EmailColorScheme,
} from "jsx-email";
import type { ComponentRenderProps } from "../renderer";
import type { ComponentRegistry } from "../renderer";
import type { StandardComponentProps } from "../catalog";

// =============================================================================
// Document Structure
// =============================================================================

function HtmlComponent({
  element,
  children,
}: ComponentRenderProps<StandardComponentProps<"Html">>) {
  const p = element.props;

  return (
    <EmailHtml lang={p.lang ?? undefined} dir={p.dir ?? undefined}>
      {children}
    </EmailHtml>
  );
}

function HeadComponent({
  children,
}: ComponentRenderProps<StandardComponentProps<"Head">>) {
  return <EmailHead>{children}</EmailHead>;
}

function BodyComponent({
  element,
  children,
}: ComponentRenderProps<StandardComponentProps<"Body">>) {
  const p = element.props;

  return <EmailBody style={p.style ?? undefined}>{children}</EmailBody>;
}

function ContainerComponent({
  element,
  children,
}: ComponentRenderProps<StandardComponentProps<"Container">>) {
  const p = element.props;

  return (
    <EmailContainer style={p.style ?? undefined}>{children}</EmailContainer>
  );
}

function SectionComponent({
  element,
  children,
}: ComponentRenderProps<StandardComponentProps<"Section">>) {
  const p = element.props;

  return <EmailSection style={p.style ?? undefined}>{children}</EmailSection>;
}

function RowComponent({
  element,
  children,
}: ComponentRenderProps<StandardComponentProps<"Row">>) {
  const p = element.props;

  return <EmailRow style={p.style ?? undefined}>{children}</EmailRow>;
}

function ColumnComponent({
  element,
  children,
}: ComponentRenderProps<StandardComponentProps<"Column">>) {
  const p = element.props;

  return <EmailColumn style={p.style ?? undefined}>{children}</EmailColumn>;
}

// =============================================================================
// Content Components
// =============================================================================

function HeadingComponent({
  element,
}: ComponentRenderProps<StandardComponentProps<"Heading">>) {
  const p = element.props;

  return (
    <EmailHeading as={p.as ?? "h2"} style={p.style ?? undefined}>
      {p.text}
    </EmailHeading>
  );
}

function TextComponent({
  element,
}: ComponentRenderProps<StandardComponentProps<"Text">>) {
  const p = element.props;

  return <EmailText style={p.style ?? undefined}>{p.text}</EmailText>;
}

function LinkComponent({
  element,
}: ComponentRenderProps<StandardComponentProps<"Link">>) {
  const p = element.props;

  return (
    <EmailLink href={p.href} style={p.style ?? undefined}>
      {p.text}
    </EmailLink>
  );
}

function ButtonComponent({
  element,
}: ComponentRenderProps<StandardComponentProps<"Button">>) {
  const p = element.props;

  return (
    <EmailButton
      href={p.href}
      width={p.width}
      height={p.height}
      backgroundColor={p.backgroundColor ?? undefined}
      textColor={p.textColor ?? undefined}
      borderColor={p.borderColor ?? undefined}
      borderRadius={p.borderRadius ?? undefined}
      borderSize={p.borderSize ?? undefined}
      fontSize={p.fontSize ?? undefined}
      align={p.align ?? undefined}
      style={p.style ?? undefined}
    >
      {p.text}
    </EmailButton>
  );
}

function ImageComponent({
  element,
}: ComponentRenderProps<StandardComponentProps<"Image">>) {
  const p = element.props;

  return (
    <EmailImg
      src={p.src}
      alt={p.alt ?? undefined}
      width={p.width ?? undefined}
      height={p.height ?? undefined}
      style={p.style ?? undefined}
    />
  );
}

function HrComponent({
  element,
}: ComponentRenderProps<StandardComponentProps<"Hr">>) {
  const p = element.props;

  return <EmailHr style={p.style ?? undefined} />;
}

// =============================================================================
// Utility Components
// =============================================================================

function PreviewComponent({
  element,
}: ComponentRenderProps<StandardComponentProps<"Preview">>) {
  const p = element.props;

  return <EmailPreview>{p.text}</EmailPreview>;
}

function MarkdownComponent({
  element,
}: ComponentRenderProps<StandardComponentProps<"Markdown">>) {
  const p = element.props;

  return (
    <EmailMarkdown
      markdownContainerStyles={p.markdownContainerStyles ?? undefined}
      markdownCustomStyles={p.markdownCustomStyles ?? undefined}
    >
      {p.content}
    </EmailMarkdown>
  );
}

// =============================================================================
// jsx-email Extras
// =============================================================================

function CodeComponent({
  element,
}: ComponentRenderProps<StandardComponentProps<"Code">>) {
  const p = element.props;

  return (
    <EmailCode
      language={p.language as any}
      theme={p.theme ?? undefined}
      style={p.style ?? undefined}
    >
      {p.content}
    </EmailCode>
  );
}

function FontComponent({
  element,
}: ComponentRenderProps<StandardComponentProps<"Font">>) {
  const p = element.props;

  return (
    <EmailFont
      fontFamily={p.fontFamily}
      fallbackFontFamily={p.fallbackFontFamily}
      fontStyle={p.fontStyle ?? undefined}
      fontWeight={p.fontWeight ?? undefined}
      webFont={p.webFont ?? undefined}
    />
  );
}

function TailwindComponent({
  element,
  children,
}: ComponentRenderProps<StandardComponentProps<"Tailwind">>) {
  const p = element.props;

  return (
    <EmailTailwind production={p.production ?? undefined}>
      {children}
    </EmailTailwind>
  );
}

function ConditionalComponent({
  element,
  children,
}: ComponentRenderProps<StandardComponentProps<"Conditional">>) {
  const p = element.props;

  return (
    <EmailConditional
      expression={p.expression ?? undefined}
      mso={p.mso ?? undefined}
      head={p.head ?? undefined}
    >
      {children}
    </EmailConditional>
  );
}

function RawComponent({
  element,
}: ComponentRenderProps<StandardComponentProps<"Raw">>) {
  const p = element.props;

  return (
    <EmailRaw
      content={p.content}
      disablePlainTextOutput={p.disablePlainTextOutput ?? undefined}
    />
  );
}

function BackgroundComponent({
  element,
  children,
}: ComponentRenderProps<StandardComponentProps<"Background">>) {
  const p = element.props;

  return (
    <EmailBackground
      src={p.src}
      bgColor={p.bgColor ?? undefined}
      bgRepeat={p.bgRepeat ?? undefined}
      width={p.width ?? undefined}
      height={p.height ?? undefined}
      style={p.style ?? undefined}
    >
      {children}
    </EmailBackground>
  );
}

function ColorSchemeComponent({
  element,
}: ComponentRenderProps<StandardComponentProps<"ColorScheme">>) {
  const p = element.props;

  return <EmailColorScheme mode={p.mode} />;
}

// =============================================================================
// Registry
// =============================================================================

export const standardComponents: ComponentRegistry = {
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
  ColorScheme: ColorSchemeComponent,
};
