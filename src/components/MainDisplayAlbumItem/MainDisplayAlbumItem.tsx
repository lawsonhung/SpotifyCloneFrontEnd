import { Button, Container, Stack, Typography } from "@mui/material";
import type { Album } from "@spotify/web-api-ts-sdk";
import Image from "mui-image";
import { getTracksInAlbum } from "../../api";
import type { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { setNextPageUrl, setTracks } from "../../features/mainDisplayItem/mainDisplayItem";

interface MainDisplayAlbumItem {
  album: Album;
  setAlbumName: Dispatch<SetStateAction<string | null>>;
}

const MainDisplayAlbumItem = ({ album, setAlbumName }: MainDisplayAlbumItem) => {
  const dispatch = useDispatch();

  const year = album.release_date.slice(0, 4);

  const handleClick = async () => {
    const tracks = await getTracksInAlbum(album.id);
    console.log("new tracks",tracks);
    setAlbumName(album.name);
    // dispatch(setTracks(tracks.items));
    // dispatch(setNextPageUrl(tracks.next));
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