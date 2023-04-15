import { OnCronjobHandler } from '@metamask/snaps-types';

import {
  getAddress,
  getOwnedEnsNames,
  getRelativeDay,
  notify,
} from './helpers';

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  switch (request.method) {
    case 'ensExpiration': {
      const address = await getAddress();
      const ownedEnsNames = await getOwnedEnsNames(address);

      for (const ownedName of ownedEnsNames) {
        const { name, expiration } = ownedName;

        if (!expiration) {
          continue;
        }

        const relativeExpiration = getRelativeDay(expiration);
        let message = `${name} expires in ${relativeExpiration}`;

        if (name.length > 25) {
          message = `You have an ENS name that expires in ${relativeExpiration}`;
        }

        return notify(message);
      }

      return null;
    }

    default:
      throw new Error('Method not found.');
  }
};

// TODO: use `wallet_invokeSnap` with `snap_manageState` to manage the names you want reminders for https://docs.metamask.io/snaps/reference/rpc-api#wallet_invokesnap
