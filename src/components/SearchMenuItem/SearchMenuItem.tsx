import { Box, ListItem, Stack } from "@mui/material";
import { Image } from "mui-image";
import type { Track } from "@spotify/web-api-ts-sdk";

interface SearchMenuItemProps {
  option: {
    label: string,
    track: Track
  }
  optionProps: any,
  state: any,
  ownerState: any,
}

const SearchMenuItem = ({ option, optionProps, state, ownerState }: SearchMenuItemProps) => {
  console.log(option)
  console.log(optionProps)
  console.log(state)
  console.log(ownerState)
  return (
    <Box
      {...optionProps}
    >
      <Image
        src={option.track.album.images[0].url}
        alt={option.track.album.name}
        height={"3em"}
        width={"3em"}
        style={{
          objectFit: "contain",
        }}
      />
      <Stack marginInlineStart={"0.25em"}>
        <ListItem disablePadding>
          {option.track.name}
        </ListItem>
        <ListItem disablePadding>
          {option.track.artists[0].name}
        </ListItem>
      </Stack>
    </Box>
  )
}

export default SearchMenuItem;