import { OnCronjobHandler } from '@metamask/snaps-types';
import { getExpirationTimestamp, getRelativeDay, notify } from './helpers';

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  const name = 'gregskril.eth';

  switch (request.method) {
    case 'ensExpiration': {
      const expiration = await getExpirationTimestamp(name);
      const relativeExpiration = getRelativeDay(expiration);
      const message = `${name} expires in ${relativeExpiration}.`;
      return notify(message);
    }

    default:
      throw new Error('Method not found.');
  }
};

// TODO: use `wallet_invokeSnap` with `snap_manageState` to manage the names you want reminders for https://docs.metamask.io/snaps/reference/rpc-api#wallet_invokesnap
