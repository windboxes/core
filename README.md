# tailwind-styled-map
Create tailwind css react components use array or sx prop with css module.

This pacakge requires **Tailwind css** and **css modules**.


## examples
if you want create a button with array:

#### Before
```tsx
import tw from '@/styles/tailwind.module.css';

<button className={`${tw['mt-5']} ${tw['w-full']} ${tw['flex']} ${tw['flex-row']} ${tw['justify-center']} ${tw['items-center']} ${tw['p-3']} ${tw['bg-indigo-900']} ${tw['text-white']} ${tw['rounded-lg']} ${tw['shadow-lg']} ${tw['focus:outline-none']} ${tw['active:bg-indigo-800']} ${tw['disabled:opacity-80']}`}>
  Button
</button>
```

#### After
```tsx
import styled from 'tailwind-styled-map';

const StyledButton = styled.button([
  'p-3',
  'flex',
  'flex-row',
  'justify-center',
  'items-center',
  'bg-indigo-400',
  'text-white',
  'rounded-lg',
  'shadow-lg',
  'focus:outline-none',
  'active:bg-indigo-800',
  'disabled:opacity-80',
]);

// or
const StyledButton = styled('button', [
  'p-3',
  'flex',
  'flex-row',
  'justify-center',
  'items-center',
  'bg-indigo-400',
  'text-white',
  'rounded-lg',
  'shadow-lg',
  'focus:outline-none',
  'active:bg-indigo-800',
  'disabled:opacity-80',
]);

// or
const StyledButton = styled.button('p-3 flex flex-row justify-center items-center bg-indigo-400 text-white rounded-lg shadow-lg focus:outline-none active:bg-indigo-800 disabled:opacity-80');
```

#### Result
```html
<button type="button" class="aIT _2Mk zAy jk2 fIN rgD DpE MR3 _52r n6G j-O dkR LdE aIT">button</button>
```
