
export const storageKeys = {
  server: 'charter-server',
}

export const getStorageItem = (key: string): string => {
  if (key === storageKeys.server) {
    return 'corfutravelguide.bitmetro.io';
  }
}
