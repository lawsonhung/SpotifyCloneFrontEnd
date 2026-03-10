import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Box, Typography } from "@mui/material";
import TrackList from "../../components/TrackList/TrackList";
import AlbumList from "../../components/AlbumList/AlbumList";
import ResultsHeader from "../../components/ResultsHeader/ResultsHeader";
import SuggestedArtists from "../../components/SuggestedArtists/SuggestedArtists";

const Results = () => {

  const mainDisplayItem = useSelector((state: RootState) => state.mainDisplayItem);

  return (
    <>
      {Object.keys(mainDisplayItem.value).length == 0 ?

        <Box
          sx={{
            height: "100%",
            background: "linear-gradient(#2F3060, #181818)",
            borderRadius: "8px",
            flex: "1",
            overflow: "scroll",
            paddingLeft: "1em",
            paddingRight: "1em",
            paddingTop: "0.5em",
            paddingBottom: "0.5em",
          }}
        >
          <SuggestedArtists />
        </Box>

        :

        <Box
          sx={{
            height: "100%",
            background: "linear-gradient(#2F3060, #181818)",
            borderRadius: "8px",
            flex: "1",
            overflow: "scroll",
          }}
        >

          <ResultsHeader />

          <Box
            sx={{
              paddingLeft: "1em",
              paddingRight: "1em",
              paddingTop: "0.5em",
              paddingBottom: "0.5em",
            }}
          >
            <TrackList />
            <AlbumList />
          </Box>
        </Box >

      }
    </>

  )
}

export default Results;