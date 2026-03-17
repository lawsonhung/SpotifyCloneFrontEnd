import { Box, Button } from "@mui/material";
import SpotifyLogoBlack from "../../../public/Spotify_Primary_Logo_RGB_Black.png";

const Login = () => {

  const BACKEND_API_BASE_URL = import.meta.env.VITE_PRODUCTION_BACKEND_API_BASE_URL;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        size="large"
        href={`${BACKEND_API_BASE_URL}/auth/login`}
        sx={{
          backgroundColor: "#1DB954",
          color: "white",
        }}
        startIcon={<Box
          component="img"
          src={SpotifyLogoBlack}
          alt="Spotify Logo"
          sx={{
            height: "1.5em",
            borderRadius: "50%",
          }}
        />}
      >
        Login with Spotify
      </Button>
    </Box>
  )
}

export default Login;