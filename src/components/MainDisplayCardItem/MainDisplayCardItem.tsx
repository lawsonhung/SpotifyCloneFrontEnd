import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import type { Album, Artist } from "@spotify/web-api-ts-sdk";
import { getTracksInAlbum } from "../../api";
import { useDispatch } from "react-redux";
import { setAlbumName, setMainDisplayItem, setNextPageOfTracksUrl, setTracks } from "../../features/mainDisplayItem/mainDisplayItem";
import { useRef } from "react";
import axios from "axios";

interface MainDisplayCardItem {
  item: Album | Artist;
}

const MainDisplayCardItem = ({ item }: MainDisplayCardItem) => {

  const dispatch = useDispatch();

  const controllerRef = useRef<null | AbortController>(null);

  let year = null;
   if (item.type == "album") year = (item as Album).release_date.slice(0, 4);

  const handleClick = async () => {
    if (controllerRef.current)
      controllerRef.current.abort();

    controllerRef.current = new AbortController();

    try {
      const tracks = await getTracksInAlbum(item.id);
      dispatch(setMainDisplayItem(item));
      dispatch(setAlbumName(item.name));
      dispatch(setTracks(tracks.items));
      dispatch(setNextPageOfTracksUrl(tracks.next));
    } catch (error) {
      if (axios.isCancel(error))
        console.log("Request canceled", error.message);
      else 
        console.log("Request failed", error);
    }
  }

  return (
    <Grid size={1}>
      <Button onClick={handleClick} sx={{ alignItems: "flex-start" }}>
        <Stack>

          <Container
            disableGutters
            sx={{
              objectFit: "cover",
            }}
          >
            <Box
              component={"img"}
              src={item.images[0].url}
              alt={item.name}
              sx={{
                objectFit: "cover",
                width: "100%",
              }}
            />
          </Container>

          <Typography
            color="textPrimary"
            sx={{
              textTransform: "none",
              textAlign: "left",
            }}
          >
            {item.name}
          </Typography>

          {item.type == "album" && <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{
              textTransform: "none",
              textAlign: "left",
            }}
          >
            {year} • Album
          </Typography>}

        </Stack>
      </Button>
    </Grid>
  )
}

export default MainDisplayCardItem;