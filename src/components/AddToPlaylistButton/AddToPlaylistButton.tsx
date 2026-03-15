import { Box, Icon, IconButton, Menu, MenuItem } from "@mui/material";
import type { Playlist, Track } from "@spotify/web-api-ts-sdk";
import { useState, type Dispatch, type SetStateAction } from "react";
import { addItemsToPlaylist, getPlaylists } from "../../api";
import { useDispatch } from "react-redux";
import { setSnackbarMessage, setSnackbarOpen } from "../../features/snackbar/snackbar";
import addCircle from "../../assets/addCircle.svg";
import addCircleFilled from "../../assets/addCircleFilled.svg";

interface AddToPlaylistButtonProps {
  track: Track,
  setHovered: Dispatch<SetStateAction<boolean>>,
}

const AddtoPlaylistButton = ({ track, setHovered }: AddToPlaylistButtonProps) => {

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [menuItems, setMenuItems] = useState<null | Playlist[]>(null);

  const handleDisplayPlaylistsMenu = async (e: MouseEvent) => {
    const playlists = await getPlaylists();
    setMenuItems(playlists.items);
    setAnchorEl(e.target as HTMLButtonElement);
  }

  const handleAddToPlaylist = (e: MouseEvent) => {
    const playlistId = (e.currentTarget as HTMLElement).dataset.id as string;
    const playlistName = (e.currentTarget as HTMLElement).dataset.name;

    addItemsToPlaylist(playlistId, [track.uri]);

    dispatch(setSnackbarMessage(`Added ${track.name} to ${playlistName}`));
    dispatch(setSnackbarOpen(true));
    handleClosePlaylistMenu();
  }

  const handleClosePlaylistMenu = () => {
    setAnchorEl(null);
    setHovered(false);
    setMenuItems(null);
  }

  return (
    <>

      <IconButton
        id={track.id + "-add-to-playlist-button"}
        aria-label="add to playlist"
        aria-controls={open ? "menuid" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => handleDisplayPlaylistsMenu(e as unknown as MouseEvent)}
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
          <Box component={"img"} src={addCircle} alt="Add track to playlist" />
          {/* <Box>
            <AddCircle />
          </Box> */}
        </Icon>
        <Icon className="addIconHover">
          <Box component={"img"} src={addCircleFilled} alt="Add track to playlist hover" />
          {/* <Box>
            <AddCircleFilled />
          </Box> */}
        </Icon>
      </IconButton>
      <Menu
        id={track.id + "add-to-playlist-menu"}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClosePlaylistMenu}
        slotProps={{
          list: {
            "aria-labelledby": `${track.id}-add-to-playlist-button`
          }
        }}
      >
        {menuItems?.map(item => <MenuItem
          key={item.id}
          data-id={item.id}
          data-name={item.name}
          onClick={e => handleAddToPlaylist(e as unknown as MouseEvent)}
        >
          {item.name}
        </MenuItem>
        )}
      </Menu>
    </>
  )
}

export default AddtoPlaylistButton;