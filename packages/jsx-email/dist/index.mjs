import {
  renderToHtml,
  renderToPlainText,
  standardComponents
} from "./chunk-ZNM3SPC5.mjs";
import {
  schema
} from "./chunk-AWLFN5UZ.mjs";
import {
  standardComponentDefinitions
} from "./chunk-BDU6DS7I.mjs";

// src/contexts/state.tsx
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef
} from "react";
import { getByPath, setByPath } from "@json-render/core";
import { jsx } from "react/jsx-runtime";
var StateContext = createContext(null);
function StateProvider({
  initialState = {},
  onStateChange,
  children
}) {
  const [state, setStateInternal] = useState(initialState);
  const stateRef = useRef(state);
  stateRef.current = state;
  const initialStateJsonRef = useRef(JSON.stringify(initialState));
  useEffect(() => {
    const newJson = JSON.stringify(initialState);
    if (newJson !== initialStateJsonRef.current) {
      initialStateJsonRef.current = newJson;
      if (initialState && Object.keys(initialState).length > 0) {
        setStateInternal((prev) => ({ ...prev, ...initialState }));
      }
    }
  }, [initialState]);
  const get = useCallback(
    (path) => getByPath(stateRef.current, path),
    []
  );
  const set = useCallback(
    (path, value2) => {
      setStateInternal((prev) => {
        const next = { ...prev };
        setByPath(next, path, value2);
        return next;
      });
      onStateChange?.(path, value2);
    },
    [onStateChange]
  );
  const update = useCallback(
    (updates) => {
      const entries = Object.entries(updates);
      setStateInternal((prev) => {
        const next = { ...prev };
        for (const [path, value2] of entries) {
          setByPath(next, path, value2);
        }
        return next;
      });
      for (const [path, value2] of entries) {
        onStateChange?.(path, value2);
      }
    },
    [onStateChange]
  );
  const value = useMemo(
    () => ({ state, get, set, update }),
    [state, get, set, update]
  );
  return /* @__PURE__ */ jsx(StateContext.Provider, { value, children });
}
function useStateStore() {
  const ctx = useContext(StateContext);
  if (!ctx) {
    throw new Error("useStateStore must be used within a StateProvider");
  }
  return ctx;
}
function useStateValue(path) {
  const { state } = useStateStore();
  return getByPath(state, path);
}
function useStateBinding(path) {
  const { state, set } = useStateStore();
  const value = getByPath(state, path);
  const setValue = useCallback(
    (newValue) => set(path, newValue),
    [path, set]
  );
  return [value, setValue];
}

