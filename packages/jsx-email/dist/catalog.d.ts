import { z } from 'zod';

/**
 * Standard component definitions for jsx-email catalogs.
 *
 * These define the available email components with their Zod prop schemas.
 * All components render using `jsx-email` primitives.
 */
declare const standardComponentDefinitions: {
    Html: {
        props: z.ZodObject<{
            lang: z.ZodNullable<z.ZodString>;
            dir: z.ZodNullable<z.ZodEnum<{
                ltr: "ltr";
                rtl: "rtl";
            }>>;
        }, z.core.$strip>;
        slots: string[];
        description: string;
        example: {
            lang: string;
            dir: string;
        };
    };
    Head: {
        props: z.ZodObject<{}, z.core.$strip>;
        slots: string[];
        description: string;
        example: {};
    };
    Body: {
        props: z.ZodObject<{
            style: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, z.core.$strip>;
        slots: string[];
        description: string;
        example: {
            style: {
                backgroundColor: string;
            };
        };
    };
    Container: {
        props: z.ZodObject<{
            style: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, z.core.$strip>;
        slots: string[];
        description: string;
        example: {
            style: {
                maxWidth: string;
                margin: string;
                padding: string;
            };
        };
    };
    Section: {
        props: z.ZodObject<{
            style: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, z.core.$strip>;
        slots: string[];
        description: string;
        example: {
            style: {
                padding: string;
                backgroundColor: string;
            };
        };
    };
    Row: {
        props: z.ZodObject<{
            style: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, z.core.$strip>;
        slots: string[];
        description: string;
        example: {
            style: {};
        };
    };
    Column: {
        props: z.ZodObject<{
            style: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, z.core.$strip>;
        slots: string[];
        description: string;
        example: {
            style: {
                width: string;
            };
        };
    };
    Heading: {
        props: z.ZodObject<{
            text: z.ZodString;
            as: z.ZodNullable<z.ZodEnum<{
                h1: "h1";
                h2: "h2";
                h3: "h3";
                h4: "h4";
                h5: "h5";
                h6: "h6";
            }>>;
            style: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, z.core.$strip>;
        slots: never[];
        description: string;
        example: {
            text: string;
            as: string;
        };
    };
    Text: {
        props: z.ZodObject<{
            text: z.ZodString;
            style: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, z.core.$strip>;
        slots: never[];
        description: string;
        example: {
            text: string;
        };
    };
    Link: {
        props: z.ZodObject<{
            text: z.ZodString;
            href: z.ZodString;
            style: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, z.core.$strip>;
        slots: never[];
        description: string;
        example: {
            text: string;
            href: string;
            style: {
                color: string;
            };
        };
    };
    Button: {
        props: z.ZodObject<{
            text: z.ZodString;
            href: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
            backgroundColor: z.ZodNullable<z.ZodString>;
            textColor: z.ZodNullable<z.ZodString>;
            borderColor: z.ZodNullable<z.ZodString>;
            borderRadius: z.ZodNullable<z.ZodNumber>;
            borderSize: z.ZodNullable<z.ZodNumber>;
            fontSize: z.ZodNullable<z.ZodNumber>;
            align: z.ZodNullable<z.ZodEnum<{
                left: "left";
                center: "center";
                right: "right";
            }>>;
            style: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, z.core.$strip>;
        slots: never[];
        description: string;
        example: {
            text: string;
            href: string;
            width: number;
            height: number;
            backgroundColor: string;
            textColor: string;
            borderRadius: number;
            fontSize: number;
        };
    };
    Image: {
        props: z.ZodObject<{
            src: z.ZodString;
            alt: z.ZodNullable<z.ZodString>;
            width: z.ZodNullable<z.ZodNumber>;
            height: z.ZodNullable<z.ZodNumber>;
            style: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, z.core.$strip>;
        slots: never[];
        description: string;
        example: {
            src: string;
            alt: string;
            width: number;
            height: number;
        };
    };
    Hr: {
        props: z.ZodObject<{
            style: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, z.core.$strip>;
        slots: never[];
        description: string;
        example: {
            style: {
                borderColor: string;
                margin: string;
            };
        };
    };
    Preview: {
        props: z.ZodObject<{
            text: z.ZodString;
        }, z.core.$strip>;
        slots: never[];
        description: string;
        example: {
            text: string;
        };
    };
    Markdown: {
        props: z.ZodObject<{
            content: z.ZodString;
            markdownContainerStyles: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
            markdownCustomStyles: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, z.core.$strip>;
        slots: never[];
        description: string;
        example: {
            content: string;
        };
    };
    Code: {
        props: z.ZodObject<{
            content: z.ZodString;
            language: z.ZodString;
            theme: z.ZodNullable<z.ZodString>;
            style: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, z.core.$strip>;
        slots: never[];
        description: string;
        example: {
            content: string;
            language: string;
        };
    };
    Font: {
        props: z.ZodObject<{
            fontFamily: z.ZodString;
            fallbackFontFamily: z.ZodUnion<readonly [z.ZodEnum<{
                Arial: "Arial";
                Helvetica: "Helvetica";
                Verdana: "Verdana";
                Georgia: "Georgia";
                "Times New Roman": "Times New Roman";
                serif: "serif";
                "sans-serif": "sans-serif";
                monospace: "monospace";
                cursive: "cursive";
                fantasy: "fantasy";
            }>, z.ZodArray<z.ZodEnum<{
                Arial: "Arial";
                Helvetica: "Helvetica";
                Verdana: "Verdana";
                Georgia: "Georgia";
                "Times New Roman": "Times New Roman";
                serif: "serif";
                "sans-serif": "sans-serif";
                monospace: "monospace";
                cursive: "cursive";
                fantasy: "fantasy";
            }>>]>;
            fontStyle: z.ZodNullable<z.ZodString>;
            fontWeight: z.ZodNullable<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>>;
            webFont: z.ZodNullable<z.ZodObject<{
                format: z.ZodEnum<{
                    woff: "woff";
                    woff2: "woff2";
                    truetype: "truetype";
                    opentype: "opentype";
                    "embedded-opentype": "embedded-opentype";
                    svg: "svg";
                }>;
                url: z.ZodString;
            }, z.core.$strip>>;
        }, z.core.$strip>;
        slots: never[];
        description: string;
        example: {
            fontFamily: string;
            fallbackFontFamily: string;
            webFont: {
                format: string;
                url: string;
            };
        };
    };
    Tailwind: {
        props: z.ZodObject<{
            production: z.ZodNullable<z.ZodBoolean>;
        }, z.core.$strip>;
        slots: string[];
        description: string;
        example: {
            production: boolean;
        };
    };
    Conditional: {
        props: z.ZodObject<{
            expression: z.ZodNullable<z.ZodString>;
            mso: z.ZodNullable<z.ZodBoolean>;
            head: z.ZodNullable<z.ZodBoolean>;
        }, z.core.$strip>;
        slots: string[];
        description: string;
        example: {
            mso: boolean;
        };
    };
    Raw: {
        props: z.ZodObject<{
            content: z.ZodString;
            disablePlainTextOutput: z.ZodNullable<z.ZodBoolean>;
        }, z.core.$strip>;
        slots: never[];
        description: string;
        example: {
            content: string;
        };
    };
    Background: {
        props: z.ZodObject<{
            src: z.ZodString;
            bgColor: z.ZodNullable<z.ZodString>;
            bgRepeat: z.ZodNullable<z.ZodEnum<{
                repeat: "repeat";
                "no-repeat": "no-repeat";
            }>>;
            width: z.ZodNullable<z.ZodNumber>;
            height: z.ZodNullable<z.ZodNumber>;
            style: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, z.core.$strip>;
        slots: string[];
        description: string;
        example: {
            src: string;
            bgRepeat: string;
            width: number;
            height: number;
        };
    };
    ColorScheme: {
        props: z.ZodObject<{
            mode: z.ZodEnum<{
                dark: "dark";
                "dark only": "dark only";
                light: "light";
                "light dark": "light dark";
                "light dark only": "light dark only";
                "light only": "light only";
                normal: "normal";
            }>;
        }, z.core.$strip>;
        slots: never[];
        description: string;
        example: {
            mode: string;
        };
    };
};
type StandardComponentDefinitions = typeof standardComponentDefinitions;
type StandardComponentProps<K extends keyof StandardComponentDefinitions> = StandardComponentDefinitions[K]["props"] extends {
    _output: infer O;
} ? O : z.output<StandardComponentDefinitions[K]["props"]>;

export { type StandardComponentDefinitions, type StandardComponentProps, standardComponentDefinitions };
