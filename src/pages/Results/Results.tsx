import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Box, Stack, Typography } from "@mui/material";
import type { Artist } from "@spotify/web-api-ts-sdk";
import MainDisplayItem from "../../components/MainDisplayItem/MainDisplayItem";
import { getAlbumsBy, getTracksInAlbum } from "../../api";
import { useEffect, useState } from "react";

const Results = () => {

  const mainDisplayItem = useSelector((state: RootState) => state.mainDisplayItem);

  console.log("mainDisplayItem", mainDisplayItem);

  const [albumName, setAlbumName] = useState<string | null>(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const getAlbums = async () => {
      const albums = await getAlbumsBy((mainDisplayItem.value as Artist).id);
      console.log("albums",albums);
      setAlbumName(albums.items[0].name);
      const tracks = await getTracksInAlbum((albums.items[0].id));
      console.log("tracks", tracks);
      setTracks(tracks.items);
    }
    getAlbums();

  }, [mainDisplayItem]);
  let backgroundImageUrl;
  if ((mainDisplayItem.value as Artist).images)
    backgroundImageUrl = (mainDisplayItem.value as Artist).images[0].url;

  return (
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
        <Typography variant="h4" fontWeight={"bold"}>{albumName}</Typography>
        <Stack>
          {tracks.map((track) => {
            return <MainDisplayItem track={track}/>
          })}
        </Stack>
        <Stack>
          
        </Stack>
      </Box>
    </Box >
  )
}

export default Results;