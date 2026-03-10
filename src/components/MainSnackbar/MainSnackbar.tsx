import { Snackbar, type SnackbarCloseReason } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import type { SyntheticEvent } from "react";
import { setSnackbarOpen } from "../../features/snackbar/snackbar";

const MainSnackbar = () => {

  const dispatch = useDispatch();

  const open = useSelector((state: RootState) => state.snackbar.open);
  const message = useSelector((state: RootState) => state.snackbar.message);

  const handleCloseSnackbar = (_: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") return;
    dispatch(setSnackbarOpen(false));
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      message={message}
      onClose={handleCloseSnackbar}
    />
  )
}

export default MainSnackbar;