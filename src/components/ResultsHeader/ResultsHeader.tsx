import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Artist, Playlist } from "@spotify/web-api-ts-sdk";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

const ResultsHeader = () => {

  const mainDisplayItem = useSelector((state: RootState) => state.mainDisplayItem);

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
              <Typography>
                <Typography fontWeight="bold" component="span">
                  {(mainDisplayItem.value as Playlist).owner.display_name}
                </Typography>
                <Typography component="span" color="textSecondary" variant="subtitle2">
                  &nbsp;• {(mainDisplayItem.value as any).items.total} songs
                </Typography>
              </Typography>
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