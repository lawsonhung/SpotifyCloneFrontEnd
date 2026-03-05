import { Autocomplete, TextField, type AutocompleteRenderInputParams } from "@mui/material";
import { useEffect, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import { search } from "../../api/services/search";
import type { Album, Artist, Audiobook, Episode, Playlist, Show, Track } from "@spotify/web-api-ts-sdk";
import SearchMenuItem from "../SearchMenuItem/SearchMenuItem";

interface SearchProps {
  searchResults: (Track | Artist | Album | Playlist | Show | Episode | Audiobook)[],
  setSearchResults: Dispatch<SetStateAction<(Track | Artist | Album | Playlist | Show | Episode | Audiobook)[]>>,
}

const Search = ({ searchResults, setSearchResults }: SearchProps) => {

  useEffect(() => {

  }, [])

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    const results = await search(e.target.value);
    console.log(results)
    let allSearchResults = [];
    allSearchResults.push(...results.tracks.items);
    allSearchResults.push(...results.artists.items);
    allSearchResults.push(...results.albums.items);
    results.playlists.items.map((playlist: Playlist) => {
      if (playlist) allSearchResults.push(playlist);
    } )
    allSearchResults.push(...results.shows.items);
    allSearchResults.push(...results.episodes.items);
    allSearchResults.push(...results.audiobooks.items);
    console.log(allSearchResults);
    setSearchResults(allSearchResults);
  }

  return (
    <>
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
        sx={{ width: 300 }}
      />
    </>
  )

}

export default Search;