import { useState } from "react";
import Search from "../../components/Search/Search";
import WebPlayback from "../../components/WebPlayback/WebPlayback";
import Results from "../Results/Results";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import type { Album, Artist, Audiobook, Episode, Playlist, Show, Track } from "@spotify/web-api-ts-sdk";

const Home = () => {
  useSelector((state: RootState) => state.token.value);
  const [suggestions, setSuggestions] = useState<(Track | Artist | Album | Playlist | Show | Episode | Audiobook)[]>([]);

  return (
    <>
      <Search setSuggestions={setSuggestions} suggestions={suggestions}/>
      <Results />
      <WebPlayback />
    </>
  )
}

export default Home;