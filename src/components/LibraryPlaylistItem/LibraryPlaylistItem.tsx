import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import type { Playlist } from "@spotify/web-api-ts-sdk";

interface LibraryPlaylistItemProps{
  playlist: Playlist,
}

const LibraryPlaylistItem = ({playlist}: LibraryPlaylistItemProps) => {
  return (
    <ListItem
      disableGutters
        sx={{
          paddingTop: 0,
          paddingBottom: 0,
        }}
    >
      <ListItemButton
        disableGutters
        sx={{
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        <ListItemIcon></ListItemIcon>
        <ListItemText primary={playlist.name} />
      </ListItemButton>
    </ListItem>
  )
}

export default LibraryPlaylistItem;