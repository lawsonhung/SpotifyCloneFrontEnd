import { Button, Paper, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { getPlaylists } from "../../api/services/playlist";
import LibraryPlaylistItem from "../../components/LibraryPlaylistItem/LibraryPlaylistItem";
import type { Page, Playlist } from "@spotify/web-api-ts-sdk";
import LibraryHeader from "../../components/LibraryHeader/LibraryHeader";
import { useDispatch } from "react-redux";
import { getNextPageOfItems } from "../../api";

const Library = () => {

  const dispatch = useDispatch();

  const [playlists, setPlaylists] = useState<Page<Playlist> | null>(null);
  const [nextPageOfPlaylistsUrl, setNextPageOfPlaylistsUrl] = useState<string | null>(null);

  useEffect(() => {
    const initializeState = async () => {
      const playlistsRes = await getPlaylists();
      console.log("playlistsRes", playlistsRes);
      setPlaylists(playlistsRes);
      setNextPageOfPlaylistsUrl(playlistsRes.next);
    }

    initializeState();
  }, []);

  const handleClick = async () => {
    let nextPage;

    if (nextPageOfPlaylistsUrl)
      nextPage = await getNextPageOfItems(nextPageOfPlaylistsUrl);

    setNextPageOfPlaylistsUrl(nextPage.next);
    (playlists as Page<Playlist>).items.push(...nextPage.items);
  }

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
      <LibraryHeader />

      <Stack
        sx={{
          overflowY: "scroll",
          overflowX: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {playlists && (playlists as unknown as Page<Playlist>).items.map((playlist: Playlist) => {
          return (<LibraryPlaylistItem key={playlist.id} playlist={playlist} />
          )
        })}

        {nextPageOfPlaylistsUrl && <Button
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

      </Stack>

    </Paper>
  )
}

export default Library;