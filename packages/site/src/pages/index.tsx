import { Button, Heading, Helper, Typography } from '@ensdomains/thorin';
import { useContext } from 'react';
import styled from 'styled-components';

import '../assets/style.css';
import { connectSnap, getSnap, shouldDisplayReconnectButton } from '../utils';
import { MetamaskActions, MetaMaskContext } from '../hooks';

const StyledHeading = styled(Heading)`
  font-size: 3.5rem;
  line-height: 1.1;
  font-weight: 900;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const StyledButton = styled(Button)`
  max-width: fit-content;
  max-width: 20rem;
`;

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

  if (!state.isFlask) {
    return (
      <main>
        <Helper>
          <span>
            You need{' '}
            <a
              href="https://metamask.io/flask/"
              target="_blank"
              style={{ fontWeight: 'bold' }}
            >
              MetaMask Flash
            </a>{' '}
            to use Snaps.
          </span>
        </Helper>
      </main>
    );
  }

  return (
    <main>
      <StyledHeading as="h1">ENS Expiry Notice </StyledHeading>

      {state.error && (
        <Helper type="error">
          <b>An error happened:</b> {state.error.message}
        </Helper>
      )}

      {!state.installedSnap && (
        <div className="row">
          <Typography>
            Get started by connecting to and installing the example snap.
          </Typography>
          <StyledButton onClick={handleConnectClick} disabled={!state.isFlask}>
            Connect MetaMask Flask
          </StyledButton>
        </div>
      )}

      {shouldDisplayReconnectButton(state.installedSnap) && (
        <div className="row">
          <Typography style={{ textAlign: 'center' }}>
            While connected to a local running snap this button will always be
            displayed in order to update the snap if a change is made.
          </Typography>
          <StyledButton
            onClick={handleConnectClick}
            disabled={!state.installedSnap}
          >
            Refresh Snap
          </StyledButton>
        </div>
      )}
    </main>
  );
}
