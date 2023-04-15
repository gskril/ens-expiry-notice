import { GetSnapsResponse } from '@/types'

export function AddSnapButton() {
  return <button onClick={async () => await getSnaps()}>Add Snap</button>
}

/**
 * Get the installed snaps in MetaMask.
 *
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async (): Promise<GetSnapsResponse> => {
  return (await window.ethereum.request({
    method: 'wallet_getSnaps',
  })) as unknown as GetSnapsResponse
}
