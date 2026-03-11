import { useEffect, useState } from "react";
import { getMyTopArtists } from "../../api";
import { Box, Grid, Typography } from "@mui/material";
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
    <Box>

      <Typography variant="subtitle2" color="textSecondary">
        Made for
      </Typography>
      <Typography variant="h5" fontWeight="bold">
        {displayName}
      </Typography>

      <Grid container columns={5}>
        {artists && (artists as Page<Artist>).items.map(artist => {
          return <MainDisplayCardItem
            item={artist}
            key={artist.id}
          />
        })}
      </Grid>

    </Box>
  )
}

export default SuggestedArtists;