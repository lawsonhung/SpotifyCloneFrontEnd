import { Autocomplete, TextField, type AutocompleteRenderInputParams } from "@mui/material";
import { useEffect, useState, type ChangeEvent } from "react";
import { search } from "../../api/services/search";

const Search = () => {

  useEffect(() => {

  }, [])

  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    search(e.target.value);
    
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
        options={suggestions}
        sx={{ width: 300 }}
      />
    </>
  )

}

export default Search;