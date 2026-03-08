import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Box, Stack, Typography } from "@mui/material";
import type { Album } from "@spotify/web-api-ts-sdk";
import MainDisplayAlbumItem from "../MainDisplayAlbumItem/MainDisplayAlbumItem";

const AlbumList = () => {
  const albums = useSelector((state: RootState) => state.mainDisplayItem.albums);

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
      
    </Box>
  )
}

export default AlbumList;