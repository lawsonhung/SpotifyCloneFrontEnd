import { Drawer, Paper } from "@mui/material"
import { useEffect } from "react";

const Library = () => {

  useEffect(() => {

  }, [])

  return (
    <Paper
      sx={{
        borderRadius: "8px",
      }}
    >
      <h1>Library</h1>
      <Drawer variant="permanent" open={true}>

      </Drawer>
    </Paper>
  )
}

export default Library;