import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

const WebPlayback = () => {
  const token = useSelector((state: RootState) => state.token.value);

  const [player, setPlayer] = useState(undefined);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    (window as any).onSpotifyWebPlaybackSDKReady = () => {

      const player = new (window as any).Spotify.Player({
        name: "Lawson's Web Playback SDK",
        getOAuthToken: (cb: Function) => { cb(token); },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }: any) => {
        console.log("Ready with Device ID", device_id);
      })

      player.addListener("not_ready", ({ device_id }: any) => {
        console.log("Device ID has gone offline", device_id);
      })

      if (token)
        player.connect();
    }
  }, [token])

  return (
    <>
      <div className="container">
        <div className="main-wrapper">

        </div>
      </div>
    </>
  )
}

export default WebPlayback;