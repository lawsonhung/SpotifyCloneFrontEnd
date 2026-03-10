import { Box, ListItem, ListItemButton, ListItemIcon, Menu, MenuItem, Stack, Typography } from "@mui/material";
import type { Playlist } from "@spotify/web-api-ts-sdk";
import { useDispatch } from "react-redux";
import { setAlbumName, setAlbums, setMainDisplayItem, setNextPageOfAlbumsUrl, setNextPageOfTracksUrl, setTracks } from "../../features/mainDisplayItem/mainDisplayItem";
import { deletePlaylist, getPlaylistItems } from "../../api/services/playlist";
import { useState, type SyntheticEvent } from "react";
import { setSnackbarMessage, setSnackbarOpen } from "../../features/snackbar/snackbar";

interface LibraryPlaylistItemProps {
  playlist: Playlist,
}

const LibraryPlaylistItem = ({ playlist }: LibraryPlaylistItemProps) => {

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [showComponent, setShowComponent] = useState<boolean>(true);

  const handleClick = async () => {
    dispatch(setAlbumName(""));
    dispatch(setAlbums([]));
    dispatch(setNextPageOfAlbumsUrl(""));

    const playlistItems = await getPlaylistItems(playlist.id);

    dispatch(setMainDisplayItem(playlist));
    dispatch(setTracks(playlistItems.items.map((playListItem: { item: Object }) => playListItem.item)));
    dispatch(setNextPageOfTracksUrl(playlistItems.next));
  }

  const handleRightClick = (e: SyntheticEvent | MouseEvent) => {
    e.preventDefault();
    setAnchorEl(e.target as HTMLButtonElement);
  }

  const handleContextMenuClose = () => {
    setAnchorEl(null);
  }

  const handleDeletePlaylist = (_: MouseEvent) => {
    deletePlaylist(playlist.uri);
    handleContextMenuClose();
    setShowComponent(false);
    dispatch(setSnackbarOpen(true));
    dispatch(setSnackbarMessage(`Deleted ${playlist.name}`));
  }

  return (
    <>
      {showComponent && <ListItem
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
          onContextMenu={handleRightClick}
        >

          <ListItemIcon
            sx={{
              height: "3em",
              paddingRight: "0.5em",
            }}
          >
            {playlist.images && playlist.images.length > 0 && <Box
                component={"img"}
                src={playlist.images[0].url}
                alt={playlist.name}
                sx={{
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                }}
              /> }
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

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleContextMenuClose}
        >
          <MenuItem
            onClick={e => handleDeletePlaylist(e as unknown as MouseEvent)}
          >
            Delete
          </MenuItem>
        </Menu>
      </ListItem >
      }
    </>
  )
}

export default LibraryPlaylistItem;