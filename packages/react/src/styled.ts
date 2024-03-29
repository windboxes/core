import React from 'react';
import {
  cleanTemplate,
  convertToClassNameArrays,
  mergeClasses,
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
  readonly [CName in IntrinsicElementsKeys]: (styledMap?: string | string[] | TemplateStringsArray) => HtmlStyledTag<CName>;
}

// create styled component
// function createStyled<C extends TemplateFunction<C>>(Element: C, styledMap?: string | string[]): HtmlStyledTag<C>;
function createStyled<C extends IntrinsicElementsKeys>(Element: C, styledMap?: string | string[] | TemplateStringsArray): HtmlStyledTag<C>;
function createStyled<C>(Element: C, styledMap?: string | string[] | TemplateStringsArray): StyledComponent<C>;
function createStyled<C extends IntrinsicElementsKeys>(Element: C, styledMap?: string | string[] | TemplateStringsArray): HtmlStyledTag<C> {
  // console.log('Element', Element);
  // console.log('styledMap', styledMap);

  const render = (props: any, ref: any) => {
    // console.log('render!')
    const tailwind = useTailwind();

    if (tailwind) {
      const FinalElement = props.as || Element;

      // cache class map
      let styledMapArrays: string[] = [];

      if (styledMap !== undefined) {
        if (typeof styledMap === 'string') {
          styledMapArrays = convertToClassNameArrays(cleanTemplate([styledMap]), tailwind);
        } else {
          styledMapArrays = convertToClassNameArrays([...styledMap], tailwind);
        }
        // console.log('styledMapArrays', styledMapArrays);
      }

      let sxStyledListArrays: string[] = [];
      // sx props
      if (typeof props.sx === 'string') {
        sxStyledListArrays = convertToClassNameArrays(cleanTemplate([props.sx]), tailwind);
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



const templateStyledProcess = (item: keyof JSX.IntrinsicElements, templateString: TemplateStringsArray) => {
  const cleanTemplateString = cleanTemplate([...templateString]);
  return createStyled(item, cleanTemplateString);
}

const tagFunctions = elementsArray.reduce((acc, item) => ({
  ...acc,
  [item]: (templateString: TemplateStringsArray) => templateStyledProcess(item, templateString),
}), {} as TagFunctionsMap);



// merge
const styleTailwind = Object.assign(createStyled, tagFunctions);



export default styleTailwind;