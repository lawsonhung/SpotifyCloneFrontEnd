import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Button, Stack, Typography } from "@mui/material";
import type { Track } from "@spotify/web-api-ts-sdk";
import MainDisplayTrackItem from "../MainDisplayTrackItem/MainDisplayTrackItem";
import { getNextPageOfItems } from "../../api";
import { setNextPageUrl, setTracks } from "../../features/mainDisplayItem/mainDisplayItem";

const TrackList = () => {

  const dispatch = useDispatch();

  const albumName = useSelector((state: RootState) => state.mainDisplayItem.albumName);
  const tracks = useSelector((state: RootState) => state.mainDisplayItem.tracks);
  const nextPageUrl = useSelector((state: RootState) => state.mainDisplayItem.nextPageUrl);

  const handleClick = async () => {
    if (nextPageUrl) {
      const nextPage = await getNextPageOfItems(nextPageUrl);
      dispatch(setNextPageUrl(nextPage.next));
      dispatch(setTracks([...tracks, ...nextPage.items]))
    }
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

      {nextPageUrl ?
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