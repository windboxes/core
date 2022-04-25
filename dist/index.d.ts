/// <reference types="react" />
declare const elementsArray: (keyof JSX.IntrinsicElements)[];

import styledParser from './tailwind';
export default styledParser;


export declare type CSSModuleClasses = {
  readonly [key: string]: string;
};
export declare const TailwindStyledMapContext: React.Context<{
  tailwind: CSSModuleClasses | null;
}>;

declare const createStyled: (tag: string, styledmap?: string[] | undefined) => React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & React.RefAttributes<any>>;