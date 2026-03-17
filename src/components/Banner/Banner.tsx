import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Artist, Playlist, User } from "@spotify/web-api-ts-sdk";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Stack } from "@mui/material";

const ResultsHeader = () => {

  const mainDisplayItem = useSelector((state: RootState) => state.mainDisplayItem);
  const profilePictureUrl = useSelector((state: RootState) => (state.userData.value as User).images[1].url);

  let backgroundImageUrl;
  if ((mainDisplayItem.value as Artist).images)
    backgroundImageUrl = (mainDisplayItem.value as Artist).images[0].url;

  return (

    <Box
      sx={{
        height: "40%",
        backgroundImage: `url(${backgroundImageUrl})`,
        display: "flex",
        flexDirection: "column-reverse",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPositionY: "20%",
        padding: "0.1em",
      }}
    >

      {(mainDisplayItem.value as Playlist).type == "playlist" ?
        <Stack maxHeight="2em" direction="row" margin="0.5em">

          <Box
            component="img"
            src={profilePictureUrl}
            alt={(mainDisplayItem.value as Playlist).owner.display_name}
            sx={{
              objectFit: "cover",
              height: "100%",
              borderRadius: "50%",
              marginRight: "0.5em",
            }}
          />

          <Typography
            sx={{
              alignContent: "center",
            }}
          >
            <Typography fontWeight="bold" component="span">
              {(mainDisplayItem.value as Playlist).owner.display_name}
            </Typography>
            <Typography component="span" color="textSecondary" variant="subtitle2">
              &nbsp;• {(mainDisplayItem.value as any).items.total.toLocaleString("en-US")} songs
            </Typography>
          </Typography>

        </Stack>
        :
        null
      }

      <Typography variant="h1" fontWeight={900}>
        {(mainDisplayItem.value as Artist).name}
      </Typography>

    </Box >
  )
}

export default ResultsHeader;