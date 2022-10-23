/// <reference types="react" />
export type CSSModuleClasses = { readonly [key: string]: string }

export type CSSModulesProviderProps = {
  tailwind: CSSModuleClasses,
  children: JSX.Element|JSX.Element[];
}

export declare const TailwindStyledProvider: React.Context<CSSModulesProviderProps>;



declare const elementsArray: (keyof JSX.IntrinsicElements)[];

declare const createStyled: (tag: string, styledMap?: string[] | undefined) => React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & React.RefAttributes<any>>;

export default createStyled;