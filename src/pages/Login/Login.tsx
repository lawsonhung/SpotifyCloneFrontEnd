import { Button } from "@mui/material";
import "./Login.css";

const Login = () => {
  return (
    <div className="loginWrapper">
      <a className="loginAnchor" href="https://spotifyclonebackend-3uiw.onrender.com/api/auth/login">
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#1DB954",
            color: "white",
          }}
        >
          Login with Spotify
        </Button>
      </a>
    </div>
  )
}

export default Login;