import React from "react";
import { Text } from "jsx-email";
import { describe, expect, it } from "vitest";
import type { Spec } from "@json-render/core";
import { defineRegistry } from "./renderer";
import { renderToHtml, renderToPlainText } from "./render";

function htmlSpec(elements: Spec["elements"]): Spec {
  return {
    root: "html",
    elements: {
      html: {
        type: "Html",
        props: { lang: "en", dir: "ltr" },
        children: ["head", "body"],
      },
      head: {
        type: "Head",
        props: {},
        children: [],
      },
      body: {
        type: "Body",
        props: {},
        children: Object.keys(elements),
      },
      ...elements,
    },
  };
}

describe("jsx-email server rendering", () => {
  it("renders primitive specs through HTML and plain text APIs", async () => {
    const spec = htmlSpec({
      heading: {
        type: "Heading",
        props: { text: "Welcome", as: "h1", style: null },
        children: [],
      },
      intro: {
        type: "Text",
        props: { text: "Thanks for joining.", style: null },
        children: [],
      },
    });

    await expect(renderToHtml(spec)).resolves.toContain("Welcome");
    await expect(renderToPlainText(spec)).resolves.toContain(
      "Thanks for joining.",
    );
  });

  it("renders custom registry components on the server", async () => {
    const { registry } = defineRegistry(null as never, {
      components: {
        Alert: ({ props }) => (
          <Text>{(props as { message: string }).message}</Text>
        ),
      },
    });

    const spec = htmlSpec({
      alert: {
        type: "Alert",
        props: { message: "Inventory is low" },
        children: [],
      },
    });

    const html = await renderToHtml(spec, { registry });

    expect(html).toContain("Inventory is low");
  });

  it("resolves repeated element props and visibility inside each item scope", async () => {
    const { registry } = defineRegistry(null as never, {
      components: {
        ProductRow: ({ props }) => {
          const p = props as { name: string; position: number };
          return <Text>{`${p.position}:${p.name}`}</Text>;
        },
      },
    });

    const spec = htmlSpec({
      productRow: {
        type: "ProductRow",
        props: {
          name: { $item: "name" },
          position: { $index: true },
        },
        visible: { $item: "inStock", eq: true },
        repeat: { statePath: "/products", key: "id" },
        children: [],
      },
    });

    const html = await renderToHtml(spec, {
      registry,
      state: {
        products: [
          { id: "sku-1", name: "Tea", inStock: true },
          { id: "sku-2", name: "Coffee", inStock: false },
        ],
      },
    });

    expect(html).toContain("0:Tea");
    expect(html).not.toContain("Coffee");
  });

  it("evaluates visible on the repeated element itself with $item scope", async () => {
    const { registry } = defineRegistry(null as never, {
      components: {
        ProductTile: ({ props }) => {
          const p = props as { name: string };
          return <Text>{p.name}</Text>;
        },
      },
    });

    const spec = htmlSpec({
      productTile: {
        type: "ProductTile",
        props: {
          name: { $item: "name" },
        },
        visible: { $item: "onSale", eq: true },
        repeat: { statePath: "/products", key: "id" },
        children: [],
      },
    });

    const html = await renderToHtml(spec, {
      registry,
      state: {
        products: [
          { id: "sale", name: "Discounted Tea", onSale: true },
          { id: "full-price", name: "Full Price Coffee", onSale: false },
        ],
      },
    });

    expect(html).toContain("Discounted Tea");
    expect(html).not.toContain("Full Price Coffee");
  });

  it("resolves state, repeat scopes, conditions, visibility, and templates", async () => {
    const spec = htmlSpec({
      list: {
        type: "Section",
        props: { style: null },
        repeat: { statePath: "/products", key: "id" },
        children: ["name", "index", "badge"],
      },
      name: {
        type: "Text",
        props: {
          text: { $template: "${name} for ${/customer/name}" },
          style: null,
        },
        visible: { $item: "inStock", eq: true },
        children: [],
      },
      index: {
        type: "Text",
        props: { text: { $index: true }, style: null },
        visible: { $item: "inStock", eq: true },
        children: [],
      },
      badge: {
        type: "Text",
        props: {
          text: {
            $cond: { $item: "discounted", eq: true },
            $then: "Discount",
            $else: { $state: "/fallbackBadge" },
          },
          style: null,
        },
        visible: { $item: "inStock", eq: true },
        children: [],
      },
    });

    const html = await renderToHtml(spec, {
      state: {
        customer: { name: "Ada" },
        fallbackBadge: "Regular",
        products: [
          { id: "sku-1", name: "Tea", inStock: true, discounted: true },
          { id: "sku-2", name: "Coffee", inStock: false, discounted: false },
        ],
      },
    });

    expect(html).toContain("Tea for Ada");
    expect(html).toContain("Discount");
    expect(html).toContain(">0<");
    expect(html).not.toContain("Coffee");
    expect(html).not.toContain("Regular");
  });

  it("treats omitted or null props as empty props", async () => {
    const spec = htmlSpec({
      noPropsContainer: {
        type: "Container",
        children: ["nullPropsHr", "text"],
      } as Spec["elements"][string],
      nullPropsHr: {
        type: "Hr",
        props: null,
        children: [],
      } as unknown as Spec["elements"][string],
      text: {
        type: "Text",
        props: { text: "Still renders", style: null },
        children: [],
      },
    });

    await expect(renderToHtml(spec)).resolves.toContain("Still renders");
  });
});
