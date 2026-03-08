import { IconButton, Stack, Typography } from "@mui/material";
import { createPlaylist } from "../../api";

const LibraryHeader = () => {

  const handleClick = async () => {
    const newPlaylist = await createPlaylist("New playlist");
    console.log("newPlaylist", newPlaylist);
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