// src/contexts/visibility.tsx
import {
  createContext as createContext2,
  useContext as useContext2,
  useMemo as useMemo2
} from "react";
import {
  evaluateVisibility
} from "@json-render/core";
import { jsx as jsx2 } from "react/jsx-runtime";
var VisibilityContext = createContext2(null);
function VisibilityProvider({ children }) {
  const { state } = useStateStore();
  const ctx = useMemo2(
    () => ({ stateModel: state }),
    [state]
  );
  const isVisible = useMemo2(
    () => (condition) => evaluateVisibility(condition, ctx),
    [ctx]
  );
  const value = useMemo2(
    () => ({ isVisible, ctx }),
    [isVisible, ctx]
  );
  return /* @__PURE__ */ jsx2(VisibilityContext.Provider, { value, children });
}
function useVisibility() {
  const ctx = useContext2(VisibilityContext);
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
import {
  createContext as createContext3,
  useContext as useContext3,
  useState as useState2,
  useCallback as useCallback2,
  useMemo as useMemo3
} from "react";
import {
  resolveAction,
  executeAction
} from "@json-render/core";
import { jsx as jsx3 } from "react/jsx-runtime";
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
var ActionContext = createContext3(null);
function ActionProvider({
  handlers: initialHandlers = {},
  navigate,
  children
}) {
  const { state, get, set } = useStateStore();
  const [handlers, setHandlers] = useState2(initialHandlers);
  const [loadingActions, setLoadingActions] = useState2(/* @__PURE__ */ new Set());
  const [pendingConfirmation, setPendingConfirmation] = useState2(null);
  const registerHandler = useCallback2(
    (name, handler) => {
      setHandlers((prev) => ({ ...prev, [name]: handler }));
    },
    []
  );
  const execute = useCallback2(
    async (binding) => {
      const resolved = resolveAction(binding, state);
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
            await executeAction({
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
        await executeAction({
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
  const confirm = useCallback2(() => {
    pendingConfirmation?.resolve();
  }, [pendingConfirmation]);
  const cancel = useCallback2(() => {
    pendingConfirmation?.reject();
  }, [pendingConfirmation]);
  const value = useMemo3(
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
  return /* @__PURE__ */ jsx3(ActionContext.Provider, { value, children });
}
function useActions() {
  const ctx = useContext3(ActionContext);
  if (!ctx) {
    throw new Error("useActions must be used within an ActionProvider");
  }
  return ctx;
}
function useAction(binding) {
  const { execute, loadingActions } = useActions();
  const isLoading = loadingActions.has(binding.action);
  const executeAction2 = useCallback2(() => execute(binding), [execute, binding]);
  return { execute: executeAction2, isLoading };
}
function ConfirmDialog(_props) {
  return null;
}

// src/contexts/validation.tsx
import React4, {
  createContext as createContext4,
  useContext as useContext4,
  useState as useState3,
  useCallback as useCallback3,
  useMemo as useMemo4
} from "react";
import {
  runValidation
} from "@json-render/core";
import { jsx as jsx4 } from "react/jsx-runtime";
var ValidationContext = createContext4(null);
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
  const [fieldStates, setFieldStates] = useState3({});
  const [fieldConfigs, setFieldConfigs] = useState3({});
  const registerField = useCallback3(
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
  const validate = useCallback3(
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
      const result = runValidation(config, {
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
  const touch = useCallback3((path) => {
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
  const clear = useCallback3((path) => {
    setFieldStates((prev) => {
      const { [path]: _, ...rest } = prev;
      return rest;
    });
  }, []);
  const validateAll = useCallback3(() => {
    let allValid = true;
    for (const [path, config] of Object.entries(fieldConfigs)) {
      const result = validate(path, config);
      if (!result.valid) {
        allValid = false;
      }
    }
    return allValid;
  }, [fieldConfigs, validate]);
  const value = useMemo4(
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
  return /* @__PURE__ */ jsx4(ValidationContext.Provider, { value, children });
}
function useValidation() {
  const ctx = useContext4(ValidationContext);
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
  React4.useEffect(() => {
    if (config) {
      registerField(path, config);
    }
  }, [path, config, registerField]);
  const state = fieldStates[path] ?? {
    touched: false,
    validated: false,
    result: null
  };
  const validate = useCallback3(
    () => validateField(path, config ?? { checks: [] }),
    [path, config, validateField]
  );
  const touch = useCallback3(() => touchField(path), [path, touchField]);
  const clear = useCallback3(() => clearField(path), [path, clearField]);
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
import { createContext as createContext5, useContext as useContext5 } from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var RepeatScopeContext = createContext5(null);
function RepeatScopeProvider({
  item,
  index,
  basePath,
  children
}) {
  return /* @__PURE__ */ jsx5(RepeatScopeContext.Provider, { value: { item, index, basePath }, children });
}
function useRepeatScope() {
  return useContext5(RepeatScopeContext);
}

// src/renderer.tsx
import React6, {
  useCallback as useCallback4,
  useMemo as useMemo5
} from "react";
import {
  resolveElementProps,
  resolveBindings,
  resolveActionParam,
  evaluateVisibility as evaluateVisibility2,
  getByPath as getByPath2
} from "@json-render/core";
import { Fragment, jsx as jsx6 } from "react/jsx-runtime";
var ElementErrorBoundary = class extends React6.Component {
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
var ElementRenderer = React6.memo(function ElementRenderer2({
  element,
  spec,
  registry,
  loading,
  fallback
}) {
  const repeatScope = useRepeatScope();
  const { ctx } = useVisibility();
  const { execute } = useActions();
  const fullCtx = useMemo5(
    () => repeatScope ? {
      ...ctx,
      repeatItem: repeatScope.item,
      repeatIndex: repeatScope.index,
      repeatBasePath: repeatScope.basePath
    } : ctx,
    [ctx, repeatScope]
  );
  const isVisible = element.visible === void 0 ? true : evaluateVisibility2(element.visible, fullCtx);
  const onBindings = element.on;
  const emit = useCallback4(
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
          resolved[key] = resolveActionParam(val, fullCtx);
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
  const elementBindings = resolveBindings(rawProps, fullCtx);
  const resolvedProps = resolveElementProps(rawProps, fullCtx);
  const resolvedElement = resolvedProps !== element.props ? { ...element, props: resolvedProps } : element;
  const Component = registry[resolvedElement.type] ?? fallback;
  if (!Component) {
    console.warn(
      `[json-render/jsx-email] No renderer for component type: ${resolvedElement.type}`
    );
    return null;
  }
  const children = resolvedElement.repeat ? /* @__PURE__ */ jsx6(
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
    return /* @__PURE__ */ jsx6(
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
  return /* @__PURE__ */ jsx6(ElementErrorBoundary, { elementType: resolvedElement.type, children: /* @__PURE__ */ jsx6(
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
  const items = getByPath2(state, statePath) ?? [];
  return /* @__PURE__ */ jsx6(Fragment, { children: items.map((itemValue, index) => {
    const key = repeat.key && typeof itemValue === "object" && itemValue !== null ? String(
      itemValue[repeat.key] ?? index
    ) : String(index);
    return /* @__PURE__ */ jsx6(
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
          return /* @__PURE__ */ jsx6(
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
  const registry = useMemo5(
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
  return /* @__PURE__ */ jsx6(
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
  return /* @__PURE__ */ jsx6(StateProvider, { initialState, onStateChange, children: /* @__PURE__ */ jsx6(VisibilityProvider, { children: /* @__PURE__ */ jsx6(ActionProvider, { handlers, navigate, children: /* @__PURE__ */ jsx6(ValidationProvider, { customFunctions: validationFunctions, children }) }) }) });
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
    return /* @__PURE__ */ jsx6(StateProvider, { initialState: state, onStateChange, children: /* @__PURE__ */ jsx6(VisibilityProvider, { children: /* @__PURE__ */ jsx6(ActionProvider, { handlers: actionHandlers, children: /* @__PURE__ */ jsx6(ValidationProvider, { children: /* @__PURE__ */ jsx6(
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
export {
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
};
//# sourceMappingURL=index.mjs.map