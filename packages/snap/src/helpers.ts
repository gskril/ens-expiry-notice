import { computeAddress } from '@ethersproject/transactions';

/**
 * Check the expiration date of an ENS name.
 *
 * @param name - ENS name.
 */
export async function getExpirationTimestamp(name: string) {
  const url = `https://ens-expiration.vercel.app/${name}`;
  const response = await fetch(url).then((res) => res.json());
  return response.expiration as string;
}

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
 * @param expiration - The string representation of an ENS name expiration date.
 * @returns The relative day count.
 */
export function getRelativeDay(expiration: string) {
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
  // TODO: Get this from the ENS Subgraph https://thegraph.com/hosted-service/subgraph/ensdomains/ens
  /* 
    {
      domains(where: {
        owner: "0x179a862703a4adfb29896552df9e307980d19285"
      }) {
        name
        registration {
          expiryDate
        }
      }
    }
   */

  console.log(address);
  return ['gregskril.eth'];
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
