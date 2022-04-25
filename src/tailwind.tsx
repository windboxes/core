import React, { useContext } from 'react'
import elementsArray from './elementTags';



import { CSSModuleClasses, TailwindCssModuleContext } from './Provider';




// process styled map then return class name
const processStyledMap = (classList: string, sxProps: Array<string>, tailwind: CSSModuleClasses): string => {
  let sxStyledList = '';

  sxProps?.forEach((item, index) => {
    if (index !== sxProps.length - 1) {
      sxStyledList += `${tailwind[item]} `;
    } else {
      sxStyledList += tailwind[item];
    }
  });

  // console.log('sxProps', sxProps);
  // console.log('sxStyledList', sxStyledList);
  return classList ? `${classList} ${sxStyledList}` : sxStyledList;
}



// merge class name
const mergeOldClass = (oldClass: string, newClass: string | null): string | null => {
  const oldClassString = oldClass ? oldClass : null;
  const newClassString = newClass ? newClass : null;

  // console.log('oldClassString', oldClassString);
  // console.log('newClassString', newClassString);

  return oldClassString ? `${oldClassString} ${newClassString}` : newClassString;
}



const processAll = ({ props, styledmap, tailwind } : { props: any, styledmap?: Array<string>, tailwind: CSSModuleClasses}) => {
  let classList = '';

  styledmap?.forEach((item, index) => {
    if (index !== styledmap.length - 1) {
      classList += `${tailwind[item]} `;
    } else {
      classList += tailwind[item];
    }
    // console.log('item', tw[item]);
  });

  const clacSxAndClassListResult = processStyledMap(classList, props?.sx, tailwind);

  // remove sx props
  const newProps = {
    ...props,
    // sx: null,
    className: mergeOldClass(props.className, clacSxAndClassListResult ? clacSxAndClassListResult : null, tailwind),
  }

  return newProps;
}



const createStyled = (tag: string, styledmap?: Array<string>) => {
  // console.log('styledmap', styledmap);
  const FinalTag = tag;

  // console.log('result classList', classList);

  return React.forwardRef<any, any>((props, ref) => {
    const { tailwind } = useContext(TailwindCssModuleContext);

    if (tailwind !== null) {
      // console.log(tailwind);

      const processAllPropsResult = processAll({props, styledmap, tailwind});

      return (
        <FinalTag
          {...props}
          {...processAllPropsResult}
          ref={ref}
          sx={null}
        />
      )
    } else {
      throw 'TailwindCssModuleProvider is not found';
    }
  });
}



export default createStyled;
