


export type CSSModuleClasses = { readonly [key: string]: string };



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



// convert css modules class name to css module class name
const convertToClassNameArrays = (styledMap: string[] | string, cssModulesClasses: CSSModuleClasses) => {
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
    if (cssModulesClasses[item] !== undefined) {
      classList.push(cssModulesClasses[item]);
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



const parseStyle = (styledMap: string[] | string, cssModuleList: CSSModuleClasses): string => {
  let styledMapArrays: string[] = [];

  if (styledMap !== undefined) {
    if (typeof styledMap === 'string') {
      styledMapArrays = convertToClassNameArrays(cleanTemplate([styledMap]), cssModuleList);
    } else {
      styledMapArrays = convertToClassNameArrays(styledMap, cssModuleList);
    }
    // console.log('styledMapArrays', styledMapArrays);
  }

  return mergeClasses(styledMapArrays);
}





export {
  cleanTemplate,
  convertToClassNameArrays,
  mergeClasses,
  parseStyle,
}
