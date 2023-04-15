import { useContext } from 'react';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import { connectSnap, getSnap, shouldDisplayReconnectButton } from '../utils';
import { Button, Helper, Typography } from '@ensdomains/thorin';
import '../assets/style.css';

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
          <Button onClick={handleConnectClick} disabled={!state.isFlask}>
            Connect MetaMask Flask
          </Button>
        </div>
      )}

      {shouldDisplayReconnectButton(state.installedSnap) && (
        <>
          <div className="row">
            <Typography style={{ textAlign: 'center' }}>
              While connected to a local running snap this button will always be
              displayed in order to update the snap if a change is made.
            </Typography>
            <Button
              onClick={handleConnectClick}
              disabled={!state.installedSnap}
            >
              Refresh Snap
            </Button>
          </div>
        </>
      )}
    </main>
  );
}
