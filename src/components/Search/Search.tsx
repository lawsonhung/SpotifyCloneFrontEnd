import { Autocomplete, TextField, type AutocompleteRenderInputParams, type SelectChangeEvent } from "@mui/material";
import { useEffect, type ChangeEvent, type Dispatch, type SetStateAction, type SyntheticEvent } from "react";
import { search } from "../../api/services/search";
import type { Playlist } from "@spotify/web-api-ts-sdk";
import SearchMenuItem from "../SearchMenuItem/SearchMenuItem";
import type { SearchMenuItemOption, SearchMenuItemType } from "../../types/SearchMenuItemOption";

interface SearchProps {
  searchResults: SearchMenuItemType[],
  setSearchResults: Dispatch<SetStateAction<SearchMenuItemType[]>>,
}

const Search = ({ searchResults, setSearchResults }: SearchProps) => {

  useEffect(() => {

  }, [])

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const results = await search(e.target.value);
    console.log(results)
    let allSearchResults = [];
    allSearchResults.push(...results.tracks.items);
    allSearchResults.push(...results.artists.items);
    allSearchResults.push(...results.albums.items);
    results.playlists.items.map((playlist: Playlist) => {
      if (playlist) allSearchResults.push(playlist);
    })
    allSearchResults.push(...results.shows.items);
    allSearchResults.push(...results.episodes.items);
    allSearchResults.push(...results.audiobooks.items);
    setSearchResults(allSearchResults);
  }

  const handleAutocompleteChange = async (e: SyntheticEvent, newValue: SearchMenuItemOption | null) => {
    console.log(newValue);
    const {item} = newValue as SearchMenuItemOption;
    if (item.type == "track") {
      console.log("Play song")
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
      sx={{ width: "50%", alignSelf: "center" }}
    />
  )

}

export default Search;