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
