import { useState } from "react";
import Search from "../../components/Search/Search";
import WebPlayback from "../../components/WebPlayback/WebPlayback";
import Results from "../Results/Results";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import type { SearchMenuItemType } from "../../types/SearchMenuItemOption";

const Home = () => {
  useSelector((state: RootState) => state.token.value);
  const [searchResults, setSearchResults] = useState<(SearchMenuItemType)[]>([]);

  return (
    <>
      <Search setSearchResults={setSearchResults} searchResults={searchResults}/>
      <Results />
      <WebPlayback />
    </>
  )
}

export default Home;