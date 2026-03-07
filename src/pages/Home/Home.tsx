import { useState } from "react";
import Search from "../../components/Search/Search";
import Results from "../../containers/Results/Results";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import type { SearchMenuItemType } from "../../types/SearchMenuItemOption";
import Player from "../../components/Player/Player";
import { Box, Stack } from "@mui/material";
import Library from "../../containers/Library/Library";

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
      <Stack 
      direction={"row"}
      spacing={1}
        sx={{
          height: "100%",
        }}
      >
        <Library />
        <Results />
      </Stack>
      <Player />
    </Box>
  )
}

export default Home;