import { Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import type { Album, Artist } from "@spotify/web-api-ts-sdk";
import { getAlbumsBy, getTracksInAlbum } from "../../api";
import { useDispatch } from "react-redux";
import { setAlbumName, setAlbums, setMainDisplayItem, setNextPageOfAlbumsUrl, setNextPageOfTracksUrl, setTracks } from "../../features/mainDisplayItem/mainDisplayItem";
import { useRef } from "react";
import axios from "axios";

interface MainDisplayCardItem {
  item: Album | Artist;
}

const MainDisplayCardItem = ({ item }: MainDisplayCardItem) => {

  const dispatch = useDispatch();

  const controllerRef = useRef<null | AbortController>(null);

  const handleClick = async () => {
    console.log("card clicked")
    if (controllerRef.current)
      controllerRef.current.abort();

    controllerRef.current = new AbortController();

    try {
      dispatch(setMainDisplayItem(item));

      let tracks;

      if (item.type == "artist") {
        const albumsRes = await getAlbumsBy(item.id);
        dispatch(setAlbumName(albumsRes.items[0].name));
        dispatch(setAlbums(albumsRes.items));
        dispatch(setNextPageOfAlbumsUrl(albumsRes.next));
        tracks = await getTracksInAlbum(albumsRes.items[0].id);
      } else {
        tracks = await getTracksInAlbum(item.id);
        dispatch(setAlbumName(item.name));
      }

      dispatch(setTracks(tracks.items));
      dispatch(setNextPageOfTracksUrl(tracks.next));

    } catch (error) {
      if (axios.isCancel(error))
        console.log("Request canceled", error.message);
      else
        console.log("Request failed", error);
    }
  }

  const subtitleText = () => {
    switch (item.type) {
      case "album":
        const year = (item as Album).release_date.slice(0, 4);
        return `${year} • Album`;
      case "artist":
        return "Artist";
      default:
        return "";
    }
  }

  return (
    <Stack
      sx={{
        width: "15em",
        height: "stretch",
      }}>
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

            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{
                textTransform: "none",
                textAlign: "left",
              }}
            >
              {subtitleText()}
            </Typography>
          </CardContent>

        </CardActionArea>

      </Card>
    </Stack>
  )
}

export default MainDisplayCardItem;