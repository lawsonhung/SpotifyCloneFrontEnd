import { Box, Button, ButtonGroup, IconButton, ListItem, Menu, MenuItem, Typography } from "@mui/material";
import type { Playlist, Track } from "@spotify/web-api-ts-sdk";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../../features/currentTrack/currentTrackSlice";
import { getPlaylists, getTrack } from "../../api";
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

  const handleClick = () => {
    dispatch(setCurrentTrack(track));
  }

  const onAddToPlaylist = async (e: MouseEvent) => {
    const playlists = await getPlaylists();
    setMenuItems(playlists.items);
    setAnchorEl(e.target as HTMLButtonElement);
  }

  const handleCloseAddtoPlaylist = () => {
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
        onClick={handleClick}
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
            onClick={(e) => onAddToPlaylist(e as unknown as MouseEvent)}
          >
            +
          </IconButton>
          <Menu
            id={track.id + "add-to-playlist-menu"}
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseAddtoPlaylist}
            slotProps={{
              list: {
                "aria-labelledby": `${track.id}-add-to-playlist-button`
              }
            }}
          >
            {menuItems?.map(item => <MenuItem
              key={item.id}
              onClick={handleCloseAddtoPlaylist}
            >
              {item.name}
            </MenuItem>
            )}
            <MenuItem onClick={handleCloseAddtoPlaylist}>
              PlaylistNamePlaceholder
            </MenuItem>
          </Menu>
        </>
        :
        null
      }

      <Button
        variant="text"
        onClick={handleClick}
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