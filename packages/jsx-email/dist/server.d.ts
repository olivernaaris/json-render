import * as _json_render_core from '@json-render/core';
export { Spec, StateModel } from '@json-render/core';
export { StandardComponentDefinitions, StandardComponentProps, standardComponentDefinitions } from './catalog.js';
export { a as ComponentContext, b as ComponentFn, C as Components, S as SetState } from './catalog-types-Dh9gul8V.js';
import 'zod';
import 'react';

/**
 * The schema for @json-render/jsx-email
 *
 * Defines:
 * - Spec: A flat tree of elements with keys, types, props, and children references
 * - Catalog: Components with props schemas
 *
 * Reuses the same { root, elements } spec format as the React, React Native,
 * and React Email renderers.
 */
declare const schema: _json_render_core.Schema<{
    spec: _json_render_core.SchemaType<"object", {
        root: _json_render_core.SchemaType<"string", unknown>;
        elements: _json_render_core.SchemaType<"record", _json_render_core.SchemaType<"object", {
            type: _json_render_core.SchemaType<"ref", string>;
            props: _json_render_core.SchemaType<"propsOf", string>;
            children: _json_render_core.SchemaType<"array", _json_render_core.SchemaType<"string", unknown>>;
            visible: _json_render_core.SchemaType<"any", unknown>;
        }>>;
    }>;
    catalog: _json_render_core.SchemaType<"object", {
        components: _json_render_core.SchemaType<"map", {
            props: _json_render_core.SchemaType<"zod", unknown>;
            slots: _json_render_core.SchemaType<"array", _json_render_core.SchemaType<"string", unknown>>;
            description: _json_render_core.SchemaType<"string", unknown>;
            example: _json_render_core.SchemaType<"any", unknown>;
        }>;
    }>;
}>;
type JsxEmailSchema = typeof schema;
type JsxEmailSpec<TCatalog> = typeof schema extends {
    createCatalog: (catalog: TCatalog) => {
        _specType: infer S;
    };
} ? S : never;

export { type JsxEmailSchema, type JsxEmailSpec, schema };
