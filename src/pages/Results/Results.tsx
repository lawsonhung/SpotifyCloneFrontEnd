import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Box, Typography } from "@mui/material";
import Image from "mui-image";
import type { Artist } from "@spotify/web-api-ts-sdk";

const Results = () => {

  const mainDisplayItem = useSelector((state: RootState) => state.mainDisplayItem);

  console.log("mainDisplayItem", mainDisplayItem);

  let backgroundImageUrl;
  if ((mainDisplayItem.value as Artist).images)
    backgroundImageUrl = (mainDisplayItem.value as Artist).images[0].url;

  return (
    <Box
      sx={{
        height: "100%",
        background: "linear-gradient(#2F3060, #181818)",
        borderRadius: "8px"
      }}
    >
      <Box
        sx={{
          height: "40%",
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        <Typography variant="h1" fontWeight={900} margin={"0.1em"}>{(mainDisplayItem.value as Artist).name}</Typography>
      </Box >
      <div className="results">
        <h1>Results</h1>
      </div>
    </Box >
  )
}

export default Results;