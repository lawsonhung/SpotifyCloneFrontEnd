import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Button, Stack } from "@mui/material";
import type { Track } from "@spotify/web-api-ts-sdk";
import MainDisplayTrackItem from "../MainDisplayTrackItem/MainDisplayTrackItem";
import { getNextPageOfItems } from "../../api";
import { setNextPageUrl, setTracks } from "../../features/mainDisplayItem/mainDisplayItem";

const TrackList = () => {

  const dispatch = useDispatch();

  const tracks = useSelector((state: RootState) => state.mainDisplayItem.tracks);
  const nextPageUrl = useSelector((state: RootState) => state.mainDisplayItem.nextPageUrl);

  const handleClick = async () => {
    if (nextPageUrl) {
      const nextPage = await getNextPageOfItems(nextPageUrl);
      console.log("nextPage", nextPage)
      dispatch(setNextPageUrl(nextPage.next));
      dispatch(setTracks([...tracks, ...nextPage.items]))
    }
  }

  return (
    <Stack>
      <h1>TrackList</h1>
      {tracks.map((track: Track) => {
        return <MainDisplayTrackItem track={track} key={track.id} />
      })}

      {nextPageUrl ?
        <Button
          variant="text"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
          }}
        onClick={handleClick}
        >See more</Button>
        :
        null
      }
    </Stack>
  )
}

export default TrackList;