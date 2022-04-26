import React, { useContext } from 'react';

import elementsArray from './elementTags';
type IntrinsicElementsKeys = keyof JSX.IntrinsicElements


import { CSSModuleClasses, TailwindStyledMapContext } from './Provider';




// convert tailwind class name to css module class name
const convertToClassName = (styledmap: Array<string> | string, tailwind: CSSModuleClasses) => {
  let classList = '';
  let styledMapArray: Array<string> = [];

  if (typeof styledmap === 'object') {
    styledMapArray = styledmap;
  } else if (typeof styledmap === 'string') {
    // console.log('string process engine');
    const splitString = styledmap.split(' ');
    styledMapArray = splitString;
  }

  // console.log('styledMapArray', styledMapArray);
  // filter undefined and empty element
  styledMapArray = styledMapArray.filter(item => item !== undefined && item !== 'undefined' && item !== '');

  styledMapArray?.forEach((item, index) => {
    if(tailwind[item] !== undefined) {
      if (index !== styledMapArray.length - 1 && styledMapArray.length !== 1) {
        classList += `${tailwind[item]} `;
      } else {
        classList += tailwind[item];
      }
      // console.log('item', tailwind[item]);
    }
  });

  // console.log('classList', classList);
  return classList;
}



// process styled map then return class name
const processSxStyledMapAndMerge = (classList: string, sxProps: Array<string>, tailwind: CSSModuleClasses): string => {
  // console.log('classList', classList);
  // console.log('sxProps', sxProps);

  let newClassNameList = '';

  if (classList && classList !== 'undefined') {
    newClassNameList += classList;
  }

  const sxStyledList = convertToClassName(sxProps, tailwind);
  // console.log('sxStyledList', sxStyledList);

  if(newClassNameList.length > 0) {
    newClassNameList += ` ${sxStyledList}`;
  } else {
    newClassNameList += sxStyledList;
  }

  // console.log('newClassNameList', newClassNameList);
  return newClassNameList;
}



// merge class name
const mergeOldClass = (oldClass: string, newClass: string | null): string | null => {
  const oldClassString = oldClass ? oldClass : null;
  const newClassString = newClass ? newClass : null;

  // console.log('oldClassString', oldClassString);
  // console.log('newClassString', newClassString);

  const result = oldClassString ? `${oldClassString} ${newClassString}` : newClassString;
  // console.log('result', result);

  return result;
}




const processAll = ({ props, styledmap, tailwind }: { props: any, styledmap?: Array<string> | string, tailwind: CSSModuleClasses }) => {
  // console.log('sx props', props?.sx);
  // console.log('styledmap', styledmap);

  const classList = styledmap ? convertToClassName(styledmap, tailwind) : '';
  // merge with sx
  const clacSxAndClassListResult = processSxStyledMapAndMerge(classList, props?.sx, tailwind);
  // merge all class
  const mergeClassNameResult = mergeOldClass(props.className, clacSxAndClassListResult);

  const newProps = {
    ...props,
    // sx: null,
    className: mergeClassNameResult ? mergeClassNameResult : null,
  }

  return newProps;
}




const createStyled = (tag: string, styledmap?: Array<string> | string) => {
  // console.log('styledmap', styledmap);
  const FinalTag = tag;

  // console.log('result classList', classList);

  const TailwindComponent = React.forwardRef<any, any>((props, ref) => {
    const { tailwind } = useContext(TailwindStyledMapContext);
    // console.log(tailwind);

    if (tailwind) {
      const processAllPropsResult = processAll({ props, styledmap, tailwind });
      // console.log('processAllPropsResult', processAllPropsResult);

      return (
        <FinalTag
          {...processAllPropsResult}
          ref={ref}
          // remove old sx props
          sx={null}
        />
      )
    } else {
      console.error(`You need to import TailwindCssModuleContext to use styled-map.`);
      console.error(`More info please vist: https://xxxxxx`);
      throw 'TailwindCssModuleProvider is not found';
    }
  });

  // This enables the react tree to show a name in devtools, much better debugging experience Note: Far from perfect, better implementations welcome
  if (typeof Element !== "string") {
    TailwindComponent.displayName = (Element as any).displayName || (Element as any).name || "tw.Component"
  } else {
    TailwindComponent.displayName = "tw." + Element
  }

  return TailwindComponent;
}



export type tagFunctionsMap = {
  [key in IntrinsicElementsKeys]: (styledmap?: Array<string> | string) => any
}



const tagFunctions: tagFunctionsMap = elementsArray.reduce((acc, item) => ({
  ...acc,
  [item]: (styledMap: Array<string> | string) => {
    return createStyled(item, styledMap)
  },
}), {} as any);
// console.log('tagFunctions', tagFunctions);



// merge
const styleTailwind = Object.assign(createStyled, tagFunctions);



export default styleTailwind;
