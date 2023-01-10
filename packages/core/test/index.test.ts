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

  test('string - one style return test', () => {
    expect(styled('mt-5')).toBe('wqlmd');
  });

  test('string - multiple styles return test', () => {
    expect(styled('mt-5 p-4 rounded')).toBe('wqlmd aspcm womds');
  });

  test('string - auto clean space strings test', () => {
    expect(styled('   mt-5       p-4   rounded        ')).toBe('wqlmd aspcm womds');
  });

  test('string - template string test', () => {
    expect(styled(`
      mt-10
      mt-5
      p-4
      rounded
    `)).toBe('sicnw wqlmd aspcm womds');
  });



  test('array - input test', () => {
    expect(styled(['mt-10', 'mt-5', 'p-4', 'rounded'])).toBe('sicnw wqlmd aspcm womds');
  });

  test('array - wont clean space strings test', () => {
    expect(styled(['mt-10    ', '   mt-5', '    p-4', 'rounded'])).toBe('womds');
  });

});
