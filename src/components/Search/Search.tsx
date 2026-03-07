import { Autocomplete, type AutocompleteRenderInputParams } from "@mui/material";
import { type Dispatch, type SetStateAction, type SyntheticEvent } from "react";
import { search } from "../../api/services/search";
import type { Playlist } from "@spotify/web-api-ts-sdk";
import SearchMenuItem from "../SearchMenuItem/SearchMenuItem";
import type { SearchMenuItemOption, SearchMenuItemType } from "../../types/SearchMenuItemOption";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../../features/currentTrack/currentTrackSlice";
import { setMainDisplayItem } from "../../features/mainDisplayItem/mainDisplayItem";
import ThrottledTextField from "../ThrottledTextField/ThrottledTextField";

interface SearchProps {
  searchResults: SearchMenuItemType[],
  setSearchResults: Dispatch<SetStateAction<SearchMenuItemType[]>>,
}

const Search = ({ searchResults, setSearchResults }: SearchProps) => {

  const dispatch = useDispatch();

  const handleChange = async (value: string) => {
    const results = await search(value);
    console.log(results)
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
  }

  const handleAutocompleteChange = async (_: SyntheticEvent, newValue: SearchMenuItemOption | null) => {
    console.log(newValue);
    const { item } = newValue as SearchMenuItemOption;
    if (item.type == "track")
      dispatch(setCurrentTrack(item));
    else
      dispatch(setMainDisplayItem(item));
  }

  return (
    <Autocomplete
      renderInput={(params: AutocompleteRenderInputParams): React.ReactNode => {
        return <ThrottledTextField
          params={params}
          name="searchResults"
          label="Search"
          variant="standard"
          value={searchResults}
          {...params}
          onChange={handleChange}
          delay={1000}
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