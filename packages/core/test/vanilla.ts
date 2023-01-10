import {
  // processRepeatStyle,
  parseStyle
} from '../src';
import type { CSSModules } from './types';



const demoCssModuleData = {
  'mt-10': 'sicnw',
  'mt-5': 'wqlmd',
  'p-4': 'aspcm',
  'bg-teal-100': 'qwond',
  'bg-teal-200': 'cpmwd',
  'rounded': 'womds',
}

const styled = (styles: string | string[]) => {
  return parseStyle(styles, demoCssModuleData as CSSModules);
}



let result = '';

// one return
result = styled('mt-10');
console.log('one style return \n', result);

// multiple return
result = styled('mt-10 mt-5 p-4 rounded');
console.log('multiple styles return \n', result);



// processRepeatStyle test

// const sourceStyles = ['mt-10', 'mt-5', 'p-4', 'bg-teal-100', 'bg-teal-200', 'rounded'];

// console.log('sourceStyles', sourceStyles);
// console.log('processRepeatStyle', processRepeatStyle(sourceStyles));
