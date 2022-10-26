import React from 'react';

import elementsArray from './elementTags';
import { CSSModuleClasses, useTailwind } from './provider';



type IntrinsicElementsKeys = keyof JSX.IntrinsicElements;



const cleanTemplate = (template: (string | undefined | null)[]) => {
  const newClasses: string[] = template
    .join(" ")
    .trim()
    .replace(/\n/g, " ") // replace newline with space
    .replace(/\s{2,}/g, " ") // replace line return by space
    .split(" ")
    .filter((c) => c !== ",") // remove comma introduced by template to string

  return newClasses;
}

// convert tailwind class name to css module class name
const convertToClassNameArrays = (styledMap: string[] | string, tailwind: CSSModuleClasses) => {
  let classList: string[] = [];
  let styledMapArray: string[] = [];

  // check is array
  if (typeof styledMap === 'object') {
    styledMapArray = styledMap;
    // console.log(styledMapArray);

  } else if (typeof styledMap === 'string') {
    // console.log('string process engine');
    const splitString = styledMap.split(' ');
    styledMapArray = splitString;
  }

  // console.log('styledMapArray', styledMapArray);

  for (let i = 0; i < styledMapArray.length; i++) {
    const item = styledMapArray[i];
    // console.log('item', item);
    if (tailwind[item] !== undefined) {
      classList.push(tailwind[item]);
    }
  }
  // styledMapArray.forEach((item) => {
  //   if (tailwind[item] !== undefined) {
  //     classList.push(tailwind[item]);
  //     // console.log('item', tailwind[item]);
  //   }
  // });

  // console.log('classList', classList);
  return classList;
}

const mergeClasses = (classes: string[]) => {
  return classes.join(' ').trim();
}



export type StyledComponent = React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & React.RefAttributes<unknown>>;

export interface StyledComponentProps {
  className?: string | null;
  style?: Record<string, string>;
  sx?: string | string[];
  as?: React.ElementType;
  [props: string]: unknown;
}

export type TagFunctionsMap = {
  [key in IntrinsicElementsKeys]: (styledMap?: string | Array<string>) => StyledComponent;
}



// create styled component
const createStyled = <Tags extends IntrinsicElementsKeys>(Element: Tags | StyledComponent | JSX.Element, styledMap?: string | Array<string>): StyledComponent => {
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
          styledMapArrays = convertToClassNameArrays(cleanTemplate([styledMap]), tailwind);
        } else {
          styledMapArrays = convertToClassNameArrays(styledMap, tailwind);
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
      // const classes = twMerge(...mergeAllStyleArrays);
      // console.log('classes', classes);

      // remove processed props
      const filterProps: StyledComponentProps = Object.fromEntries(Object.entries(props).filter(([key]) => !key.includes('sx') && !key.includes('as')));
      filterProps.className = classes ? classes : null;
      filterProps.ref = ref;

      return React.createElement(FinalElement, filterProps);
    } else {
      console.error(`You need to import TailwindStyledProvider to use WindBoxes.`);
      console.error(`More info visit: https://github.com/windboxes/core`);
      throw 'TailwindStyledProvider is not found';
    }
  };

  const TailwindCssModuleComponent = React.forwardRef(render);

  if (typeof Element !== "string") {
    TailwindCssModuleComponent.displayName = (Element as any).displayName || (Element as any).name;
  } else {
    TailwindCssModuleComponent.displayName = Element;
  }

  return TailwindCssModuleComponent;
}



const tagFunctions: TagFunctionsMap = elementsArray.reduce((acc, item) => ({
  ...acc,
  [item]: (styledMap: string | Array<string>): StyledComponent => {
    return createStyled(item, styledMap);
  },
}), {} as TagFunctionsMap);
// console.log('tagFunctions', tagFunctions);



// merge
const styleTailwind = Object.assign(createStyled, tagFunctions);



export default styleTailwind;