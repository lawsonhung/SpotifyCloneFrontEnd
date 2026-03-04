import { Autocomplete, TextField, type AutocompleteRenderInputParams } from "@mui/material";
import { useEffect, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import { search } from "../../api/services/search";
import type { Album, Artist, Track } from "@spotify/web-api-ts-sdk";
import SearchMenuItem from "../SearchMenuItem/SearchMenuItem";

interface SearchProps {
  suggestions: (Track | Artist | Album)[],
  setSuggestions: Dispatch<SetStateAction<(Track | Artist | Album)[]>>,
}

const Search = ({ suggestions, setSuggestions }: SearchProps) => {

  useEffect(() => {

  }, [])

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    const results = await search(e.target.value);
    console.log(results)
    let allSuggestions = [];
    allSuggestions.push(...results.tracks.items);
    allSuggestions.push(...results.artists.items);
    allSuggestions.push(...results.albums.items);
    // allSuggestions.push(...results.playlists.items);
    // allSuggestions.push(...results.shows.items);
    // allSuggestions.push(...results.episodes.items);
    // allSuggestions.push(...results.audiobooks.items);
    console.log(allSuggestions);
    setSuggestions(allSuggestions);
  }

  return (
    <>
      <Autocomplete
        renderInput={(params: AutocompleteRenderInputParams): React.ReactNode => {
          return <TextField
            {...params}
            name="suggestions"
            label="Search"
            variant="standard"
            value={suggestions}
            onChange={handleChange}
          />
        }}
        options={
          suggestions?.map((searchResult) => {
            return { label: searchResult.name, item: searchResult }
          }) || []
        }
        renderOption={(props, option, state, ownerState) => {
          const { key, ...optionProps } = props;
          return <SearchMenuItem
            key={key}
            optionProps={optionProps}
            option={option}
            state={state}
            ownerState={ownerState}
          />
        }}
        sx={{ width: 300 }}
      />
    </>
  )

}

export default Search;