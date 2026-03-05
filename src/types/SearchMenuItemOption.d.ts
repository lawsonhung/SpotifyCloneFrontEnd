import type { Album, Artist, Audiobook, Episode, Playlist, Show, Track } from "@spotify/web-api-ts-sdk";

export interface SearchMenuItemOption {
  label: string,
  item: SearchMenuItemType,
}

export type SearchMenuItemType = Track | Album | Artist | Playlist | Show | Episode | Audiobook;