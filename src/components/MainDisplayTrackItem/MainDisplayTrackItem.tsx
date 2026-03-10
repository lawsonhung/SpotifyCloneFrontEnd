import { Box, Button, ButtonGroup, ListItem, Menu, MenuItem, Snackbar, Typography } from "@mui/material";
import type { Playlist, Track } from "@spotify/web-api-ts-sdk";
import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrack } from "../../features/currentTrack/currentTrackSlice";
import type { SnackbarCloseReason } from "@mui/material";
import AddtoPlaylistButton from "../AddToPlaylistButton/AddToPlaylistButton";
import type { RootState } from "../../app/store";
import { deleteItemFromPlaylist } from "../../api";

interface MainDisplayTrackItemProps {
  track: Track,
  index: number,
}

const MainDisplayTrackItem = ({ track, index }: MainDisplayTrackItemProps) => {

  const dispatch = useDispatch();

  const mainDisplayItem = useSelector((state: RootState) => state.mainDisplayItem.value)
  const mainDisplayType = (mainDisplayItem as Playlist).type

  const imgUrl = useRef<string | null>(null);

  useEffect(() => {
    // const getTrackInfo = async () => {
    //   const trackInfo = await getTrack(track.id);
    //   imgUrl.current = trackInfo.album.images[1].url;
    // }
    // getTrackInfo();
  }, [])

  const [hovered, setHovered] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const durationInMinutesSeconds = (): string => {
    const totalSeconds = Math.floor(track.duration_ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  const onSetTrack = () => {
    dispatch(setCurrentTrack(track));
  }

  const onCloseSnackbar = (_: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") return
    setSnackbarOpen(false);
  }

  const handleRightClick = (e: SyntheticEvent | MouseEvent) => {
    e.preventDefault();
    setAnchorEl(e.target as HTMLButtonElement);
  }

  const handleContextMenuClose = () => {
    setAnchorEl(null);
    setHovered(false);
  }

  const handleDeleteItemFromPlaylist = (_: MouseEvent) => {
    deleteItemFromPlaylist((mainDisplayItem as Playlist).id, track.uri);
    handleContextMenuClose();
    setSnackbarMsg(`Deleted ${track.name} from ${(mainDisplayItem as Playlist).name}`);
    setSnackbarOpen(true);
  }

  return (
    <ButtonGroup
      key={track.id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        ...(hovered && { backgroundColor: "#00000080", }),
      }}
    >

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        message={snackbarMsg}
        onClose={onCloseSnackbar}
      />

      <Button
        variant="text"
        onClick={onSetTrack}
        sx={{
          flex: "1 1 100%",
        }}
        onContextMenu={handleRightClick}
      >

        <Box
          sx={{
            width: "2em",
          }}
        >
          {hovered ?
            <Typography
              color="textSecondary"
              marginRight="1em"
            >
              ▶
            </Typography>
            :
            <Typography
              color="textSecondary"
              marginRight="1em"
            >
              {index}
            </Typography>
          }
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >

          {imgUrl.current ?
            <Box
              component={"img"}
              src={imgUrl.current}
              alt={track.name}
              sx={{
                objectFit: "cover",
                maxHeight: "3em",
              }}
            />
            :
            null
          }

          <ListItem
            sx={{
              textTransform: "none",
            }}
          >
            <Typography variant="body1" color="textPrimary">
              {track.name}
              {track.explicit ?
                " • Explicit"
                :
                null
              }
            </Typography>
          </ListItem>

        </Box>
      </Button>

      {hovered ?
        <AddtoPlaylistButton
          track={track}
          setHovered={setHovered}
          setSnackbarOpen={setSnackbarOpen}
          handleRightClick={handleRightClick}
          setSnackBarMsg={setSnackbarMsg}
        />
        :
        null
      }

      <Button
        variant="text"
        onClick={onSetTrack}
        sx={{
          justifyContent: "flex-end",
          flex: "1",
        }}
        onContextMenu={handleRightClick}
      >
        <Typography color="textSecondary" fontSize="0.9em">
          {durationInMinutesSeconds()}
        </Typography>
      </Button>

      {(mainDisplayType == "playlist") ?
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleContextMenuClose}
        >
          <MenuItem
            onClick={e => handleDeleteItemFromPlaylist(e as unknown as MouseEvent)}
          >
            Delete
            </MenuItem>
        </Menu>
        :
        null
      }
    </ButtonGroup>
  )
}

export default MainDisplayTrackItem;