import { Box, ListItem, Stack } from "@mui/material";
import { Image } from "mui-image";
import type { Album, Artist, Audiobook, Episode, Playlist, Show, Track } from "@spotify/web-api-ts-sdk";

interface SearchMenuItemProps {
  option: {
    label: string,
    item: Track | Album | Artist | Playlist | Show | Episode | Audiobook,
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
      srcURL = (item as Album).images[0].url;
      secondaryText = (item as Track).artists[0].name;
      break;
    case "playlist":
      srcURL = (item as Playlist).images[0].url;
      secondaryText = (item as Playlist)?.owner.display_name;
      break;
    case "show":
      srcURL = (item as Show).images[0].url;
      break;
    case "episode":
      srcURL = (item as Episode).images[0].url;
      break;
    case "audiobook":
      srcURL = (item as Audiobook).images[0].url;
      secondaryText = (item as Audiobook).authors[0].name;
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