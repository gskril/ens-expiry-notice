import { useContext } from 'react';
import styled from 'styled-components';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import { connectSnap, getSnap, shouldDisplayReconnectButton } from '../utils';
import {
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
  Card,
} from '../components';

export default function Index() {
  const [state, dispatch] = useContext(MetaMaskContext);

  const handleConnectClick = async () => {
    try {
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  return (
    <main>
      {state.error && (
        <p>
          <b>An error happened:</b> {state.error.message}
        </p>
      )}
      {!state.isFlask && (
        <Card
          content={{
            title: 'Install',
            description:
              'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
            button: <InstallFlaskButton />,
          }}
          fullWidth
        />
      )}
      {!state.installedSnap && (
        <Card
          content={{
            title: 'Connect',
            description:
              'Get started by connecting to and installing the example snap.',
            button: (
              <ConnectButton
                onClick={handleConnectClick}
                disabled={!state.isFlask}
              />
            ),
          }}
          disabled={!state.isFlask}
        />
      )}
      {shouldDisplayReconnectButton(state.installedSnap) && (
        <Card
          content={{
            title: 'Reconnect',
            description:
              'While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.',
            button: (
              <ReconnectButton
                onClick={handleConnectClick}
                disabled={!state.installedSnap}
              />
            ),
          }}
          disabled={!state.installedSnap}
        />
      )}
    </main>
  );
}
