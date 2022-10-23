/// <reference types="react" />
export type CSSModuleClasses = { readonly [key: string]: string }

export type CSSModulesProviderProps = {
  tailwind: CSSModuleClasses,
  children: JSX.Element | JSX.Element[];
}

export declare const TailwindStyledProvider: React.Context<CSSModulesProviderProps>;



// declare const createStyled: (tag: string, styledMap?: string[] | undefined) => React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & React.RefAttributes<any>>;
declare const createStyled: <Tags extends keyof JSX.IntrinsicElements>(Element: Tags, styledMap?: string | Array<string>) => React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & React.RefAttributes<unknown>>;

export default createStyled;