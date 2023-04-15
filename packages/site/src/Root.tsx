import { FunctionComponent, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin';

import { MetaMaskProvider } from './hooks';

export type RootProps = {
  children: ReactNode;
};

export const Root: FunctionComponent<RootProps> = ({ children }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      <MetaMaskProvider>{children}</MetaMaskProvider>
    </ThemeProvider>
  );
};
