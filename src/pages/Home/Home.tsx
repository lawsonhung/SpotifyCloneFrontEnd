import { useState } from "react";
import Search from "../../components/Search/Search";
import WebPlayback from "../../components/WebPlayback/WebPlayback";
import Results from "../Results/Results";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

const Home = () => {
  const token = useSelector((state: RootState) => state.token.value)
  const [suggestions, setSuggestions] = useState<{}[]>([]);

  return (
    <>
      <Search setSuggestions={setSuggestions} suggestions={suggestions}/>
      <Results />
      <WebPlayback />
    </>
  )
}

export default Home;