import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Box, Button, Stack, Typography } from "@mui/material";
import type { Album, Artist, Track } from "@spotify/web-api-ts-sdk";
import MainDisplayTrackItem from "../../components/MainDisplayTrackItem/MainDisplayTrackItem";
import { getAlbumsBy, getNextPageOfItems, getTracksInAlbum } from "../../api";
import { useEffect, useRef, useState } from "react";
import MainDisplayAlbumItem from "../../components/MainDisplayAlbumItem/MainDisplayAlbumItem";
import TrackList from "../../components/TrackList/TrackList";
import { setDisplayTracks } from "../../features/displayTracks/displayTracks";

const Results = () => {

  const dispatch = useDispatch();

  const mainDisplayItem = useSelector((state: RootState) => state.mainDisplayItem);
  const tracks = useSelector((state: RootState) => state.displayTracks.value);

  console.log("mainDisplayItem", mainDisplayItem);

  const [albumName, setAlbumName] = useState<string | null>(null);
  const [albums, setAlbums] = useState([]);
  const nextPageUrl = useRef<null | string>(null);

  useEffect(() => {
    const getAlbums = async () => {
      let albumsRes;

      if ((mainDisplayItem.value as Artist).id)
        albumsRes = await getAlbumsBy((mainDisplayItem.value as Artist).id);

      console.log("albumsRes", albumsRes);
      if (albumsRes) {
        setAlbumName(albumsRes.items[0].name);
        setAlbums(albumsRes.items);

        let tracksRes;

        if (albumsRes.items[0].id)
          tracksRes = await getTracksInAlbum((albumsRes.items[0].id));

        console.log("tracksRes", tracksRes);
        dispatch(setDisplayTracks(tracksRes.items));
        nextPageUrl.current = tracksRes.next;
      }

    }
    getAlbums();

  }, [mainDisplayItem]);

  let backgroundImageUrl;
  if ((mainDisplayItem.value as Artist).images)
    backgroundImageUrl = (mainDisplayItem.value as Artist).images[0].url;

  const handleClick = async () => {
    if (nextPageUrl.current) {
      const nextPage = await getNextPageOfItems(nextPageUrl.current);
      console.log("nextPage", nextPage)
      nextPageUrl.current = nextPage.next;
      dispatch(setDisplayTracks([...tracks, ...nextPage.items]))
    }
  }

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
          {tracks.map((track: Track) => {
            return <MainDisplayTrackItem track={track} key={track.id} />
          })}
        </Stack>

        {nextPageUrl.current ?
          <Button
            variant="text"
            sx={{
              textTransform: "none",
            }}
            onClick={handleClick}
          >See more</Button>
          :
          null
        }

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
            nextPageUrl={nextPageUrl}
            />
          })}
        </Stack>

      </Box>
    </Box >
  )
}

export default Results;