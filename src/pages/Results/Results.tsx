import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Box, Stack, Typography } from "@mui/material";
import type { Album, Artist } from "@spotify/web-api-ts-sdk";
import { getAlbumsBy, getTracksInAlbum } from "../../api";
import { useEffect, useState } from "react";
import MainDisplayAlbumItem from "../../components/MainDisplayAlbumItem/MainDisplayAlbumItem";
import TrackList from "../../components/TrackList/TrackList";
import { setNextPageUrl, setTracks } from "../../features/mainDisplayItem/mainDisplayItem";

const Results = () => {

  const dispatch = useDispatch();

  const mainDisplayItem = useSelector((state: RootState) => state.mainDisplayItem);

  console.log("mainDisplayItem", mainDisplayItem);

  const [albumName, setAlbumName] = useState<string | null>(null);
  const [albums, setAlbums] = useState([]);
  

  useEffect(() => {
    // const getAlbums = async () => {
    //   let albumsRes;

    //   if ((mainDisplayItem.value as Artist).id)
    //     albumsRes = await getAlbumsBy((mainDisplayItem.value as Artist).id);

    //   console.log("albumsRes", albumsRes);
    //   if (albumsRes) {
    //     setAlbumName(albumsRes.items[0].name);
    //     setAlbums(albumsRes.items);

    //     let tracksRes;

    //     if (albumsRes.items[0].id)
    //       tracksRes = await getTracksInAlbum((albumsRes.items[0].id));

    //     console.log("tracksRes", tracksRes);
    //     dispatch(setTracks(tracksRes.items));
    //     dispatch(setNextPageUrl(tracksRes.next));
    //   }

    // }
    // // getAlbums();

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
            setAlbumName={setAlbumName} 
            />
          })}
        </Stack>

      </Box>
    </Box >
  )
}

export default Results;