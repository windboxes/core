import {describe, expect, test} from '@jest/globals';
import {
  parseStyle
} from '../src';
import { CSSModules } from './types';



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



describe('parseStyle use styled function', () => {

  test('one style return', () => {
    expect(styled('mt-5')).toBe('wqlmd');
  });

  test('multiple styles return', () => {
    expect(styled('mt-5 p-4 rounded')).toBe('wqlmd aspcm womds');
  });

});

