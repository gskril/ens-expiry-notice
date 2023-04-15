import { OnCronjobHandler } from '@metamask/snaps-types';

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  const name = 'gregskril.eth';

  switch (request.method) {
    case 'ensExpiration': {
      const expiration = await getExpirationTimestamp(name);
      const message = `A name of yours expires on ${expiration}.`;

      console.log(message);
      return notify(message);
    }

    default:
      throw new Error('Method not found.');
  }
};

/**
 * Check the expiration date of an ENS name.
 *
 * @param name - ENS name.
 */
async function getExpirationTimestamp(name: string) {
  const url = `https://ens-expiration.vercel.app/${name}`;
  const response = await fetch(url).then((res) => res.json());
  return response.expiration as string;
}

/**
 * Trigger both types of notifications.
 *
 * @param message - The message to display in the notification.
 */
function notify(message: string) {
  snap.request({
    method: 'snap_notify',
    params: {
      type: 'inApp',
      message,
    },
  });

  snap.request({
    method: 'snap_notify',
    params: {
      type: 'native',
      message,
    },
  });
}

// TODO: use `wallet_invokeSnap` with `snap_manageState` to manage the names you want reminders for https://docs.metamask.io/snaps/reference/rpc-api#wallet_invokesnap
