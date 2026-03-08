import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Button, Stack, Typography } from "@mui/material";
import type { Track } from "@spotify/web-api-ts-sdk";
import MainDisplayTrackItem from "../MainDisplayTrackItem/MainDisplayTrackItem";
import { getNextPageOfItems } from "../../api";
import { setNextPageOfTracksUrl, setTracks } from "../../features/mainDisplayItem/mainDisplayItem";

const TrackList = () => {

  const dispatch = useDispatch();

  const albumName = useSelector((state: RootState) => state.mainDisplayItem.albumName);
  const tracks = useSelector((state: RootState) => state.mainDisplayItem.tracks);
  const nextPageOfTracksUrl = useSelector((state: RootState) => state.mainDisplayItem.nextPageOfTracksUrl);

  const handleClick = async () => {
    const nextPage = await getNextPageOfItems(nextPageOfTracksUrl);
    dispatch(setNextPageOfTracksUrl(nextPage.next));
    dispatch(setTracks([...tracks, ...nextPage.items]))
  }

  return (
    <Stack>

      <Typography
        variant="h4"
        fontWeight={"bold"}
      >
        {albumName}
      </Typography>

      {tracks.map((track: Track) => {
        return <MainDisplayTrackItem track={track} key={track.id} />
      })}

      {nextPageOfTracksUrl ?
        <Button
          variant="text"
          sx={{
            justifyContent: "left",
            width: "fit-content",
          }}
          onClick={handleClick}
        >
          <Typography color="textSecondary"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                color: "white",
              }
            }}>
            See more
          </Typography>
        </Button>
        :
        null
      }
    </Stack>
  )
}

export default TrackList;