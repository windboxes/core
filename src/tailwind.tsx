import React, { useContext } from 'react';

import elementsArray from './elementTags';
import { CSSModuleClasses, TailwindStyledMapContext } from './Provider';
import { twMerge } from 'tailwind-merge';



type IntrinsicElementsKeys = keyof JSX.IntrinsicElements;




export const mergeArrays = (template: TemplateStringsArray, templateElements: (string | undefined | null)[]) => {
  return template.reduce(
    (acc, c, i) => acc.concat(c || [], templateElements[i] || []), //  x || [] to remove false values e.g '', null, undefined. as Array.concat() ignores empty arrays i.e []
    [] as (string | undefined | null)[]
  )
}

export const cleanTemplate = (template: (string | undefined | null)[], inheritedClasses: string = "") => {
  const newClasses: string[] = template
    .join(" ")
    .trim()
    .replace(/\n/g, " ") // replace newline with space
    .replace(/\s{2,}/g, " ") // replace line return by space
    .split(" ")
    .filter((c) => c !== ",") // remove comma introduced by template to string

  const inheritedClassesArray: string[] = inheritedClasses ? inheritedClasses.split(" ") : []

  return newClasses
    .concat(inheritedClassesArray) // add new classes to inherited classes
    .filter((c: string) => c !== " ")
}



// convert tailwind class name to css module class name
const convertToClassName = (styledmap: Array<string> | string, tailwind: CSSModuleClasses) => {
  let classList = '';
  let styledMapArray: Array<string> = [];

  if (typeof styledmap === 'object') {
    styledMapArray = styledmap;

    // console.log(styledMapArray);
  } else if (typeof styledmap === 'string') {
    // console.log('string process engine');
    const splitString = styledmap.split(' ');
    styledMapArray = splitString;
  }

  // console.log('styledMapArray', styledMapArray);
  // filter undefined and empty element
  // styledMapArray = styledMapArray === null ? [] : styledMapArray.filter(item => item !== undefined && item !== 'undefined' && item !== '');

  styledMapArray?.forEach((item, index) => {
    if (tailwind[item] !== undefined) {
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

// convert tailwind class name to css module class name
const convertToClassNameArrays = (styledmap: Array<string> | string, tailwind: CSSModuleClasses) => {
  let classList: Array<string> = [];
  let styledMapArray: Array<string> = [];

  if (typeof styledmap === 'object') {
    styledMapArray = styledmap;

    // console.log(styledMapArray);
  } else if (typeof styledmap === 'string') {
    // console.log('string process engine');
    const splitString = styledmap.split(' ');
    styledMapArray = splitString;
  }

  // console.log('styledMapArray', styledMapArray);
  // filter undefined and empty element
  // styledMapArray = styledMapArray === null ? [] : styledMapArray.filter(item => item !== undefined && item !== 'undefined' && item !== '');

  styledMapArray?.forEach((item, index) => {
    if (tailwind[item] !== undefined) {
      classList.push(tailwind[item]);
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

  if (newClassNameList.length > 0) {
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



const createStyled =
  <E extends React.ComponentType<any> | IntrinsicElementsKeys>
    (Element: E, styledmap?: Array<string> | string) => {
    // console.log('Element', Element)
    // console.log('styledmap', styledmap);

    return (template: TemplateStringsArray, ...templateElements: ((props: any) => string | undefined | null)[]) => {
      // console.log('template', template);
      // console.log('templateElements', templateElements);

      const TailwindCssModuleComponent: any = React.forwardRef<any, any>(({ as, ...props }, ref) => {
        const { tailwind } = useContext(TailwindStyledMapContext);

        const FinalElement = as || Element;

        if (tailwind) {
          const mergedTemplate = mergeArrays(
            template,
            templateElements.map((t) => t({ ...props, as } as any))
          );



          if(styledmap !== undefined) {
            console.log(styledmap);
          }

          // template
          const mergedClassArrays = cleanTemplate(mergedTemplate, props.className);
          const templateClassArrays = convertToClassNameArrays(mergedClassArrays, tailwind);

          // sx props
          const sxStyledListArrays = convertToClassNameArrays(props?.sx, tailwind);

          // merge sx template
          const mergeAllStyleArrays =  templateClassArrays.concat(sxStyledListArrays);

          // console.log('sxStyledListArrays', sxStyledListArrays);
          // console.log('templateClassArrays', templateClassArrays);
          // console.log('mergeAllStyleArrays', mergeAllStyleArrays);

          const filterProps = Object.fromEntries(Object.entries(props).filter(([key]) => !key.includes('sx') && !key.includes('as')));

          return (
            <FinalElement
              className={twMerge(...mergeAllStyleArrays)}
              ref={ref}
              {...filterProps}
            />
          );
        } else {
          console.error(`You need to import TailwindCssModuleContext to use styled-map.`);
          console.error(`More info please vist: https://xxxxxx`);
          throw 'TailwindCssModuleProvider is not found';
        }
      });

      return TailwindCssModuleComponent;
      // const TailwindCssModuleComponent: any = React.forwardRef<any, any>(({ as, ...props }, ref) => {
      //   const { tailwind } = useContext(TailwindStyledMapContext);
      //   // console.log(tailwind);
      //   const FinalElement = as || Element;

      //   if (tailwind) {
      //     const processAllPropsResult = processAll({ props, styledmap, tailwind });
      //     // console.log('processAllPropsResult', processAllPropsResult);

      //     return (
      //       <FinalElement
      //         {...processAllPropsResult}
      //         ref={ref}
      //         // remove old sx props
      //         sx={null}
      //       />
      //     )
      //   } else {
      //     console.error(`You need to import TailwindCssModuleContext to use styled-map.`);
      //     console.error(`More info please vist: https://xxxxxx`);
      //     throw 'TailwindCssModuleProvider is not found';
      //   }
      // });

      // // TailwindCssModuleComponent[isTwCssModuleElement] = true

      // if (typeof Element !== "string") {
      //   TailwindCssModuleComponent.displayName = (Element as any).displayName || (Element as any).name || "tw.Component"
      // } else {
      //   TailwindCssModuleComponent.displayName = "tw." + Element
      // }

      // return TailwindCssModuleComponent;
    }
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
