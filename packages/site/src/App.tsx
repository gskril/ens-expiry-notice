import { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 1rem;
  width: 100%;
  min-height: 100vh;
  max-width: 38rem;
  width: 100%;
  margin: 0 auto;
`;

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  return (
    <>
      <Wrapper>{children}</Wrapper>
    </>
  );
};
