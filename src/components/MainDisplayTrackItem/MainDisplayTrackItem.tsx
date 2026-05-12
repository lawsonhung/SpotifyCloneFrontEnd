import { Box, Button, ButtonGroup, ListItem, Menu, MenuItem, Typography, type PopoverPosition } from "@mui/material";
import type { Album, Playlist, Track } from "@spotify/web-api-ts-sdk";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrack } from "../../features/currentTrack/currentTrackSlice";
import AddtoPlaylistButton from "../AddToPlaylistButton/AddToPlaylistButton";
import type { RootState } from "../../app/store";
import { deleteItemFromPlaylist, getTrack } from "../../api";
import { setSnackbarMessage, setSnackbarOpen } from "../../features/snackbar/snackbar";
import axios from "axios";

interface MainDisplayTrackItemProps {
  track: Track,
  index: number,
}

const MainDisplayTrackItem = ({ track, index }: MainDisplayTrackItemProps) => {

  const dispatch = useDispatch();

  const mainDisplayItem = useSelector((state: RootState) => state.mainDisplayItem.value);
  const mainDisplayType = (mainDisplayItem as Playlist).type;

  const imgUrl = useRef<string | null>(null);
  const controllerRef = useRef<null | AbortController>(null);

  useEffect(() => {
    const getTrackInfo = async () => {
      if (mainDisplayType == "album"
        && (mainDisplayItem as Album).images.length > 1)
        imgUrl.current = (mainDisplayItem as Album).images[1].url;
      else {
        if (controllerRef.current)
          controllerRef.current.abort();

        controllerRef.current = new AbortController();
        try {
          const trackInfo = await getTrack(track.id, controllerRef.current.signal);
          imgUrl.current = trackInfo.album.images[1].url;
        } catch (error) {
          if (axios.isCancel(error))
            console.log("Request canceled", error.message);
          else
            console.error("Request failed:", error);
        }
      }
    }
    getTrackInfo();
  }, [])

  const [hovered, setHovered] = useState(false);
  const [menuAnchorPosition, setMenuAnchorPosition] = useState<null | PopoverPosition>(null);
  const [showComponent, setShowComponent] = useState<boolean>(true);

  const durationInMinutesSeconds = (): string => {
    const totalSeconds = Math.floor(track.duration_ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  const handleSetTrack = () => {
    dispatch(setCurrentTrack(track));
  }

  const handleRightClick = (e: MouseEvent) => {
    e.preventDefault();
    setMenuAnchorPosition({ top: e.clientY, left: e.clientX });
  }

  const handleContextMenuClose = () => {
    setMenuAnchorPosition(null);
    setHovered(false);
  }

  const handleDeleteItemFromPlaylist = (_: MouseEvent) => {
    deleteItemFromPlaylist((mainDisplayItem as Playlist).id, track.uri);
    handleContextMenuClose();
    dispatch(setSnackbarMessage(`Deleted ${track.name} from ${(mainDisplayItem as Playlist).name}`));
    dispatch(setSnackbarOpen(true));
    setShowComponent(false);
  }

  return (
    <>
      {showComponent && <ButtonGroup
        key={track.id}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          backgroundColor: hovered ? "#90caf914" : "palette.primary.dark",
        }}
      >

        <Button
          variant="text"
          onClick={handleSetTrack}
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

            {imgUrl.current && <Box
              component={"img"}
              src={imgUrl.current}
              alt={track.name}
              sx={{
                objectFit: "cover",
                maxHeight: "3em",
              }}
            />}

            <ListItem
              sx={{
                textTransform: "none",
              }}
            >
              <Typography variant="body1" color="textPrimary">
                {track.name}
                {track.explicit && " • Explicit"}
              </Typography>
            </ListItem>

          </Box>
        </Button>

        {hovered && <AddtoPlaylistButton
          track={track}
          setHovered={setHovered}
          handleRightClick={handleRightClick}
        />}

        <Button
          variant="text"
          onClick={handleSetTrack}
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

        {(mainDisplayType == "playlist") && <Menu
          open={!!menuAnchorPosition}
          onClose={handleContextMenuClose}
          anchorReference="anchorPosition"
          anchorPosition={menuAnchorPosition as PopoverPosition}
        >
          <MenuItem
            onClick={e => handleDeleteItemFromPlaylist(e as unknown as MouseEvent)}
            disabled
          >
            Delete
          </MenuItem>
        </Menu>
        }
      </ButtonGroup>
      }
    </>
  )
}

export default MainDisplayTrackItem;