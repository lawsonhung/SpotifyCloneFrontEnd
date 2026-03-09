import { Button, Paper, Stack, Typography } from "@mui/material"
import { useEffect, useRef } from "react";
import { getPlaylists } from "../../api/services/playlist";
import LibraryPlaylistItem from "../../components/LibraryPlaylistItem/LibraryPlaylistItem";
import type { Page, Playlist } from "@spotify/web-api-ts-sdk";
import LibraryHeader from "../../components/LibraryHeader/LibraryHeader";
import { useDispatch, useSelector } from "react-redux";
import { getNextPageOfItems } from "../../api";
import type { RootState } from "../../app/store";
import { setNextPageOfPlaylistsUrl } from "../../features/library/library";

const Library = () => {

  const dispatch = useDispatch();

  const playlists = useRef<Page<Playlist> | null>(null);
  const nextPageOfPlaylistsUrlRef = useRef<string | null>(null);

  useSelector((state: RootState) => state.library.nextPageOfPlaylistsUrl);

  useEffect(() => {
    const populatePlaylists = async () => {
      const playlistsRes = await getPlaylists();
      playlists.current = playlistsRes;
      nextPageOfPlaylistsUrlRef.current = playlistsRes.next;
    }
    populatePlaylists();
  }, [])

  const handleClick = async () => {
    let nextPage;

    if (nextPageOfPlaylistsUrlRef.current)
      nextPage = await getNextPageOfItems(nextPageOfPlaylistsUrlRef.current);

    nextPageOfPlaylistsUrlRef.current = nextPage.next;
    playlists.current?.items.push(...nextPage.items);

    dispatch(setNextPageOfPlaylistsUrl(nextPage.next));
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
        {playlists.current?.items.map((playlist: Playlist) => {
          return (<LibraryPlaylistItem key={playlist.id} playlist={playlist} />
          )
        }
        )}

        {nextPageOfPlaylistsUrlRef.current ?
          <Button
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
          </Button>
          :
          null
        }

      </Stack>

    </Paper>
  )
}

export default Library;