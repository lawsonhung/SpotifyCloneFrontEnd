import { useDispatch, useSelector } from "react-redux";
import SpotifyPlayer, { type Props } from "react-spotify-web-playback";
import type { RootState } from "../../app/store";
import type { Track } from "@spotify/web-api-ts-sdk";
import "./Player.css";
import { refreshToken } from "../../api";
import { setToken } from "../../features/token/tokenSlice";

const Player = () => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.token.value);
  const currentTrack = useSelector((state: RootState) => state.currentTrack);
  console.log("token", token);

  const getOAuthToken: Props["getOAuthToken"] = async (cb: Function) => {
    const response = await refreshToken();
    console.log("getting OAuth token");
    console.log("response", response)
    let { access_token } = response;
    dispatch(setToken(access_token));
    cb(token);
  }

  return (
    <SpotifyPlayer
      token={token ?? ""}
      getOAuthToken={getOAuthToken}
      hideAttribution
      uris={[(currentTrack.value as Track).uri]}
      name="Lawson's Player - SpotifyClone React"
      initialVolume={0.5}
      styles={{
        bgColor: "transparent",
        color: "#FFFFFF",
        sliderHandleColor: "#1DB954",
        trackNameColor: "#FFFFFF",
      }}
      showSaveIcon
      play
    />

  )
}

export default Player;