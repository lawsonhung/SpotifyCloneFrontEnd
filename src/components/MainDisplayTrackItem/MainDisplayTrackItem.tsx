import { Box, Button, ButtonGroup, IconButton, ListItem, Menu, MenuItem, Typography } from "@mui/material";
import type { Playlist, Track } from "@spotify/web-api-ts-sdk";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../../features/currentTrack/currentTrackSlice";
import { addItemsToPlaylist, getPlaylists, getTrack } from "../../api";
import { setPlaylists } from "../../features/library/library";

interface MainDisplayTrackItemProps {
  track: Track,
  index: number,
}

const MainDisplayTrackItem = ({ track, index }: MainDisplayTrackItemProps) => {

  const dispatch = useDispatch();

  const imgUrl = useRef<string | null>(null);

  useEffect(() => {
    // const getTrackInfo = async () => {
    //   const trackInfo = await getTrack(track.id);
    //   imgUrl.current = trackInfo.album.images[1].url;
    // }
    // getTrackInfo();
  }, [])

  const [hovered, setHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [menuItems, setMenuItems] = useState<null | Playlist[]>(null);

  const durationInMinutesSeconds = (): string => {
    const totalSeconds = Math.floor(track.duration_ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  const onSetTrack = () => {
    dispatch(setCurrentTrack(track));
  }

  const onDisplayPlaylistsMenu = async (e: MouseEvent) => {
    const playlists = await getPlaylists();
    setMenuItems(playlists.items);
    setAnchorEl(e.target as HTMLButtonElement);
  }

  const onAddToPlaylist = async (e: MouseEvent) => {
    const playlistId = (e.currentTarget as HTMLElement).dataset.id as string;
    console.log("playlist id", playlistId)
    console.log("track", track);
    const addToPlaylistRes = await addItemsToPlaylist(playlistId, [track.uri]);

    onClosePlaylistMenu();
  }

  const onClosePlaylistMenu = () => {
    setAnchorEl(null);
    setHovered(false);
    setMenuItems(null);
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

      <Button
        variant="text"
        onClick={onSetTrack}
        sx={{
          flex: "1 1 100%",
        }}
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
        <>
          <IconButton
            id={track.id + "-add-to-playlist-button"}
            aria-label="add to playlist"
            aria-controls={open ? "menuid" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(e) => onDisplayPlaylistsMenu(e as unknown as MouseEvent)}
          >
            +
          </IconButton>
          <Menu
            id={track.id + "add-to-playlist-menu"}
            anchorEl={anchorEl}
            open={open}
            onClose={onClosePlaylistMenu}
            slotProps={{
              list: {
                "aria-labelledby": `${track.id}-add-to-playlist-button`
              }
            }}
          >
            {menuItems?.map(item => <MenuItem
              key={item.id}
              data-id={item.id}
              onClick={e => onAddToPlaylist(e as unknown as MouseEvent)}
            >
              {item.name}
            </MenuItem>
            )}
          </Menu>
        </>
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
      >
        <Typography color="textSecondary" fontSize="0.9em">
          {durationInMinutesSeconds()}
        </Typography>
      </Button>


    </ButtonGroup>
  )
}

export default MainDisplayTrackItem;