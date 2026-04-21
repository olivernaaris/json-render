// Server-safe entry point: schema and catalog definitions only.
// Does not import React or `jsx-email`.

export { schema, type JsxEmailSchema, type JsxEmailSpec } from "./schema";

export {
  standardComponentDefinitions,
  type StandardComponentDefinitions,
  type StandardComponentProps,
} from "./catalog";

export type { Spec } from "@json-render/core";

export type {
  SetState,
  StateModel,
  ComponentContext,
  ComponentFn,
  Components,
} from "./catalog-types";
