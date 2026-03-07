import { Box, ListItem, ListItemButton, ListItemIcon, Stack, Typography } from "@mui/material";
import type { Playlist } from "@spotify/web-api-ts-sdk";

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
          paddingLeft: "0.5em",
          paddingRight: "0.5em",
          marginTop: "0.25em",
          marginBottom: "0.25em",
          width: "100%",
          height: "100%",
          borderRadius: "8px",
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

        <Stack
          marginTop={"0.1em"}
          marginBottom={"0.1em"}
          width={"100%"}
        >
          <Typography
            variant="subtitle1"
            sx={{
              paddingTop: 0,
              paddingBottom: 0,
              marginTop: 0,
              marginBottom: 0,
              width: "100%",
              height: "100%",
              textTransform: "none",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {playlist.name}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              textTransform: "none",
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            {`Playlist • ${(playlist as any).items.total} songs `}
          </Typography>
        </Stack>
      </ListItemButton>
    </ListItem >
  )
}

export default LibraryPlaylistItem;