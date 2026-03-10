import { Button, Paper, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { getPlaylists } from "../../api/services/playlist";
import LibraryPlaylistItem from "../../components/LibraryPlaylistItem/LibraryPlaylistItem";
import type { Playlist } from "@spotify/web-api-ts-sdk";
import LibraryHeader from "../../components/LibraryHeader/LibraryHeader";
import { useDispatch, useSelector } from "react-redux";
import { getNextPageOfItems } from "../../api";
import { setPlaylists } from "../../features/library/library";
import type { RootState } from "../../app/store";

const Library = () => {

  const dispatch = useDispatch();

  const playlists = useSelector((state: RootState) => state.library.playlists);

  const [nextPageOfPlaylistsUrl, setNextPageOfPlaylistsUrl] = useState<string | null>(null);

  useEffect(() => {
    initializeState();
  }, []);

  const initializeState = async () => {
    const playlistsRes = await getPlaylists();
    console.log("Library playlists initial state", playlistsRes);
    dispatch(setPlaylists(playlistsRes.items));
    setNextPageOfPlaylistsUrl(playlistsRes.next);
  }

  const handleClick = async () => {
    let nextPage;

    if (nextPageOfPlaylistsUrl)
      nextPage = await getNextPageOfItems(nextPageOfPlaylistsUrl);

    setNextPageOfPlaylistsUrl(nextPage.next);
    dispatch(setPlaylists([...playlists, ...nextPage.items]));
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
        {playlists && playlists.map((playlist: Playlist) => {
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