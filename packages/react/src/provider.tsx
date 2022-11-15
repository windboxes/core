import React, { createContext } from 'react';
import type { CSSModuleClasses } from '@windboxes/core';



export type CSSModulesProviderProps = {
  tailwind: CSSModuleClasses,
  children: JSX.Element|JSX.Element[];
}

const TailwindContext = createContext<CSSModuleClasses>({});

if (process.env.NODE_ENV !== 'production') {
  TailwindContext.displayName = 'TailwindCssModuleContext';
}

export const useTailwind = () => React.useContext(TailwindContext);

export const TailwindStyledProvider = (props: CSSModulesProviderProps) => {
  let tailwind = React.useContext(TailwindContext);

  if (props.tailwind !== tailwind) {
    tailwind = props.tailwind;
  }

  return (
    <TailwindContext.Provider value={tailwind}>
      {props.children}
    </TailwindContext.Provider>
  )
}