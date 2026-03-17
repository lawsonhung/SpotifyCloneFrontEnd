import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Box } from "@mui/material";
import TrackList from "../../components/TrackList/TrackList";
import AlbumList from "../../components/AlbumList/AlbumList";
import Banner from "../../components/Banner/Banner";
import SuggestedArtists from "../../components/SuggestedArtists/SuggestedArtists";

const Results = () => {

  const mainDisplayItem = useSelector((state: RootState) => state.mainDisplayItem);

  return (
    <>
      <Box
        sx={{
          height: "100%",
          background: "linear-gradient(#2F3060, #181818)",
          borderRadius: "8px",
          flex: "1",
          overflow: "scroll",
          paddingBottom: "0.5em",
        }}
      >

        {Object.keys(mainDisplayItem.value).length >= 1 && <Banner />}

        <Box
          sx={{
            paddingLeft: "1em",
            paddingRight: "1em",
            paddingTop: "0.5em",
          }}
        >
          {Object.keys(mainDisplayItem.value).length == 0 ?
            <SuggestedArtists />
            :
            <>
              <TrackList />
              <AlbumList />
            </>

          }
        </Box>
      </Box>
    </>

  )
}

export default Results;