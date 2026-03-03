declare global {
  interface Window {
    Spotify: any,
    onSpotifyWebPlaybackSDKReady: Function,
  }
}

export {};