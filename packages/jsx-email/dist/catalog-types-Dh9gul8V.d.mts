import { ReactNode } from 'react';
import { Catalog, InferCatalogComponents, InferComponentProps } from '@json-render/core';

type SetState = (updater: (prev: Record<string, unknown>) => Record<string, unknown>) => void;
interface ComponentContext<C extends Catalog, K extends keyof InferCatalogComponents<C>> {
    props: InferComponentProps<C, K>;
    children?: ReactNode;
    emit: (event: string) => void;
    bindings?: Record<string, string>;
    loading?: boolean;
}
type ComponentFn<C extends Catalog, K extends keyof InferCatalogComponents<C>> = (ctx: ComponentContext<C, K>) => ReactNode;
type Components<C extends Catalog> = {
    [K in keyof InferCatalogComponents<C>]: ComponentFn<C, K>;
};

export type { Components as C, SetState as S, ComponentContext as a, ComponentFn as b };
