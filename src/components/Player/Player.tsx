import { useSelector } from "react-redux";
import SpotifyPlayer from "react-spotify-web-playback";
import type { RootState } from "../../app/store";
import type { Track } from "@spotify/web-api-ts-sdk";

const Player = () => {
  const token = useSelector((state: RootState) => state.token.value);
  const currentTrack = useSelector((state: RootState) => state.currentTrack);

  return (
    <SpotifyPlayer
      token={token ?? ""}
      hideAttribution
      uris={[(currentTrack.value as Track).uri]}
      name="Lawson's Player - SpotifyClone React"
      initialVolume={0.5}
    />

  )
}

export default Player;