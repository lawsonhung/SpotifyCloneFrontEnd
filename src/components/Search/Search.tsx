import { Autocomplete, TextField, type AutocompleteRenderInputParams } from "@mui/material";
import { useRef, type ChangeEventHandler, type Dispatch, type SetStateAction, type SyntheticEvent } from "react";
import { getAlbumsBy, getTracksInAlbum, search } from "../../api/services/search";
import type { Playlist } from "@spotify/web-api-ts-sdk";
import SearchMenuItem from "../SearchMenuItem/SearchMenuItem";
import type { SearchMenuItemOption, SearchMenuItemType } from "../../types/SearchMenuItemOption";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../../features/currentTrack/currentTrackSlice";
import { setAlbumName, setAlbums, setMainDisplayItem, setNextPageOfAlbumsUrl, setNextPageOfTracksUrl, setTracks } from "../../features/mainDisplayItem/mainDisplayItem";
import axios from "axios";

interface SearchProps {
  searchResults: SearchMenuItemType[],
  setSearchResults: Dispatch<SetStateAction<SearchMenuItemType[]>>,
}

const Search = ({ searchResults, setSearchResults }: SearchProps) => {

  const dispatch = useDispatch();
  const controllerRef = useRef<null | AbortController>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (controllerRef.current)
      controllerRef.current.abort();

    controllerRef.current = new AbortController();

    try {
      const results = await search(e.target.value, controllerRef.current.signal);
      let allSearchResults = [];
      allSearchResults.push(...results.tracks.items);
      allSearchResults.push(...results.artists.items);
      allSearchResults.push(...results.albums.items);
      results.playlists.items.map((playlist: Playlist) => {
        if (playlist) allSearchResults.push(playlist);
      })
      // allSearchResults.push(...results.shows.items);
      // allSearchResults.push(...results.episodes.items);
      // allSearchResults.push(...results.audiobooks.items);

      setSearchResults(allSearchResults);
    } catch (error) {
      if (axios.isCancel(error))
        console.log("Request canceled:", error.message);
      else
        console.error("Request failed:", error);
    }
  }

  const handleAutocompleteChange = async (_: SyntheticEvent, newValue: SearchMenuItemOption | null) => {
    const { item } = newValue as SearchMenuItemOption;
    if (item.type == "track")
      dispatch(setCurrentTrack(item));
    else {
      dispatch(setMainDisplayItem(item));
      const albumsRes = await getAlbumsBy(item.id);
      dispatch(setAlbumName(albumsRes.items[0].name));
      dispatch(setAlbums(albumsRes.items));
      dispatch(setNextPageOfAlbumsUrl(albumsRes.next));

      const tracksRes = await getTracksInAlbum(albumsRes.items[0].id);
      // dispatch(setTracks(tracksRes.items));
      // dispatch(setNextPageOfTracksUrl(tracksRes.next));
    }
  }

  return (
    <Autocomplete
      renderInput={(params: AutocompleteRenderInputParams): React.ReactNode => {
        return <TextField
          {...params}
          name="searchResults"
          label="Search"
          variant="standard"
          value={searchResults}
          onChange={handleChange}
        />
      }}
      filterOptions={x => x}
      options={
        searchResults?.map((searchResult) => {
          return { label: searchResult.name, item: searchResult }
        }) || []
      }
      renderOption={(props, option, state, ownerState) => {
        const { key, ...optionProps } = props;
        return <SearchMenuItem
          key={option.item.id}
          optionProps={optionProps}
          option={option}
          state={state}
          ownerState={ownerState}
        />
      }}
      onChange={handleAutocompleteChange}
      sx={{
        width: "50%",
        alignSelf: "center",
        backgroundColor: "#313131",
        borderRadius: "24px",
        paddingLeft: "1.5em",
        paddingRight: "1.5em",
        marginTop: "0.5em",
        marginBottom: "0.5em",
        "& .MuiOutlinedInput-root": {
          borderRadius: "100%",
        },
        '& .MuiAutocomplete-paper': {
          borderRadius: '16px',
        },
      }}
    />
  )

}

export default Search;