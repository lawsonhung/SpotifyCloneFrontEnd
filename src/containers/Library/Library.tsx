import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material"
import { useEffect } from "react";
import { getPlaylists } from "../../api/services/playlist";

const Library = () => {

  useEffect(() => {
    const populatePlaylists = async () => {
      const playlists = await getPlaylists();
      console.log("playlists", playlists);
    }
    populatePlaylists();
  }, [])

  return (
    <Paper
      sx={{
        borderRadius: "8px",
      }}
    >
      <h1>Library</h1>
      <Drawer variant="permanent" open={true}>
        <List>
          <ListItem>
            <ListItemButton>

              <ListItemIcon></ListItemIcon>
              <ListItemText>

              </ListItemText>

            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Paper>
  )
}

export default Library;