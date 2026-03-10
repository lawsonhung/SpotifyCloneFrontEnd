import { useEffect, useState } from "react";
import { getMyTopArtists } from "../../api";
import { Grid, Stack } from "@mui/material";
import type { Artist, Page } from "@spotify/web-api-ts-sdk";
import MainDisplayCardItem from "../MainDisplayCardItem/MainDisplayCardItem";

const SuggestedArtists = () => {

  const [artists, setArtists] = useState(null);

  useEffect(() => {
    fetchMyTopArtists();
  }, []);
  
  const fetchMyTopArtists = async () => {
    const artistsRes = await getMyTopArtists();
    setArtists(artistsRes);
  };

  return (
    <Grid container columns={5}>
      {artists && (artists as Page<Artist>).items.map(artist => {
        return <MainDisplayCardItem 
          item={artist}
          key={artist.id}
        />
      })}
    </Grid>
  )
}

export default SuggestedArtists;