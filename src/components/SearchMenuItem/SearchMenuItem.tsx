import { Box, ListItem, Stack } from "@mui/material";
import { Image } from "mui-image";
import type { Album, Artist, Track } from "@spotify/web-api-ts-sdk";

interface SearchMenuItemProps {
  option: {
    label: string,
    item: Track | Album | Artist,
  }
  optionProps: any,
  state: any,
  ownerState: any,
}

const SearchMenuItem = ({ option, optionProps, state, ownerState }: SearchMenuItemProps) => {
  // console.log(option)
  // console.log(optionProps)
  // console.log(state)
  // console.log(ownerState)
  const { item } = option;
  let srcURL = "";
  let secondaryText = "";

  switch (item.type) {
    case "track":
      srcURL = (item as Track).album.images[0].url;
      secondaryText = (item as Track).artists[0].name;
      break;
    case "artist":
      srcURL = (item as Artist).images[0].url;
      break;
    case "album":
      srcURL = (item as Album).images[0].url
      secondaryText = (item as Track).artists[0].name;
      break;
    default:
      srcURL = "";
  }
  return (
    <Box
      {...optionProps}
    >
      <Image
        src={srcURL}
        alt={item.name}
        height={"3em"}
        width={"3em"}
        style={{
          objectFit: "contain",
        }}
      />
      <Stack marginInlineStart={"0.25em"}>
        <ListItem disablePadding>
          {option.item.name}
        </ListItem>
        <ListItem disablePadding>
          {secondaryText}
        </ListItem>
      </Stack>
    </Box>
  )
}

export default SearchMenuItem;