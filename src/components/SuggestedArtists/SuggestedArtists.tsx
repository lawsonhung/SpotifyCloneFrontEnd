import { useEffect, useState } from "react";
import { getMyTopArtists } from "../../api";
import { Box, Stack, Typography } from "@mui/material";
import type { Artist, Page } from "@spotify/web-api-ts-sdk";
import MainDisplayCardItem from "../MainDisplayCardItem/MainDisplayCardItem";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

const SuggestedArtists = () => {

  const [artists, setArtists] = useState(null);

  const displayName = useSelector((state: RootState) => state.userData.value?.display_name);

  useEffect(() => {
    fetchMyTopArtists();
  }, []);

  const fetchMyTopArtists = async () => {
    const artistsRes = await getMyTopArtists();
    setArtists(artistsRes);
  };

  return (
    <>

      <Typography variant="subtitle2" color="textSecondary">
        Made for
      </Typography>
      <Typography variant="h5" fontWeight="bold">
        {displayName}
      </Typography>

      <Box overflow="scroll">
        <Stack
          direction="row"
          spacing="2"
          sx={{
            overflow: "scroll",
            height: "100%",
            flexWrap: "no-wrap",
            width: "fit-content",
          }}
        >
          {artists && (artists as Page<Artist>).items.map(artist => {
            return <MainDisplayCardItem
              item={artist}
              key={artist.id}
            />
          })}
        </Stack>
      </Box>

    </>
  )
}

export default SuggestedArtists;