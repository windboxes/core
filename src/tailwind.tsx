import React, { useContext } from 'react'
import elementsArray from './elementTags';




let calcStart = 0;


import { TailwindCssModuleContext } from './Provider';




// process styled map then return class name
const processStyledMap = (classList: string, sxProps: Array<string>): string => {
  const tw = useContext(TailwindCssModuleContext) as any;

  let sxStyledList = '';

  sxProps?.forEach((item, index) => {
    if(index !== sxProps.length - 1) {
      sxStyledList += `${tw[item]} `;
    } else {
      sxStyledList += tw[item];
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



const createStyled = (tag: string, styledmap?: Array<string>) => {
  // console.log('styledmap', styledmap);


  const tw = useContext(TailwindCssModuleContext) as any;
  const FinalTag = tag;
  let classList = '';



  styledmap?.forEach((item, index) => {
    if(index !== styledmap.length - 1) {
      classList += `${tw[item]} `;
    } else {
      classList += tw[item];
    }
    // console.log('item', tw[item]);
  });

  // console.log('result classList', classList);



  return React.forwardRef<any, any>((props, ref) => {
    const clacSxAndClassListResult = processStyledMap(classList, props?.sx);

    // remove sx props
    const newProps = {
      ...props,
      // sx: null,
      className: mergeOldClass(props.className, clacSxAndClassListResult ? clacSxAndClassListResult : null),
    }

    return (
      <FinalTag
        {...newProps}
        ref={ref}
        sx={null}
      />
    )
  });
}



export default createStyled;
