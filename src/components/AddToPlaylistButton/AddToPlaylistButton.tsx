import { IconButton, Menu, MenuItem } from "@mui/material";
import type { Playlist, Track } from "@spotify/web-api-ts-sdk";
import { useState, type Dispatch, type SetStateAction } from "react";
import { addItemsToPlaylist, getPlaylists } from "../../api";

interface AddToPlaylistButtonProps {
  track: Track,
  setHovered: Dispatch<SetStateAction<boolean>>,
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>,
  handleRightClick: Function,
}

const AddtoPlaylistButton = ({ track, setHovered, setSnackbarOpen, handleRightClick }: AddToPlaylistButtonProps) => {

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

    addItemsToPlaylist(playlistId, [track.uri]);
    
    setSnackbarOpen(true);
    handleClosePlaylistMenu();
  }

  const handleClosePlaylistMenu = () => {
    setAnchorEl(null);
    setHovered(false);
    setMenuItems(null);
  }

  // const handleRightClick = (e: SyntheticEvent | MouseEvent) => {
  //   e.preventDefault();
  //   setAnchorEl(e.target as HTMLButtonElement);
  // }

  return (
    <>

      <IconButton
        id={track.id + "-add-to-playlist-button"}
        aria-label="add to playlist"
        aria-controls={open ? "menuid" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => handleDisplayPlaylistsMenu(e as unknown as MouseEvent)}
        onContextMenu={handleRightClick}
      >
        +
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