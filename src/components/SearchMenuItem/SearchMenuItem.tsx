import { Box, Container, ListItem, Stack } from "@mui/material";
import { Image } from "mui-image";
import type { Album, Artist, Audiobook, Episode, Playlist, Show, Track } from "@spotify/web-api-ts-sdk";
import type { SearchMenuItemOption } from "../../types/SearchMenuItemOption";

interface SearchMenuItemProps {
  option: SearchMenuItemOption,
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
      let artists = (item as Track).artists.length == 1 ? 
        (item as Track).artists[0].name 
        :
        (item as Track).artists.map(artist => artist.name).join(", ");
      secondaryText = "Song • " + artists;
      break;
    case "artist":
      srcURL = (item as Artist).images[0].url;
      secondaryText = "Artist"
      break;
    case "album":
      srcURL = (item as Album).images[0].url;
      secondaryText = "Album • " + (item as Track).artists[0].name;
      break;
    case "playlist":
      srcURL = (item as Playlist).images[0].url;
      secondaryText = "Playlist • " + (item as Playlist)?.owner.display_name;
      break;
    case "show":
      srcURL = (item as Show).images[0].url;
      secondaryText = "Show"
      break;
    case "episode":
      srcURL = (item as Episode).images[0].url;
      secondaryText = "Episode"
      break;
    case "audiobook":
      srcURL = (item as Audiobook).images[0].url;
      secondaryText = "Audiobook • " + (item as Audiobook).authors[0].name;
      break;
    default:
      srcURL = "";
  }

  return (
    <Box
      {...optionProps}
      sx={{
        borderRadius: "8px",
        marginLeft: "0.5em",
        marginRight: "0.5em",
      }}
    >
      <Container
        disableGutters
        style={{
          height: "3em",
          width: "4em",
        }}
      >
        <Box
          component={"img"}
          src={srcURL}
          alt={item.name}
          sx={{
            objectFit: "cover",
            width: "100%",
            maxHeight: "3em",
          }}
        />
      </Container>

      <Stack marginInlineStart={"0.25em"} width={"100%"}>
        <ListItem disablePadding>
          {option.item.name}
        </ListItem>
        <ListItem 
        disablePadding
        style={{
          fontSize: "0.75em",
          color: "#FFFFFFB3",
        }}
        >
          {secondaryText}
        </ListItem>
      </Stack>

    </Box>
  )
}

export default SearchMenuItem;