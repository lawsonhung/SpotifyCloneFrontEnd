import { Box, Icon, IconButton, Stack, Typography } from "@mui/material";
import { createPlaylist } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylists } from "../../features/library/library";
import type { RootState } from "../../app/store";
import { setSnackbarMessage, setSnackbarOpen } from "../../features/snackbar/snackbar";
import addCircle from "../../assets/addCircle.svg";
import addCircleFilled from "../../assets/addCircleFilled.svg";

const LibraryHeader = () => {

  const dispatch = useDispatch();

  const playlists = useSelector((state: RootState) => state.library.playlists);

  const handleClick = async () => {
    const newPlaylist = await createPlaylist("New playlist");
    dispatch(setPlaylists([newPlaylist, ...playlists]));
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
        sx={{
          "&:hover": {
            backgroundColor: "transparent",
            "& .addIcon": {
              display: "none",
            },
            "& .addIconHover": {
              display: "block",
            },
          },
          "& .addIconHover": {
            display: "none",
          }
        }}
        >
      <Icon className="addIcon">
        <Box component={"img"} src={addCircle} alt="Add playlist" />
      </Icon>
      <Icon className="addIconHover">
        <Box component={"img"} src={addCircleFilled} alt="Add playlist hover" />
      </Icon>
    </IconButton>
      </Stack >
  )
}

export default LibraryHeader;