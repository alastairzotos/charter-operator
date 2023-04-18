
export const storageKeys = {
  host: 'charter-host',
}

export const getStorageItem = (key: string): string => {
  if (key === storageKeys.host) {
    return 'corfutravelguide.bitmetro.io';
  }
}
