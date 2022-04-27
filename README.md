# tailwind-styled-map
Create tailwind css react components use array or sx prop with css module.

This pacakge requires **Tailwind css** and **css modules**.



## Introduction
### Create a tailwind css module components in anywhere, no need to import css module file.

You can create custom styles faster with the sx prop, only need use **tailwind utilities**.

As long as it is used properly, there will be **no duplicate** css styles.

The processed class name can also be made very **short**.

### a component example
```jsx
import React from 'react';
import styled from 'tailwind-styled-map';

// template string
const StyledButton = styled('button', `
  px-4
  py-2
  font-medium
  tracking-wide
  text-white
  capitalize
  transition-colors 
  duration-200
  transform
  bg-blue-600
  rounded-md
  hover:bg-blue-700
  focus:outline-none
  focus:ring
  focus:ring-blue-300
  focus:ring-opacity-80
`);

export default function App() {
  return (
    <StyledButton>Button</StyledButton>
  );
}

// render result with generateScopedName: "[hash:base64:3]"
<button class="X67 L3p Mrb D2q DpE _7zF qyb fS8 IsM PIm qeX Ihl n6G qw1 CIz YAB LdE">Button</button>
```



### Tailwind sx example
![image](https://user-images.githubusercontent.com/14024836/165496844-e8b257ac-2824-4694-9bef-eee27a3481f4.png)






## Installation
### NPM
```bash
$ npm install tailwind-styled-map
```

### yarn
```bash
$ yarn add tailwind-styled-map
```






## Usuage
### import
```ts
import styled from 'tailwind-styled-map';
```

### Set Tailwind css module Provider

#### create a tailwind css module file:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Set the Provider:
*⚠️ Must be imported, otherwise tailwind-styled-map cannot be used anywhere*

```ts
import React from 'react';
import { TailwindStyledMapProvider } from "tailwind-styled-map";
import twCssModule from "@/tailwind.module.css";

export default function App() {
  return (
    <TailwindStyledMapProvider value={{ tailwind: twCssModule }}>
      {
        //...
      }
    </TailwindStyledMapProvider>
  );
}
```

#### Now you can use in any where in Provider
```ts
import styled from 'tailwind-styled-map';
```


## Examples
if you want create a button with tailwind css module, Before, it was a nasty thing:

#### Before
```tsx
import tw from '@/styles/tailwind.module.css';

<button className={`${tw['mt-5']} ${tw['w-full']} ${tw['flex']} ${tw['flex-row']} ${tw['justify-center']} ${tw['items-center']} ${tw['p-3']} ${tw['bg-indigo-900']} ${tw['text-white']} ${tw['rounded-lg']} ${tw['shadow-lg']} ${tw['focus:outline-none']} ${tw['active:bg-indigo-800']} ${tw['disabled:opacity-80']}`}>
  Button
</button>
```

#### After
Now, you can use array or string to create a tailwind css module component

```tsx
import styled from 'tailwind-styled-map';

// string
const StyledButton = styled.button('p-3 flex flex-row justify-center items-center bg-indigo-400 text-white rounded-lg shadow-lg focus:outline-none active:bg-indigo-800 disabled:opacity-80');

// or array
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
```

#### Render result
The length of the class name can usually be customized and can be short

```html
<button type="button" class="aIT _2Mk zAy jk2 fIN rgD DpE MR3 _52r n6G j-O dkR LdE aIT">button</button>
```

## With sx prop
When you create a component, but want to set more styles, e.g. margin or padding or more...

You can try this:

```tsx
import React from 'react';
import styled from 'tailwind-styled-map';


const Box = styled('div');
const StyledButton = styled('button', 'p-3 flex flex-row justify-center items-center bg-indigo-400 text-white rounded-lg shadow-lg focus:outline-none active:bg-indigo-800 disabled:opacity-80');
const Card = styled('div', 'p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4');



export default function ComponentExample() {
  return (
    <Box sx='container mx-auto min-h-screen'>
      <Card sx='mt-10 bg-[#34eb9b]'>
        I'm a card
      </Card>

      <StyledButton sx='mx-auto mt-20'>
        Button
      </StyledButton>
    </Box>
  );
}
```

![image](https://user-images.githubusercontent.com/14024836/165215257-89b2abd3-f8e9-4f04-8e7d-68bae32c5f9b.png)
