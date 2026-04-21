import React, { ComponentType, ReactNode } from 'react';
import { Catalog, UIElement, SchemaDefinition, Spec } from '@json-render/core';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { C as Components } from './catalog-types-Dh9gul8V.mjs';

interface ComponentRenderProps<P = Record<string, unknown>> {
    element: UIElement<string, P>;
    children?: ReactNode;
    emit: (event: string) => void;
    bindings?: Record<string, string>;
    loading?: boolean;
}
type ComponentRenderer<P = Record<string, unknown>> = ComponentType<ComponentRenderProps<P>>;
type ComponentRegistry = Record<string, ComponentRenderer<any>>;
interface RendererProps {
    spec: Spec | null;
    registry?: ComponentRegistry;
    includeStandard?: boolean;
    loading?: boolean;
    fallback?: ComponentRenderer;
}
declare function Renderer({ spec, registry: customRegistry, includeStandard, loading, fallback, }: RendererProps): react_jsx_runtime.JSX.Element | null;
interface JSONUIProviderProps {
    initialState?: Record<string, unknown>;
    handlers?: Record<string, (params: Record<string, unknown>) => Promise<unknown> | unknown>;
    navigate?: (path: string) => void;
    validationFunctions?: Record<string, (value: unknown, args?: Record<string, unknown>) => boolean>;
    onStateChange?: (path: string, value: unknown) => void;
    children: ReactNode;
}
declare function JSONUIProvider({ initialState, handlers, navigate, validationFunctions, onStateChange, children, }: JSONUIProviderProps): react_jsx_runtime.JSX.Element;
interface DefineRegistryResult {
    registry: ComponentRegistry;
}
declare function defineRegistry<C extends Catalog>(_catalog: C, options: {
    components?: Components<C>;
}): DefineRegistryResult;
interface CreateRendererProps {
    spec: Spec | null;
    state?: Record<string, unknown>;
    onAction?: (actionName: string, params?: Record<string, unknown>) => void;
    onStateChange?: (path: string, value: unknown) => void;
    loading?: boolean;
    fallback?: ComponentRenderer;
}
type ComponentMap<TComponents extends Record<string, {
    props: unknown;
}>> = {
    [K in keyof TComponents]: ComponentType<ComponentRenderProps<TComponents[K]["props"] extends {
        _output: infer O;
    } ? O : Record<string, unknown>>>;
};
declare function createRenderer<TDef extends SchemaDefinition, TCatalog extends {
    components: Record<string, {
        props: unknown;
    }>;
}>(catalog: Catalog<TDef, TCatalog>, components: ComponentMap<TCatalog["components"]>): ComponentType<CreateRendererProps>;

declare const standardComponents: ComponentRegistry;

type RenderComponentRegistry = Record<string, React.ComponentType<any>>;
interface RenderOptions {
    registry?: RenderComponentRegistry;
    includeStandard?: boolean;
    state?: Record<string, unknown>;
}
/**
 * Render a json-render spec to an HTML email string using jsx-email.
 *
 * This is a standalone server-side function that resolves the spec tree
 * without React hooks or contexts, making it safe to import in Next.js
 * route handlers and other server-only environments.
 */
declare function renderToHtml(spec: Spec, options?: RenderOptions): Promise<string>;
/**
 * Render a json-render spec to a plain text email string using jsx-email.
 */
declare function renderToPlainText(spec: Spec, options?: RenderOptions): Promise<string>;

export { type CreateRendererProps as C, type DefineRegistryResult as D, JSONUIProvider as J, Renderer as R, type ComponentMap as a, type ComponentRenderProps as b, createRenderer as c, defineRegistry as d, type ComponentRenderer as e, type ComponentRegistry as f, type RendererProps as g, type JSONUIProviderProps as h, renderToPlainText as i, type RenderOptions as j, type RenderComponentRegistry as k, renderToHtml as r, standardComponents as s };
