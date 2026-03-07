import { List, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { getPlaylists } from "../../api/services/playlist";
import LibraryPlaylistItem from "../../components/LibraryPlaylistItem/LibraryPlaylistItem";
import type { Page, Playlist } from "@spotify/web-api-ts-sdk";

const Library = () => {

  const [playlists, setPlaylists] = useState<Page<Playlist> | null>(null);

  useEffect(() => {
    const populatePlaylists = async () => {
      const playlists = await getPlaylists();
      console.log("playlists", playlists);
      setPlaylists(playlists);
    }
    populatePlaylists();
  }, [])

  return (
    <Paper
      sx={{
        borderRadius: "8px",
        padding: "1em",
      }}
    >
      <Typography fontWeight={"bold"}>Your Library</Typography>
      <List>
        {playlists?.items.map((playlist: Playlist) => {return (<LibraryPlaylistItem key={playlist.id} playlist={playlist} />
        )}
      )}
      </List>
    </Paper>
  )
}

export default Library;