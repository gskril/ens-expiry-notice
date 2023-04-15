import { FunctionComponent, ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { Header } from './components';

import { ToggleThemeContext } from './Root';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
`;

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  const toggleTheme = useContext(ToggleThemeContext);

  return (
    <>
      <Wrapper>
        <Header handleToggleClick={toggleTheme} />
        {children}
      </Wrapper>
    </>
  );
};
