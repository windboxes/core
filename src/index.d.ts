/// <reference types="react" />
declare const elementsArray: (keyof JSX.IntrinsicElements)[];

import styledParser from './styled';
export default styledParser;


export declare type CSSModuleClasses = {
  readonly [key: string]: string;
};

export declare const TailwindStyledMapContext: React.Context<{
  tailwind: CSSModuleClasses | null;
}>;

export declare const TailwindStyledMapProvider: React.Provider<{
  tailwind: CSSModuleClasses | null;
}>;

declare const createStyled: (tag: string, styledMap?: string[] | undefined) => React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & React.RefAttributes<any>>;