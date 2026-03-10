import { IconButton, Stack, Typography } from "@mui/material";
import { createPlaylist } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylists } from "../../features/library/library";
import type { RootState } from "../../app/store";
import { setSnackbarMessage, setSnackbarOpen } from "../../features/snackbar/snackbar";

const LibraryHeader = () => {

  const dispatch = useDispatch();

  const playlists = useSelector((state: RootState) => state.library.playlists);

  const handleClick = async () => {
    const newPlaylist = await createPlaylist("New playlist");
    // dispatch(setPlaylists([newPlaylist, ...playlists]));
    dispatch(setSnackbarMessage("Created New playlist"));
    dispatch(setSnackbarOpen(true));
  }

  return (
    <Stack direction="row" justifyContent="space-between">
        <Typography
          fontWeight="bold"
          paddingTop="0.5em"
          paddingLeft="0.5em"
        >
          Your Library
        </Typography>
        <IconButton
          aria-label="add new playlist"
          onClick={handleClick}
        >
          +
        </IconButton>
      </Stack>
  )
}

export default LibraryHeader;