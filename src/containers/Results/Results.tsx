import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Box, Stack, Typography } from "@mui/material";
import type { Album, Artist } from "@spotify/web-api-ts-sdk";
import MainDisplayAlbumItem from "../../components/MainDisplayAlbumItem/MainDisplayAlbumItem";
import TrackList from "../../components/TrackList/TrackList";

const Results = () => {

  const mainDisplayItem = useSelector((state: RootState) => state.mainDisplayItem);
  const albums = useSelector((state: RootState) => state.mainDisplayItem.albums);

  console.log("mainDisplayItem changed", mainDisplayItem);

  let backgroundImageUrl;
  if ((mainDisplayItem.value as Artist).images)
    backgroundImageUrl = (mainDisplayItem.value as Artist).images[0].url;

  return (
    <>
      {Object.keys(mainDisplayItem.value).length == 0 ?

        <Typography variant="h1"
          sx={{
            textAlign: "center",
            width: "100%",
            height: "100%",
            background: "linear-gradient(#2F3060, #181818)",
            borderRadius: "8px",
          }}
        >
          Look for something
        </Typography>

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

          <Box
            sx={{
              height: "40%",
              backgroundImage: `url(${backgroundImageUrl})`,
              display: "flex",
              flexDirection: "column-reverse",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPositionY: "20%",
            }}
          >
            <Typography variant="h1" fontWeight={900} margin={"0.1em"}>{(mainDisplayItem.value as Artist).name}</Typography>
          </Box >

          <Box
            sx={{
              paddingLeft: "1em",
              paddingRight: "1em",
              paddingTop: "0.5em",
              paddingBottom: "0.5em",
            }}
          >

            <TrackList />

            {albums.length > 1 ?
              <Typography variant="h4" fontWeight={"bold"}>Albums</Typography>
              :
              null}
            <Stack direction={"row"} spacing={2}>
              {albums.map((album: Album) => {
                return <MainDisplayAlbumItem
                  album={album}
                  key={album.id}
                />
              })}
            </Stack>

          </Box>
        </Box >

      }
    </>

  )
}

export default Results;