'use client';

import { siteConfig } from '@/config/site.config';
import hideRechartsConsoleError from '@/utils/recharts-console-error';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

hideRechartsConsoleError();

export function ThemeProvider({ children }: React.PropsWithChildren<object>) {
  return (
    <NextThemeProvider
      enableSystem={false}
      defaultTheme={String(siteConfig.mode)}
    >
      {children}
    </NextThemeProvider>
  );
}
