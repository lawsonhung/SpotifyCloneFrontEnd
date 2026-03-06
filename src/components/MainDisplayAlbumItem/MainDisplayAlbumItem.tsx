import { Container, Stack, Typography } from "@mui/material";
import type { Album } from "@spotify/web-api-ts-sdk";
import Image from "mui-image";

interface MainDisplayAlbumItem {
  album: Album,
}

const MainDisplayAlbumItem = ({ album }: MainDisplayAlbumItem) => {
  const year = album.release_date.slice(0,4);

  return (
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
      <Typography>{album.name}</Typography>
      <Typography>{year} • Album</Typography>
    </Stack>
  )
}

export default MainDisplayAlbumItem;