/// <reference types="react" />
export type CSSModuleClasses = { readonly [key: string]: string }

export type CSSModulesProviderProps = {
  tailwind: CSSModuleClasses,
  children: JSX.Element | JSX.Element[];
}

export declare const TailwindStyledProvider: React.Context<CSSModulesProviderProps>;



type IntrinsicElements = JSX.IntrinsicElements;
type IntrinsicElementsKeys = keyof IntrinsicElements;



export type TagFunctionsMap = {
  [key in IntrinsicElementsKeys]: <Tags extends keyof JSX.IntrinsicElements>(Element: keyof Tags, styledMap?: string | Array<string>) => React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & React.RefAttributes<unknown>>;
}

// declare const createStyled: (tag: string, styledMap?: string[] | undefined) => React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & React.RefAttributes<any>>;
declare const createStyled: (<Tags extends keyof JSX.IntrinsicElements>(Element: Tags, styledMap?: string | string[] | undefined) => React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & React.RefAttributes<unknown>>) & TagFunctionsMap;

export default createStyled;