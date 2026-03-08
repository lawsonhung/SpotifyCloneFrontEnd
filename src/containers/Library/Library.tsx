import { Paper, Stack, Typography } from "@mui/material"
import { useEffect, useRef } from "react";
import { getPlaylists } from "../../api/services/playlist";
import LibraryPlaylistItem from "../../components/LibraryPlaylistItem/LibraryPlaylistItem";
import type { Page, Playlist } from "@spotify/web-api-ts-sdk";

const Library = () => {

  const playlists = useRef<Page<Playlist> | null>(null);

  useEffect(() => {
    const populatePlaylists = async () => {
      const playlistsRes = await getPlaylists();
      playlists.current = playlistsRes;
    }
    populatePlaylists();
  }, [])

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        padding: "0.5em",
        width: "20%",
        height: "100%",
        overflow: "scroll",
      }}
    >
      <Typography
        fontWeight="bold"
        paddingTop="0.5em"
        paddingLeft="0.5em"
      >Your Library</Typography>
      <Stack
        sx={{
          overflowY: "scroll",
          overflowX: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {playlists.current?.items.map((playlist: Playlist) => {
          return (<LibraryPlaylistItem key={playlist.id} playlist={playlist} />
          )
        }
        )}
      </Stack>
    </Paper>
  )
}

export default Library;