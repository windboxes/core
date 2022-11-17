import React from 'react';
import {
  cleanTemplate,
  convertToClassNameArrays,
  mergeClasses,
  processRepeatStyle,
} from '@windboxes/core';

import elementsArray from './elementTags';
import { useTailwind } from './provider';



type IntrinsicElementsKeys = keyof JSX.IntrinsicElements;

// export type StyledComponent<T> = React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & React.RefAttributes<unknown>>;

interface StyledComponentProps {
  className?: string | null;
  style?: Record<string, string>;
  sx?: string | string[];
  as?: React.ElementType;
  [props: string]: unknown;
}


export type StyledComponent<T> = [T] extends [React.FunctionComponent<infer P>]
  ? React.FunctionComponent<{
    sx?: string | string[];
    as?: React.ElementType;
  } & P>
  : React.FunctionComponent<{
    sx?: string | string[];
    as?: React.ElementType;
  } & T>;


declare type HtmlStyledTag<TName extends keyof JSX.IntrinsicElements> = StyledComponent<JSX.IntrinsicElements[TName]>;

export type TagFunctionsMap = {
  readonly [CName in IntrinsicElementsKeys]: (styledMap?: string | string[]) => HtmlStyledTag<CName>;
}



// create styled component
function createStyled<C extends IntrinsicElementsKeys>(Element: C, styledMap?: string | string[]): HtmlStyledTag<C>;
function createStyled<C>(Element: C, styledMap?: string | string[]): StyledComponent<C>;
function createStyled<C extends IntrinsicElementsKeys>(Element: C, styledMap?: string | string[]): HtmlStyledTag<C> {
  // console.log('Element', Element)
  // console.log('styleMap', styleMap);

  const render = (props: any, ref: any) => {
    const tailwind = useTailwind();

    if (tailwind) {
      const FinalElement = props.as || Element;

      // cache class map
      let styledMapArrays: string[] = [];

      if (styledMap !== undefined) {
        if (typeof styledMap === 'string') {
          const arrayStyles = cleanTemplate([styledMap]);
          const processRepeatResult = processRepeatStyle(arrayStyles);

          styledMapArrays = convertToClassNameArrays(processRepeatResult, tailwind);
        } else {
          styledMapArrays = convertToClassNameArrays(styledMap, tailwind);
        }
        // console.log('styledMapArrays', styledMapArrays);
      }

      let sxStyledListArrays: string[] = [];
      // sx props
      if (typeof props.sx === 'string') {
        const arrayStyles = cleanTemplate([props.sx]);
        const processRepeatResult = processRepeatStyle(arrayStyles);

        styledMapArrays = convertToClassNameArrays(processRepeatResult, tailwind);
      } else {
        sxStyledListArrays = convertToClassNameArrays(props.sx, tailwind);
      }

      // merge sx and styled map
      const mergeAllStyleArrays = styledMapArrays.concat(sxStyledListArrays);
      // console.log('mergeAllStyleArrays', mergeAllStyleArrays);
      const classes = mergeClasses(mergeAllStyleArrays);
      // console.log('classes', classes);

      // merge props class name
      // console.log('classnames', props.className);
      let mergePropsClassName = '';
      if (props.className) {
        if (classes) {
          mergePropsClassName = props.className + ' ' + classes;
        } else {
          mergePropsClassName = props.className;
        }
      } else {
        mergePropsClassName = classes;
      }

      // remove processed props
      const filterProps: StyledComponentProps = Object.fromEntries(Object.entries(props).filter(([key]) => !key.includes('sx') && !key.includes('as') && !key.includes('className')));
      filterProps.className = mergePropsClassName ? mergePropsClassName : null;
      filterProps.ref = ref;

      return React.createElement(FinalElement, filterProps);
    } else {
      console.error(`You need to import TailwindStyledProvider to use WindBoxes.`);
      console.error(`More info visit: https://github.com/windboxes/core`);
      throw 'TailwindStyledProvider is not found';
    }
  };

  const TailwindCssModuleComponent: any = React.forwardRef(render);

  if (typeof Element !== "string") {
    TailwindCssModuleComponent.displayName = (Element as any).displayName || (Element as any).name;
  } else {
    TailwindCssModuleComponent.displayName = Element;
  }

  return TailwindCssModuleComponent;
}



const tagFunctions: TagFunctionsMap = elementsArray.reduce((acc, item) => ({
  ...acc,
  [item]: (styledMap: string | string[]) => {
    return createStyled(item, styledMap);
  },
}), {} as TagFunctionsMap);
// console.log('tagFunctions', tagFunctions);



// merge
const styleTailwind = Object.assign(createStyled, tagFunctions);



export default styleTailwind;