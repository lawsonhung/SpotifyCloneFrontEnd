import { Button, Container, Stack, Typography } from "@mui/material";
import type { Album, Track } from "@spotify/web-api-ts-sdk";
import Image from "mui-image";
import { getTracksInAlbum } from "../../api";
import type { Dispatch, RefObject, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { setDisplayTracks } from "../../features/displayTracks/displayTracks";

interface MainDisplayAlbumItem {
  album: Album;
  setAlbumName: Dispatch<SetStateAction<string | null>>;
  nextPageUrl: RefObject<null | string>;
}

const MainDisplayAlbumItem = ({ album, setAlbumName, nextPageUrl }: MainDisplayAlbumItem) => {
  const dispatch = useDispatch();

  const year = album.release_date.slice(0, 4);

  const handleClick = async () => {
    const tracks = await getTracksInAlbum(album.id);
    console.log("new tracks",tracks);
    setAlbumName(album.name);
    dispatch(setDisplayTracks(tracks.items));
    nextPageUrl.current = tracks.next;
  }

  return (
    <Button onClick={handleClick}>
      <Stack>
        <Container
          sx={{
            objectFit: "cover",
          }}
        >
          <Image
            src={album.images[0].url}
            alt={album.name}
          />
        </Container>
        <Typography sx={{textTransform: "none"}}>{album.name}</Typography>
        <Typography sx={{textTransform: "none"}}>{year} • Album</Typography>
      </Stack>
    </Button>
  )
}

export default MainDisplayAlbumItem;