import { Box, Button, Grid, ListItem, Stack } from "@mui/material";
import type { Track } from "@spotify/web-api-ts-sdk";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../../features/currentTrack/currentTrackSlice";

interface MainDisplayItemProps {
  track: Track,
}

const MainDisplayItem = ({ track }: MainDisplayItemProps) => {

  const dispatch = useDispatch();

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
      startIcon={hovered ? <>▶</> : <>{track.track_number}</>}
      onClick={handleClick}
    >
      <Grid
        direction={"row"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <ListItem>{track.name}</ListItem>
        <ListItem
          sx={{
            justifyContent: "flex-end",
          }}
        >{durationInMinutesSeconds()}</ListItem>
      </Grid>
    </Button>
  )
}

export default MainDisplayItem;