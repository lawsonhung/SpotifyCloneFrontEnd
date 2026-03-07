import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import type { Playlist } from "@spotify/web-api-ts-sdk";
import Image from "mui-image";

interface LibraryPlaylistItemProps {
  playlist: Playlist,
}

const LibraryPlaylistItem = ({ playlist }: LibraryPlaylistItemProps) => {
  return (
    <ListItem
      disableGutters
      sx={{
        paddingTop: 0,
        paddingBottom: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <ListItemButton
        disableGutters
        sx={{
          paddingTop: 0,
          paddingBottom: 0,
          width: "100%",
          height: "100%",
        }}
      >

        <ListItemIcon
          sx={{
            height: "3em",
            paddingRight: "0.5em",
          }}
        >
          <Box
            component={"img"}
            src={playlist.images[0].url}
            alt={playlist.name}
            sx={{
              objectFit: "cover",
              height: "100%",
              width: "100%",
            }}
          />
        </ListItemIcon>

        <Stack>
          <ListItemText
            primary={playlist.name}
            sx={{
              paddingTop: 0,
              paddingBottom: 0,
              width: "100%",
              height: "100%",
              textTransform: "none",
            }}
          />
          <ListItemText
           primary={`Playlist • ${playlist.items.total} songs`} 
           sx={{
            textTransform: "none",
           }}
           />
        </Stack>
      </ListItemButton>
    </ListItem>
  )
}

export default LibraryPlaylistItem;