import { OnCronjobHandler, OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('This custom confirmation is just for display purposes.'),
            text(
              'But you can edit the snap source code to make it do something, if you want to!',
            ),
          ]),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  const name = 'gregskril.eth';

  switch (request.method) {
    case 'ensExpiration': {
      const expiration = await getExpirationTimestamp(name);
      const message = `A name of yours expires on ${expiration}.`;

      console.log(message);
      return notify(message);
      // return snap.request({
      //   method: 'snap_notify',
      //   params: {
      //     type: 'inApp',
      //     message: `A name of yours expires on ${expiration}`,
      //   },
      // });
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
