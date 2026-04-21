"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ActionProvider: () => ActionProvider,
  ConfirmDialog: () => ConfirmDialog,
  JSONUIProvider: () => JSONUIProvider,
  Renderer: () => Renderer,
  RepeatScopeProvider: () => RepeatScopeProvider,
  StateProvider: () => StateProvider,
  ValidationProvider: () => ValidationProvider,
  VisibilityProvider: () => VisibilityProvider,
  createRenderer: () => createRenderer,
  defineRegistry: () => defineRegistry,
  renderToHtml: () => renderToHtml,
  renderToPlainText: () => renderToPlainText,
  schema: () => schema,
  standardComponentDefinitions: () => standardComponentDefinitions,
  standardComponents: () => standardComponents,
  useAction: () => useAction,
  useActions: () => useActions,
  useFieldValidation: () => useFieldValidation,
  useIsVisible: () => useIsVisible,
  useRepeatScope: () => useRepeatScope,
  useStateBinding: () => useStateBinding,
  useStateStore: () => useStateStore,
  useStateValue: () => useStateValue,
  useValidation: () => useValidation,
  useVisibility: () => useVisibility
});
module.exports = __toCommonJS(index_exports);

// src/schema.ts
var import_core = require("@json-render/core");
var schema = (0, import_core.defineSchema)(
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

// src/contexts/state.tsx
var import_react = require("react");
var import_core2 = require("@json-render/core");
var import_jsx_runtime = require("react/jsx-runtime");
var StateContext = (0, import_react.createContext)(null);
function StateProvider({
  initialState = {},
  onStateChange,
  children
}) {
  const [state, setStateInternal] = (0, import_react.useState)(initialState);
  const stateRef = (0, import_react.useRef)(state);
  stateRef.current = state;
  const initialStateJsonRef = (0, import_react.useRef)(JSON.stringify(initialState));
  (0, import_react.useEffect)(() => {
    const newJson = JSON.stringify(initialState);
    if (newJson !== initialStateJsonRef.current) {
      initialStateJsonRef.current = newJson;
      if (initialState && Object.keys(initialState).length > 0) {
        setStateInternal((prev) => ({ ...prev, ...initialState }));
      }
    }
  }, [initialState]);
  const get = (0, import_react.useCallback)(
    (path) => (0, import_core2.getByPath)(stateRef.current, path),
    []
  );
  const set = (0, import_react.useCallback)(
    (path, value2) => {
      setStateInternal((prev) => {
        const next = { ...prev };
        (0, import_core2.setByPath)(next, path, value2);
        return next;
      });
      onStateChange?.(path, value2);
    },
    [onStateChange]
  );
  const update = (0, import_react.useCallback)(
    (updates) => {
      const entries = Object.entries(updates);
      setStateInternal((prev) => {
        const next = { ...prev };
        for (const [path, value2] of entries) {
          (0, import_core2.setByPath)(next, path, value2);
        }
        return next;
      });
      for (const [path, value2] of entries) {
        onStateChange?.(path, value2);
      }
    },
    [onStateChange]
  );
  const value = (0, import_react.useMemo)(
    () => ({ state, get, set, update }),
    [state, get, set, update]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateContext.Provider, { value, children });
}
function useStateStore() {
  const ctx = (0, import_react.useContext)(StateContext);
  if (!ctx) {
    throw new Error("useStateStore must be used within a StateProvider");
  }
  return ctx;
}
function useStateValue(path) {
  const { state } = useStateStore();
  return (0, import_core2.getByPath)(state, path);
}
function useStateBinding(path) {
  const { state, set } = useStateStore();
  const value = (0, import_core2.getByPath)(state, path);
  const setValue = (0, import_react.useCallback)(
    (newValue) => set(path, newValue),
    [path, set]
  );
  return [value, setValue];
}

// src/contexts/visibility.tsx
var import_react2 = require("react");
var import_core3 = require("@json-render/core");
var import_jsx_runtime2 = require("react/jsx-runtime");
var VisibilityContext = (0, import_react2.createContext)(null);
function VisibilityProvider({ children }) {
  const { state } = useStateStore();
  const ctx = (0, import_react2.useMemo)(
    () => ({ stateModel: state }),
    [state]
  );
  const isVisible = (0, import_react2.useMemo)(
    () => (condition) => (0, import_core3.evaluateVisibility)(condition, ctx),
    [ctx]
  );
  const value = (0, import_react2.useMemo)(
    () => ({ isVisible, ctx }),
    [isVisible, ctx]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(VisibilityContext.Provider, { value, children });
}
function useVisibility() {
  const ctx = (0, import_react2.useContext)(VisibilityContext);
  if (!ctx) {
    throw new Error("useVisibility must be used within a VisibilityProvider");
  }
  return ctx;
}
function useIsVisible(condition) {
  const { isVisible } = useVisibility();
  return isVisible(condition);
}

// src/contexts/actions.tsx
var import_react3 = require("react");
var import_core4 = require("@json-render/core");
var import_jsx_runtime3 = require("react/jsx-runtime");
function generateUniqueId() {
  return crypto.randomUUID();
}
function deepResolveValue(value, get) {
  if (value === null || value === void 0) return value;
  if (value === "$id") {
    return generateUniqueId();
  }
  if (typeof value === "object" && !Array.isArray(value)) {
    const obj = value;
    const keys = Object.keys(obj);
    if (keys.length === 1 && typeof obj.$state === "string") {
      return get(obj.$state);
    }
    if (keys.length === 1 && "$id" in obj) {
      return generateUniqueId();
    }
  }
  if (Array.isArray(value)) {
    return value.map((item) => deepResolveValue(item, get));
  }
  if (typeof value === "object") {
    const resolved = {};
    for (const [key, val] of Object.entries(value)) {
      resolved[key] = deepResolveValue(val, get);
    }
    return resolved;
  }
  return value;
}
var ActionContext = (0, import_react3.createContext)(null);
function ActionProvider({
  handlers: initialHandlers = {},
  navigate,
  children
}) {
  const { state, get, set } = useStateStore();
  const [handlers, setHandlers] = (0, import_react3.useState)(initialHandlers);
  const [loadingActions, setLoadingActions] = (0, import_react3.useState)(/* @__PURE__ */ new Set());
  const [pendingConfirmation, setPendingConfirmation] = (0, import_react3.useState)(null);
  const registerHandler = (0, import_react3.useCallback)(
    (name, handler) => {
      setHandlers((prev) => ({ ...prev, [name]: handler }));
    },
    []
  );
  const execute = (0, import_react3.useCallback)(
    async (binding) => {
      const resolved = (0, import_core4.resolveAction)(binding, state);
      if (resolved.action === "setState" && resolved.params) {
        const statePath = resolved.params.statePath;
        const value2 = resolved.params.value;
        if (statePath) {
          set(statePath, value2);
        }
        return;
      }
      if (resolved.action === "pushState" && resolved.params) {
        const statePath = resolved.params.statePath;
        const rawValue = resolved.params.value;
        if (statePath) {
          const resolvedValue = deepResolveValue(rawValue, get);
          const arr = get(statePath) ?? [];
          set(statePath, [...arr, resolvedValue]);
          const clearStatePath = resolved.params.clearStatePath;
          if (clearStatePath) {
            set(clearStatePath, "");
          }
        }
        return;
      }
      if (resolved.action === "removeState" && resolved.params) {
        const statePath = resolved.params.statePath;
        const index = resolved.params.index;
        if (statePath !== void 0 && index !== void 0) {
          const arr = get(statePath) ?? [];
          set(
            statePath,
            arr.filter((_, i) => i !== index)
          );
        }
        return;
      }
      const handler = handlers[resolved.action];
      if (!handler) {
        console.warn(`No handler registered for action: ${resolved.action}`);
        return;
      }
      if (resolved.confirm) {
        return new Promise((resolve, reject) => {
          setPendingConfirmation({
            action: resolved,
            handler,
            resolve: () => {
              setPendingConfirmation(null);
              resolve();
            },
            reject: () => {
              setPendingConfirmation(null);
              reject(new Error("Action cancelled"));
            }
          });
        }).then(async () => {
          setLoadingActions((prev) => new Set(prev).add(resolved.action));
          try {
            await (0, import_core4.executeAction)({
              action: resolved,
              handler,
              setState: set,
              navigate,
              executeAction: async (name) => {
                const subBinding = { action: name };
                await execute(subBinding);
              }
            });
          } finally {
            setLoadingActions((prev) => {
              const next = new Set(prev);
              next.delete(resolved.action);
              return next;
            });
          }
        });
      }
      setLoadingActions((prev) => new Set(prev).add(resolved.action));
      try {
        await (0, import_core4.executeAction)({
          action: resolved,
          handler,
          setState: set,
          navigate,
          executeAction: async (name) => {
            const subBinding = { action: name };
            await execute(subBinding);
          }
        });
      } finally {
        setLoadingActions((prev) => {
          const next = new Set(prev);
          next.delete(resolved.action);
          return next;
        });
      }
    },
    [state, handlers, get, set, navigate]
  );
  const confirm = (0, import_react3.useCallback)(() => {
    pendingConfirmation?.resolve();
  }, [pendingConfirmation]);
  const cancel = (0, import_react3.useCallback)(() => {
    pendingConfirmation?.reject();
  }, [pendingConfirmation]);
  const value = (0, import_react3.useMemo)(
    () => ({
      handlers,
      loadingActions,
      pendingConfirmation,
      execute,
      confirm,
      cancel,
      registerHandler
    }),
    [
      handlers,
      loadingActions,
      pendingConfirmation,
      execute,
      confirm,
      cancel,
      registerHandler
    ]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ActionContext.Provider, { value, children });
}
function useActions() {
  const ctx = (0, import_react3.useContext)(ActionContext);
  if (!ctx) {
    throw new Error("useActions must be used within an ActionProvider");
  }
  return ctx;
}
function useAction(binding) {
  const { execute, loadingActions } = useActions();
  const isLoading = loadingActions.has(binding.action);
  const executeAction2 = (0, import_react3.useCallback)(() => execute(binding), [execute, binding]);
  return { execute: executeAction2, isLoading };
}
function ConfirmDialog(_props) {
  return null;
}

// src/contexts/validation.tsx
var import_react4 = __toESM(require("react"));
var import_core5 = require("@json-render/core");
var import_jsx_runtime4 = require("react/jsx-runtime");
var ValidationContext = (0, import_react4.createContext)(null);
function dynamicArgsEqual(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    const va = a[key];
    const vb = b[key];
    if (va === vb) continue;
    if (typeof va === "object" && va !== null && typeof vb === "object" && vb !== null) {
      const sa = va.$state;
      const sb = vb.$state;
      if (typeof sa === "string" && sa === sb) continue;
    }
    return false;
  }
  return true;
}
function validationConfigEqual(a, b) {
  if (a === b) return true;
  if (a.validateOn !== b.validateOn) return false;
  const ac = a.checks ?? [];
  const bc = b.checks ?? [];
  if (ac.length !== bc.length) return false;
  for (let i = 0; i < ac.length; i++) {
    const ca = ac[i];
    const cb = bc[i];
    if (ca.type !== cb.type) return false;
    if (ca.message !== cb.message) return false;
    if (!dynamicArgsEqual(ca.args, cb.args)) return false;
  }
  return true;
}
function ValidationProvider({
  customFunctions = {},
  children
}) {
  const { state } = useStateStore();
  const [fieldStates, setFieldStates] = (0, import_react4.useState)({});
  const [fieldConfigs, setFieldConfigs] = (0, import_react4.useState)({});
  const registerField = (0, import_react4.useCallback)(
    (path, config) => {
      setFieldConfigs((prev) => {
        const existing = prev[path];
        if (existing && validationConfigEqual(existing, config)) {
          return prev;
        }
        return { ...prev, [path]: config };
      });
    },
    []
  );
  const validate = (0, import_react4.useCallback)(
    (path, config) => {
      const segments = path.split("/").filter(Boolean);
      let value2 = state;
      for (const seg of segments) {
        if (value2 != null && typeof value2 === "object") {
          value2 = value2[seg];
        } else {
          value2 = void 0;
          break;
        }
      }
      const result = (0, import_core5.runValidation)(config, {
        value: value2,
        stateModel: state,
        customFunctions
      });
      setFieldStates((prev) => ({
        ...prev,
        [path]: {
          touched: prev[path]?.touched ?? true,
          validated: true,
          result
        }
      }));
      return result;
    },
    [state, customFunctions]
  );
  const touch = (0, import_react4.useCallback)((path) => {
    setFieldStates((prev) => ({
      ...prev,
      [path]: {
        ...prev[path],
        touched: true,
        validated: prev[path]?.validated ?? false,
        result: prev[path]?.result ?? null
      }
    }));
  }, []);
  const clear = (0, import_react4.useCallback)((path) => {
    setFieldStates((prev) => {
      const { [path]: _, ...rest } = prev;
      return rest;
    });
  }, []);
  const validateAll = (0, import_react4.useCallback)(() => {
    let allValid = true;
    for (const [path, config] of Object.entries(fieldConfigs)) {
      const result = validate(path, config);
      if (!result.valid) {
        allValid = false;
      }
    }
    return allValid;
  }, [fieldConfigs, validate]);
  const value = (0, import_react4.useMemo)(
    () => ({
      customFunctions,
      fieldStates,
      validate,
      touch,
      clear,
      validateAll,
      registerField
    }),
    [
      customFunctions,
      fieldStates,
      validate,
      touch,
      clear,
      validateAll,
      registerField
    ]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ValidationContext.Provider, { value, children });
}
function useValidation() {
  const ctx = (0, import_react4.useContext)(ValidationContext);
  if (!ctx) {
    throw new Error("useValidation must be used within a ValidationProvider");
  }
  return ctx;
}
function useFieldValidation(path, config) {
  const {
    fieldStates,
    validate: validateField,
    touch: touchField,
    clear: clearField,
    registerField
  } = useValidation();
  import_react4.default.useEffect(() => {
    if (config) {
      registerField(path, config);
    }
  }, [path, config, registerField]);
  const state = fieldStates[path] ?? {
    touched: false,
    validated: false,
    result: null
  };
  const validate = (0, import_react4.useCallback)(
    () => validateField(path, config ?? { checks: [] }),
    [path, config, validateField]
  );
  const touch = (0, import_react4.useCallback)(() => touchField(path), [path, touchField]);
  const clear = (0, import_react4.useCallback)(() => clearField(path), [path, clearField]);
  return {
    state,
    validate,
    touch,
    clear,
    errors: state.result?.errors ?? [],
    isValid: state.result?.valid ?? true
  };
}

// src/contexts/repeat-scope.tsx
var import_react5 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
var RepeatScopeContext = (0, import_react5.createContext)(null);
function RepeatScopeProvider({
  item,
  index,
  basePath,
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(RepeatScopeContext.Provider, { value: { item, index, basePath }, children });
}
function useRepeatScope() {
  return (0, import_react5.useContext)(RepeatScopeContext);
}

// src/renderer.tsx
var import_react6 = __toESM(require("react"));
var import_core6 = require("@json-render/core");

// src/components/standard.tsx
var import_jsx_email = require("jsx-email");
var import_jsx_runtime6 = require("react/jsx-runtime");
function HtmlComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_email.Html, { lang: p.lang ?? void 0, dir: p.dir ?? void 0, children });
}
function HeadComponent({
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_email.Head, { children });
}
function BodyComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_email.Body, { style: p.style ?? void 0, children });
}
function ContainerComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_email.Container, { style: p.style ?? void 0, children });
}
function SectionComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_email.Section, { style: p.style ?? void 0, children });
}
function RowComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_email.Row, { style: p.style ?? void 0, children });
}
function ColumnComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_email.Column, { style: p.style ?? void 0, children });
}
function HeadingComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_email.Heading, { as: p.as ?? "h2", style: p.style ?? void 0, children: p.text });
}
function TextComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_email.Text, { style: p.style ?? void 0, children: p.text });
}
function LinkComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_email.Link, { href: p.href, style: p.style ?? void 0, children: p.text });
}
function ButtonComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_email.Hr, { style: p.style ?? void 0 });
}
function PreviewComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_email.Preview, { children: p.text });
}
function MarkdownComponent({
  element
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_email.Tailwind, { production: p.production ?? void 0, children });
}
function ConditionalComponent({
  element,
  children
}) {
  const p = element.props;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_email.ColorScheme, { mode: p.mode });
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

