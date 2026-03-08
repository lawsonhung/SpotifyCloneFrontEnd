import { Box, ListItem, ListItemButton, ListItemIcon, Stack, Typography } from "@mui/material";
import type { Playlist } from "@spotify/web-api-ts-sdk";
import { useDispatch } from "react-redux";
import { setAlbumName, setAlbums, setMainDisplayItem, setNextPageOfAlbumsUrl, setNextPageOfTracksUrl, setTracks } from "../../features/mainDisplayItem/mainDisplayItem";
import { getPlaylistItems } from "../../api/services/playlist";

interface LibraryPlaylistItemProps {
  playlist: Playlist,
}

const LibraryPlaylistItem = ({ playlist }: LibraryPlaylistItemProps) => {

  const dispatch = useDispatch();

  const handleClick = async () => {
    dispatch(setAlbumName(""));
    dispatch(setAlbums([]));
    dispatch(setNextPageOfAlbumsUrl(""));

    const playlistItems = await getPlaylistItems(playlist.id);
    console.log("playlistItems", playlistItems);

    dispatch(setMainDisplayItem(playlist));

    dispatch(setTracks(playlistItems.items.map((playListItem: {item: Object} ) => playListItem.item)));
    dispatch(setNextPageOfTracksUrl(playlistItems.next));
  }

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
        disabled={playlist.owner.id !== import.meta.env.VITE_MY_SPOTIFY_ID}
        onClick={handleClick}
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
            color="textSecondary"
            sx={{
              textTransform: "none",
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            {`Playlist • ${playlist.owner.display_name}`}
          </Typography>
        </Stack>
      </ListItemButton>
    </ListItem >
  )
}

export default LibraryPlaylistItem;