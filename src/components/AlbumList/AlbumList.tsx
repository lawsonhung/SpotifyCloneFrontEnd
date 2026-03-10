import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Box, Button, Grid, Typography } from "@mui/material";
import type { Album } from "@spotify/web-api-ts-sdk";
import MainDisplayCardItem from "../MainDisplayCardItem/MainDisplayCardItem";
import { getNextPageOfItems } from "../../api";
import { setAlbums, setNextPageOfAlbumsUrl } from "../../features/mainDisplayItem/mainDisplayItem";

const AlbumList = () => {

  const dispatch = useDispatch();

  const albums = useSelector((state: RootState) => state.mainDisplayItem.albums);
  const nextPageOfAlbumsUrl = useSelector((state: RootState) => state.mainDisplayItem.nextPageOfAlbumsUrl);

  const handleClick = async () => {
    const nextPage = await getNextPageOfItems(nextPageOfAlbumsUrl);
    dispatch(setNextPageOfAlbumsUrl(nextPage.next));
    dispatch(setAlbums([...albums, ...nextPage.items]));
  }

  return (
    <Box>

      {albums.length > 1 && <Typography variant="h4" fontWeight={"bold"}>
        Albums
      </Typography>}

      <Grid
        container
        columns={5}
      >
        {albums.map((album: Album) => {
          return <MainDisplayCardItem
            item={album}
            key={album.id}
          />
        })}
      </Grid>

      {nextPageOfAlbumsUrl && <Button
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
      </Button>}

    </Box>
  )
}

export default AlbumList;