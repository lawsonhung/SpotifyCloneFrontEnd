import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Box, Button, Stack, Typography } from "@mui/material";
import type { Album } from "@spotify/web-api-ts-sdk";
import MainDisplayAlbumItem from "../MainDisplayAlbumItem/MainDisplayAlbumItem";
import { getNextPageOfItems } from "../../api";
import { setAlbums, setNextPageOfAlbumsUrl } from "../../features/mainDisplayItem/mainDisplayItem";

const AlbumList = () => {

  const dispatch = useDispatch();

  const albums = useSelector((state: RootState) => state.mainDisplayItem.albums);
  const nextPageOfAlbumsUrl = useSelector((state: RootState) => state.mainDisplayItem.nextPageOfAlbumsUrl);

  console.log("nextPageOfAlbumsUrl", nextPageOfAlbumsUrl);

  const handleClick = async () => {
    const nextPage = await getNextPageOfItems(nextPageOfAlbumsUrl);
    dispatch(setNextPageOfAlbumsUrl(nextPage.next));
    dispatch(setAlbums([...albums, ...nextPage.items]));
  }

  return (
    <Box>

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

      {nextPageOfAlbumsUrl ?
        <Button
          variant="text"
          sx={{
            justifyContent: "left",
            width: "fit-content",
          }}
          onClick={handleClick}
        >
          <Typography color="textSecondary"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                color: "white",
              }
            }}>
            See more
          </Typography>
        </Button>
        :
        null
      }

    </Box>
  )
}

export default AlbumList;