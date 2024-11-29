'use client';

import React from 'react';
import { siteConfig } from '@/config/site.config';
import hideRechartsConsoleError from '@/utils/recharts-console-error';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

// hideRechartsConsoleError();

// export function ThemeProvider({ children }: React.PropsWithChildren<object>) {
//   return (
//     <NextThemeProvider
//       enableSystem={false}
//       defaultTheme={String(siteConfig.mode)}
//     >
//       {children}
//     </NextThemeProvider>
//   );
// }


export function ThemeProvider({ children }: React.PropsWithChildren<object>) {
  console.log('ThemeProvider children:', children); // Debug props

  const sanitizedChildren = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child as React.ReactElement<any>, {
          'data-headlessui-state': undefined, // Remove the invalid prop
        })
      : child
  );

  return (
    <NextThemeProvider
      enableSystem={false}
      defaultTheme={String(siteConfig.mode)}
    >
      {sanitizedChildren}
    </NextThemeProvider>
  );
}