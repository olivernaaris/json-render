export { JsxEmailSchema, JsxEmailSpec, schema } from './server.js';
import { StateModel, VisibilityCondition, VisibilityContext, ActionHandler, ResolvedAction, ActionBinding, ActionConfirm, ValidationFunction, ValidationResult, ValidationConfig } from '@json-render/core';
export { Spec, StateModel } from '@json-render/core';
export { a as ComponentContext, b as ComponentFn, C as Components, S as SetState } from './catalog-types-Dh9gul8V.js';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
export { a as ComponentMap, f as ComponentRegistry, b as ComponentRenderProps, e as ComponentRenderer, C as CreateRendererProps, D as DefineRegistryResult, J as JSONUIProvider, h as JSONUIProviderProps, j as RenderOptions, R as Renderer, g as RendererProps, c as createRenderer, d as defineRegistry, r as renderToHtml, i as renderToPlainText, s as standardComponents } from './render-CdW2lLJB.js';
export { StandardComponentDefinitions, StandardComponentProps, standardComponentDefinitions } from './catalog.js';
import 'zod';

interface StateContextValue {
    state: StateModel;
    get: (path: string) => unknown;
    set: (path: string, value: unknown) => void;
    update: (updates: Record<string, unknown>) => void;
}
interface StateProviderProps {
    initialState?: StateModel;
    onStateChange?: (path: string, value: unknown) => void;
    children: ReactNode;
}
declare function StateProvider({ initialState, onStateChange, children, }: StateProviderProps): react_jsx_runtime.JSX.Element;
declare function useStateStore(): StateContextValue;
declare function useStateValue<T>(path: string): T | undefined;
declare function useStateBinding<T>(path: string): [T | undefined, (value: T) => void];

interface VisibilityContextValue {
    isVisible: (condition: VisibilityCondition | undefined) => boolean;
    ctx: VisibilityContext;
}
interface VisibilityProviderProps {
    children: ReactNode;
}
declare function VisibilityProvider({ children }: VisibilityProviderProps): react_jsx_runtime.JSX.Element;
declare function useVisibility(): VisibilityContextValue;
declare function useIsVisible(condition: VisibilityCondition | undefined): boolean;

interface PendingConfirmation {
    action: ResolvedAction;
    handler: ActionHandler;
    resolve: () => void;
    reject: () => void;
}
interface ActionContextValue {
    handlers: Record<string, ActionHandler>;
    loadingActions: Set<string>;
    pendingConfirmation: PendingConfirmation | null;
    execute: (binding: ActionBinding) => Promise<void>;
    confirm: () => void;
    cancel: () => void;
    registerHandler: (name: string, handler: ActionHandler) => void;
}
interface ActionProviderProps {
    handlers?: Record<string, ActionHandler>;
    navigate?: (path: string) => void;
    children: ReactNode;
}
declare function ActionProvider({ handlers: initialHandlers, navigate, children, }: ActionProviderProps): react_jsx_runtime.JSX.Element;
declare function useActions(): ActionContextValue;
declare function useAction(binding: ActionBinding): {
    execute: () => Promise<void>;
    isLoading: boolean;
};
interface ConfirmDialogProps {
    confirm: ActionConfirm;
    onConfirm: () => void;
    onCancel: () => void;
}
/**
 * No-op confirm dialog for email context. Emails are non-interactive,
 * so confirmations are not rendered.
 */
declare function ConfirmDialog(_props: ConfirmDialogProps): null;

interface FieldValidationState {
    touched: boolean;
    validated: boolean;
    result: ValidationResult | null;
}
interface ValidationContextValue {
    customFunctions: Record<string, ValidationFunction>;
    fieldStates: Record<string, FieldValidationState>;
    validate: (path: string, config: ValidationConfig) => ValidationResult;
    touch: (path: string) => void;
    clear: (path: string) => void;
    validateAll: () => boolean;
    registerField: (path: string, config: ValidationConfig) => void;
}
interface ValidationProviderProps {
    customFunctions?: Record<string, ValidationFunction>;
    children: ReactNode;
}
declare function ValidationProvider({ customFunctions, children, }: ValidationProviderProps): react_jsx_runtime.JSX.Element;
declare function useValidation(): ValidationContextValue;
declare function useFieldValidation(path: string, config?: ValidationConfig): {
    state: FieldValidationState;
    validate: () => ValidationResult;
    touch: () => void;
    clear: () => void;
    errors: string[];
    isValid: boolean;
};

interface RepeatScopeValue {
    item: unknown;
    index: number;
    basePath: string;
}
declare function RepeatScopeProvider({ item, index, basePath, children, }: RepeatScopeValue & {
    children: ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function useRepeatScope(): RepeatScopeValue | null;

export { type ActionContextValue, ActionProvider, type ActionProviderProps, ConfirmDialog, type ConfirmDialogProps, type FieldValidationState, type PendingConfirmation, RepeatScopeProvider, type RepeatScopeValue, type StateContextValue, StateProvider, type StateProviderProps, type ValidationContextValue, ValidationProvider, type ValidationProviderProps, type VisibilityContextValue, VisibilityProvider, type VisibilityProviderProps, useAction, useActions, useFieldValidation, useIsVisible, useRepeatScope, useStateBinding, useStateStore, useStateValue, useValidation, useVisibility };
