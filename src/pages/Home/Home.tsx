import { useEffect, useState } from "react";
import Search from "../../components/Search/Search";
import Results from "../../containers/Results/Results";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import type { SearchMenuItemType } from "../../types/SearchMenuItemOption";
import Player from "../../components/Player/Player";
import { Box, Stack } from "@mui/material";
import Library from "../../containers/Library/Library";
import { getMyInfo } from "../../api";
import { setUserData } from "../../features/userData/userDataSlice";
import MainSnackbar from "../../components/MainSnackbar/MainSnackbar";

const Home = () => {

  const dispatch = useDispatch();

  useSelector((state: RootState) => state.token.value);
  const [searchResults, setSearchResults] = useState<(SearchMenuItemType)[]>([]);
  
  useEffect(() => {
    const populateUserInfo = async () => {
      const myInfo = await getMyInfo();
      dispatch(setUserData(myInfo));
    }

    populateUserInfo();
  }, [])
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "black",
      }}
    >

      <MainSnackbar />

      <Search setSearchResults={setSearchResults} searchResults={searchResults} />

      <Stack
        direction={"row"}
        flex={1}
        spacing={1}
        sx={{
          maxHeight: "81%",
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