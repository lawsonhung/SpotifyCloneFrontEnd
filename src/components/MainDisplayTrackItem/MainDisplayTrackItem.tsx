import { Box, Button, ListItem, Typography } from "@mui/material";
import type { Track } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../../features/currentTrack/currentTrackSlice";
import { getTrack } from "../../api";

interface MainDisplayTrackItemProps {
  track: Track,
  index: number,
}

const MainDisplayTrackItem = ({ track, index }: MainDisplayTrackItemProps) => {

  const dispatch = useDispatch();

  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    const getTrackInfo = async () => {
      const trackInfo = await getTrack(track.id);
      setImgUrl(trackInfo.album.images[1].url);
    }
    // getTrackInfo();
  }, [])

  const [hovered, setHovered] = useState(false);

  const durationInMinutesSeconds = (): string => {
    const totalSeconds = Math.floor(track.duration_ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  const handleClick = () => {
    dispatch(setCurrentTrack(track));
  }

  return (
    <Button
      key={track.id}
      variant="text"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
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

        {imgUrl ?
          <Box
            component={"img"}
            src={imgUrl}
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
            flex: "1 1 100%"
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

        <ListItem
          sx={{
            justifyContent: "flex-end",
            flex: "1",
          }}
        >
          <Typography color="textSecondary" fontSize="0.9em">
            {durationInMinutesSeconds()}
          </Typography>
        </ListItem>

      </Box>

    </Button>
  )
}

export default MainDisplayTrackItem;