// src/renderer.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var ElementErrorBoundary = class extends import_react6.default.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error(
      `[json-render/jsx-email] Rendering error in <${this.props.elementType}>:`,
      error,
      info.componentStack
    );
  }
  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
};
var ElementRenderer = import_react6.default.memo(function ElementRenderer2({
  element,
  spec,
  registry,
  loading,
  fallback
}) {
  const repeatScope = useRepeatScope();
  const { ctx } = useVisibility();
  const { execute } = useActions();
  const fullCtx = (0, import_react6.useMemo)(
    () => repeatScope ? {
      ...ctx,
      repeatItem: repeatScope.item,
      repeatIndex: repeatScope.index,
      repeatBasePath: repeatScope.basePath
    } : ctx,
    [ctx, repeatScope]
  );
  const isVisible = element.visible === void 0 ? true : (0, import_core6.evaluateVisibility)(element.visible, fullCtx);
  const onBindings = element.on;
  const emit = (0, import_react6.useCallback)(
    (eventName) => {
      const binding = onBindings?.[eventName];
      if (!binding) return;
      const actionBindings = Array.isArray(binding) ? binding : [binding];
      for (const b of actionBindings) {
        if (!b.params) {
          execute(b);
          continue;
        }
        const resolved = {};
        for (const [key, val] of Object.entries(b.params)) {
          resolved[key] = (0, import_core6.resolveActionParam)(val, fullCtx);
        }
        execute({ ...b, params: resolved });
      }
    },
    [onBindings, execute, fullCtx]
  );
  if (!isVisible) {
    return null;
  }
  const rawProps = element.props;
  const elementBindings = (0, import_core6.resolveBindings)(rawProps, fullCtx);
  const resolvedProps = (0, import_core6.resolveElementProps)(rawProps, fullCtx);
  const resolvedElement = resolvedProps !== element.props ? { ...element, props: resolvedProps } : element;
  const Component = registry[resolvedElement.type] ?? fallback;
  if (!Component) {
    console.warn(
      `[json-render/jsx-email] No renderer for component type: ${resolvedElement.type}`
    );
    return null;
  }
  const children = resolvedElement.repeat ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    RepeatChildren,
    {
      element: resolvedElement,
      spec,
      registry,
      loading,
      fallback
    }
  ) : resolvedElement.children?.map((childKey) => {
    const childElement = spec.elements[childKey];
    if (!childElement) {
      if (!loading) {
        console.warn(
          `[json-render/jsx-email] Missing element "${childKey}" referenced as child of "${resolvedElement.type}".`
        );
      }
      return null;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      ElementRenderer2,
      {
        element: childElement,
        spec,
        registry,
        loading,
        fallback
      },
      childKey
    );
  });
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ElementErrorBoundary, { elementType: resolvedElement.type, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    Component,
    {
      element: resolvedElement,
      emit,
      bindings: elementBindings,
      loading,
      children
    }
  ) });
});
function RepeatChildren({
  element,
  spec,
  registry,
  loading,
  fallback
}) {
  const { state } = useStateStore();
  const repeat = element.repeat;
  const statePath = repeat.statePath;
  const items = (0, import_core6.getByPath)(state, statePath) ?? [];
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_jsx_runtime7.Fragment, { children: items.map((itemValue, index) => {
    const key = repeat.key && typeof itemValue === "object" && itemValue !== null ? String(
      itemValue[repeat.key] ?? index
    ) : String(index);
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      RepeatScopeProvider,
      {
        item: itemValue,
        index,
        basePath: `${statePath}/${index}`,
        children: element.children?.map((childKey) => {
          const childElement = spec.elements[childKey];
          if (!childElement) {
            if (!loading) {
              console.warn(
                `[json-render/jsx-email] Missing element "${childKey}" referenced as child of "${element.type}" (repeat).`
              );
            }
            return null;
          }
          return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            ElementRenderer,
            {
              element: childElement,
              spec,
              registry,
              loading,
              fallback
            },
            childKey
          );
        })
      },
      key
    );
  }) });
}
function Renderer({
  spec,
  registry: customRegistry,
  includeStandard = true,
  loading,
  fallback
}) {
  const registry = (0, import_react6.useMemo)(
    () => ({
      ...includeStandard ? standardComponents : {},
      ...customRegistry
    }),
    [customRegistry, includeStandard]
  );
  if (!spec || !spec.root) {
    return null;
  }
  const rootElement = spec.elements[spec.root];
  if (!rootElement) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    ElementRenderer,
    {
      element: rootElement,
      spec,
      registry,
      loading,
      fallback
    }
  );
}
function JSONUIProvider({
  initialState,
  handlers,
  navigate,
  validationFunctions,
  onStateChange,
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(StateProvider, { initialState, onStateChange, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(VisibilityProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ActionProvider, { handlers, navigate, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ValidationProvider, { customFunctions: validationFunctions, children }) }) }) });
}
function defineRegistry(_catalog, options) {
  const registry = {};
  if (options.components) {
    for (const [name, componentFn] of Object.entries(options.components)) {
      registry[name] = ({
        element,
        children,
        emit,
        bindings,
        loading
      }) => {
        return componentFn({
          props: element.props,
          children,
          emit,
          bindings,
          loading
        });
      };
    }
  }
  return { registry };
}
function createRenderer(catalog, components) {
  const registry = components;
  return function CatalogRenderer({
    spec,
    state,
    onAction,
    onStateChange,
    loading,
    fallback
  }) {
    const actionHandlers = onAction ? new Proxy(
      {},
      {
        get: (_target, prop) => {
          return (params) => onAction(prop, params);
        },
        has: () => true
      }
    ) : void 0;
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(StateProvider, { initialState: state, onStateChange, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(VisibilityProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ActionProvider, { handlers: actionHandlers, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ValidationProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      Renderer,
      {
        spec,
        registry,
        loading,
        fallback
      }
    ) }) }) }) });
  };
}

