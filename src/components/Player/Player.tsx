import { useSelector } from "react-redux";
import SpotifyPlayer from "react-spotify-web-playback";
import type { RootState } from "../../app/store";

const Player = () => {
  const token = useSelector((state: RootState) => state.token.value);
  return (
    <SpotifyPlayer
      token={token ?? ""}
      hideAttribution
      uris={["spotify:track:4t0OI7XrODjSkAu3bTPmWj"]}
      name="Lawson's Player - SpotifyClone React"
      initialVolume={0.5}
      getPlayer={player => {
        console.log("spotify player", player);
      }}
    />

  )
}

export default Player;