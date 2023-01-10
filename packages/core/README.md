# Wind Boxes Core

## Introduction
Wind Boxes is a tool for parse css module string for styles.

## Examples
https://github.com/windboxes/examples

### core function - parseStyle
```jsx
// jsx example

import parseStyle from '@windboxes/core';
// you can import any css module
import tailwindCSSModule from 'tailwind.module.css';


// create a styled function for inject css module class names and parse
const styled = (styles) => {
  return parseStyle(styles, tailwindCSSModule);
}


// ......
const boxClasses = styled('block h-min bg-gray-200 p-3 mt-10 rounded-md');

<div className={boxClasses}></div>

// result, If you can, you can customize the class name to give random string
<div class="jHR Jbf NHo sUK _9Zt rHK"></div>
```



## React
Testing styled components module,
This is a weird implementation, have't complete:

You can try [`@windboxes/react`](https://github.com/windboxes/core/tree/main/packages/react) 
