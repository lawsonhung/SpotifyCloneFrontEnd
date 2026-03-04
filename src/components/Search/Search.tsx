import { Autocomplete, TextField, type AutocompleteRenderInputParams } from "@mui/material";
import { useEffect, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import { search } from "../../api/services/search";

interface SearchProps {
  suggestions: {}[],
  setSuggestions: Dispatch<SetStateAction<{}[]>>,
}

const Search = ({suggestions, setSuggestions}: SearchProps) => {

  useEffect(() => {

  }, [])

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    const results = await search(e.target.value);

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
        // options={(suggestions as any).tracks.items.map((track: any) => track.name)}
        options={suggestions}
        sx={{ width: 300 }}
      />
    </>
  )

}

export default Search;