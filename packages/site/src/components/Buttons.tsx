import { ComponentProps } from 'react';
import styled from 'styled-components';

const Button = styled.button``;

const ButtonText = styled.span``;

export const ConnectButton = (props: ComponentProps<typeof Button>) => {
  return (
    <Button {...props}>
      <ButtonText>Connect</ButtonText>
    </Button>
  );
};

export const ReconnectButton = (props: ComponentProps<typeof Button>) => {
  return (
    <Button {...props}>
      <ButtonText>Reconnect</ButtonText>
    </Button>
  );
};
