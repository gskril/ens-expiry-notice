import { computeAddress } from '@ethersproject/transactions';
import { SubgraphResponse } from './types';

/**
 * Trigger both types of notifications.
 *
 * @param message - The message to display in the notification.
 */
export function notify(message: string) {
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

/**
 * Convert an ENS name expiration date to a relative day count.
 *
 * @param expiration - The timestamp of an ENS name's expiration.
 * @returns The relative day count.
 */
export function getRelativeDay(expiration: number) {
  const now = new Date();
  const expirationDate = new Date(expiration);
  const timeDiff = expirationDate.getTime() - now.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return `${dayDiff} days`;
}

/**
 * Get the ENS names owned by the connected account.
 *
 * @param address - ETH address to lookup.
 */
export async function getOwnedEnsNames(address: string) {
  const thirtyDaysFromNow = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
  const endpoint =
    'https://api.thegraph.com/subgraphs/name/ensdomains/ensgoerli';

  const query = `
    {
      domains(where: {
        owner: "${address.toLowerCase()}"
        registration_: {
          expiryDate_lte: ${thirtyDaysFromNow}
        }
      }) {
        name
        registration {
          expiryDate
        }
      }
    }
  `;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const json = (await response.json()) as SubgraphResponse;
  return json.data.domains.map((domain) => {
    const timestampStr = domain.registration.expiryDate;

    return {
      name: domain.name,
      expiration: timestampStr ? parseFloat(timestampStr) * 1000 : null,
    };
  });
}

/**
 * Get the public address of the first MetaMask account.
 */
export async function getAddress() {
  const publicKey = await snap.request({
    method: 'snap_getBip32PublicKey',
    params: {
      path: ['m', "44'", "60'", "0'", '0', '0'],
      curve: 'secp256k1',
      compressed: true,
    },
  });

  return computeAddress(publicKey);
}