// src/render.tsx
var import_jsx_email2 = require("jsx-email");
var import_core7 = require("@json-render/core");
var import_jsx_runtime8 = require("react/jsx-runtime");
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
    if (!(0, import_core7.evaluateVisibility)(element.visible, ctx)) {
      return null;
    }
  }
  const resolvedProps = (0, import_core7.resolveElementProps)(
    element.props,
    ctx
  );
  const resolvedElement = { ...element, props: resolvedProps };
  const Component = registry[resolvedElement.type];
  if (!Component) return null;
  if (resolvedElement.repeat) {
    const items = (0, import_core7.getByPath)(stateModel, resolvedElement.repeat.statePath) ?? [];
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
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Component, { element: resolvedElement, emit: noopEmit, children: children2 }, key);
    });
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_jsx_runtime8.Fragment, { children: fragments });
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
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Component, { element: resolvedElement, emit: noopEmit, children: children && children.length > 0 ? children : void 0 }, elementKey);
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
  return root ?? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_jsx_runtime8.Fragment, {});
}
async function renderToHtml(spec, options) {
  const document = buildDocument(spec, options);
  return (0, import_jsx_email2.render)(document);
}
async function renderToPlainText(spec, options) {
  const document = buildDocument(spec, options);
  return (0, import_jsx_email2.render)(document, { plainText: true });
}

// src/catalog.ts
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
  ActionProvider,
  ConfirmDialog,
  JSONUIProvider,
  Renderer,
  RepeatScopeProvider,
  StateProvider,
  ValidationProvider,
  VisibilityProvider,
  createRenderer,
  defineRegistry,
  renderToHtml,
  renderToPlainText,
  schema,
  standardComponentDefinitions,
  standardComponents,
  useAction,
  useActions,
  useFieldValidation,
  useIsVisible,
  useRepeatScope,
  useStateBinding,
  useStateStore,
  useStateValue,
  useValidation,
  useVisibility
});
//# sourceMappingURL=index.js.map