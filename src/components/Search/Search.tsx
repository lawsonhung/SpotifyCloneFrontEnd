import { Autocomplete, TextField, type AutocompleteRenderInputParams } from "@mui/material";

const Search = () => {

  return (
    <>
      <Autocomplete
        renderInput={(params: AutocompleteRenderInputParams): React.ReactNode => {
          return <TextField {...params} label="Search" variant="standard" />
        }}
        options={["Test"]}
        sx={{ width: 300 }}
      />
    </>
  )

}

export default Search;