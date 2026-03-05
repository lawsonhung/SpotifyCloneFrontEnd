import { useState } from "react";
import Search from "../../components/Search/Search";
import Results from "../Results/Results";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import type { SearchMenuItemType } from "../../types/SearchMenuItemOption";
import Player from "../../components/Player/Player";
import { Box } from "@mui/material";

const Home = () => {
  useSelector((state: RootState) => state.token.value);
  const [searchResults, setSearchResults] = useState<(SearchMenuItemType)[]>([]);

  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%"
    }}
    >
      <Search setSearchResults={setSearchResults} searchResults={searchResults} />
      <Results />
      <Player />
    </Box>
  )
}

export default Home;