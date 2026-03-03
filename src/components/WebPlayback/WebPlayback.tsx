import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

interface PlayerInit {
  name: string,
  getOAuthToken: (callback: (token: string) => void) => void,
  volume: number,
  addListener(event: string, handler: Function): void,
  getCurrentState(): Promise<Function>,
  connect(): Promise<boolean>,
  activateElement(): Promise<null>,
  on(errorType: string, callback: Function): Function,
}

const WebPlayback = () => {
  const token = useSelector((state: RootState) => state.token.value);

  const track = {
    name: "",
    album: {
      images: [
        { url: "" }
      ]
    },
    artists: [
      { name: "" }
    ]
  }

  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);
  const [currentTrack, setTrack] = useState(track);
  const [player, setPlayer] = useState<PlayerInit | undefined>(undefined);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = async () => {

      const player: PlayerInit = new window.Spotify.Player({
        name: "SpotifyClone React Project",
        getOAuthToken: (cb: Function) => { cb(token); },
        volume: 0.5,
      });

      if (!player) throw new Error("Player does not exist");

      setPlayer(player);

      player.addListener("ready", ({ device_id }: any) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }: any) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", ((state: any) => {
        if (!state)
          return

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state: any) => {
          !state ? setActive(false) : setActive(true);
        })
      }));

      player.on('authentication_error', ({ message }: { message: string }) => {
        console.error('Failed to authenticate', message);
        // Refresh access token
      });


      if (token) {
        const connected = await player.connect();
        if (connected)
          player.activateElement();
      }
    }
  }, [token])

  return (
    <>
      <div className="container">
        <div className="main-wrapper">
          <img src={currentTrack.album.images[0].url} className="now-playing__cover" alt="" />
          <div className="now-playing__side">
            <div className="now-playing__name">
              {currentTrack.name}
            </div>
            <div className="now-playing__artist">
              {currentTrack.artists[0].name}
            </div>
          </div>
          <button
            className="btn-spotify"
            onClick={() => { (player as any).previousTrack() }}
          >
            &lt;&lt;
          </button>
          <button
            className="btn-spotify"
            onClick={() => { (player as any).togglePlay() }}
          >
            {isPaused ? "Play" : "Pause"}
          </button>
          <button
            className="btn-spotify"
            onClick={() => { (player as any).nextTrack() }}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </>
  )
}

export default WebPlayback;