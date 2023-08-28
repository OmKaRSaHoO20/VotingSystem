import * as React from "react";
import { styled } from "@mui/material/styles";
import { Button, Icon, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import CloseIcon from "@mui/icons-material/Close";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Header = (props) => {
  const [open, setOpen] = React.useState(false);
  const [candidate, setCandidate] = React.useState("");

  const handleAddCandidate = async () => {
    try {
      if (props.methods) {
        await props.methods
          .addCandidate(candidate)
          .send({ from: props.accountData, gas: 500000 });
      }
      setOpen(false);
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  };

  // const handle = async () => {
  //   await props.methods
  //     .candidatesCount()
  //     .call({ from: props.accountData })
  //     .then((result) => {
  //       console.log("Candidates count:", result);
  //     })
  //     .catch((error) => {
  //       console.error("Error getting candidates count:", error);
  //     });
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={props.open}>
        <Toolbar>
          <Box
            width={"100%"}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <Typography variant="h6" noWrap component="div">
                Voting System
              </Typography>
            </Box>
            <Box>
              <Button
                variant="outlined"
                style={{
                  color: "white",
                  borderColor: "white",
                  marginRight: 16,
                }}
                onClick={handleClickOpen}
              >
                <AddCircleOutlineTwoToneIcon />
                Add Candidate
              </Button>
            </Box>
          </Box>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              Add Candidate
              <IconButton onClick={handleClose}>
                <Icon>
                  <CloseIcon fontSize="small" />
                </Icon>
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                To add the candidate for voting please add the Candidates name.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Candidate Name"
                type="text"
                fullWidth
                variant="standard"
                value={candidate}
                onChange={(e) => {
                  setCandidate(e.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleAddCandidate}>Add</Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
