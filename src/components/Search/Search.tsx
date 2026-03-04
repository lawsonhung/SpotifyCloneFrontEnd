import { Autocomplete, TextField, type AutocompleteRenderInputParams } from "@mui/material";
import { useEffect, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import { search } from "../../api/services/search";
import type { PartialSearchResult, Track } from "@spotify/web-api-ts-sdk";

interface SearchProps {
  suggestions: PartialSearchResult,
  setSuggestions: Dispatch<SetStateAction<PartialSearchResult>>,
}

const Search = ({ suggestions, setSuggestions }: SearchProps) => {

  useEffect(() => {

  }, [])

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    const results = await search(e.target.value);
    console.log(results)
    setSuggestions(results);
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
          suggestions?.tracks?.items.map((track: Track) => { return { label: track.name } }) || []

        }
        sx={{ width: 300 }}
      />
    </>
  )

}

export default Search;