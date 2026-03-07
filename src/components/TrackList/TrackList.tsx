import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Stack } from "@mui/material";
import type { Track } from "@spotify/web-api-ts-sdk";
import MainDisplayTrackItem from "../MainDisplayTrackItem/MainDisplayTrackItem";
import { useEffect } from "react";

const TrackList = () => {

  const tracks = useSelector((state: RootState) => state.displayTracks.value);
  useEffect(() => {
    console.log("trackList rerender becuase displayTracks changed", tracks)
  }, [tracks])
  
  return (
    <Stack>
      <h1>TrackList</h1>
      {tracks.map((track: Track) => {
        return <MainDisplayTrackItem track={track} key={track.id} />
      })}
    </Stack>
  )
}

export default TrackList;