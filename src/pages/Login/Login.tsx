import { Button } from "@mui/material";
import "./Login.css";

const Login = () => {
  const BACKEND_API_BASE_URL = import.meta.env.VITE_PRODUCTION_BACKEND_API_BASE_URL;

  return (
    <div className="loginWrapper">
      <a className="loginAnchor" href={`${BACKEND_API_BASE_URL}/auth/login`}>
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