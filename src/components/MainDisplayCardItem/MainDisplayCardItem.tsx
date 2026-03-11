import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Stack, Typography } from "@mui/material";
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
    console.log("card clicked")
    if (controllerRef.current)
      controllerRef.current.abort();

    controllerRef.current = new AbortController();

    try {
      const tracks = await getTracksInAlbum(item.id);
      // dispatch(setMainDisplayItem(item));
      // dispatch(setAlbumName(item.name));
      // dispatch(setTracks(tracks.items));
      // dispatch(setNextPageOfTracksUrl(tracks.next));
    } catch (error) {
      if (axios.isCancel(error))
        console.log("Request canceled", error.message);
      else
        console.log("Request failed", error);
    }
  }

  return (
    <Grid size={1}>
      <Card
        elevation={0}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "transparent",
        }}
      >

        <CardActionArea
          onClick={handleClick}
          sx={{
            flexGrow: "1",
            flexDirection: "column",
            display: "flex",
            padding: "1em",
          }}>

          <CardMedia
            component="img"
            image={item.images[1].url}
            alt={item.name}
            sx={{
              objectFit: "cover",
              width: "100%",
            }}
          />

          <CardContent sx={{
            flex: "1 0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            width: "100%",
            padding: 0,
          }}>
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
          </CardContent>

        </CardActionArea>

      </Card>
    </Grid>
  )
}

export default MainDisplayCardItem;