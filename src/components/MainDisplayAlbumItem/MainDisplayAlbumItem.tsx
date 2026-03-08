import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import type { Album } from "@spotify/web-api-ts-sdk";
import Image from "mui-image";
import { getTracksInAlbum } from "../../api";
import { useDispatch } from "react-redux";
import { setAlbumName, setNextPageOfTracksUrl, setTracks } from "../../features/mainDisplayItem/mainDisplayItem";

interface MainDisplayAlbumItem {
  album: Album;
}

const MainDisplayAlbumItem = ({ album }: MainDisplayAlbumItem) => {
  const dispatch = useDispatch();

  const year = album.release_date.slice(0, 4);

  const handleClick = async () => {
    const tracks = await getTracksInAlbum(album.id);
    dispatch(setAlbumName(album.name));
    dispatch(setTracks(tracks.items));
    dispatch(setNextPageOfTracksUrl(tracks.next));
  }

  return (
    <Grid size={1}>
      <Button onClick={handleClick} sx={{ alignItems: "flex-start" }}>
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

          <Typography
            color="textPrimary"
            sx={{
              textTransform: "none",
              textAlign: "left",
            }}
          >
            {album.name}
          </Typography>

          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{
              textTransform: "none",
              textAlign: "left",
            }}
          >
            {year} • Album
          </Typography>

        </Stack>
      </Button>
    </Grid>
  )
}

export default MainDisplayAlbumItem;