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
import { auth } from "../../firebase";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";

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
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  const handleAddCandidate = async () => {
    try {
      if (props.methods) {
        await props.methods
          .addCandidate(candidate)
          .send({ from: props.accountData, gas: 500000 });
      }
      toast.success("Candidate added successfully!!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setCandidate("");
      setOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error(error, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
      toast.success("Logged Out successfully!!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      toast.error(e, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else navigate("/");
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
            {!user ? (
              <Box sx={{ display: "flex" }}>
                <Button
                  variant="outlined"
                  style={{
                    color: "white",
                    borderColor: "white",
                    marginRight: 16,
                  }}
                  onClick={handleClickOpen}
                >
                  <LoginIcon />
                  Login
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: "flex" }}>
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
                <Button
                  variant="outlined"
                  style={{
                    color: "white",
                    borderColor: "white",
                    marginRight: 16,
                  }}
                  onClick={handleLogout}
                >
                  <LogoutIcon />
                  LogOut
                </Button>
              </Box>
            )}
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
              <Button type="submit" onClick={handleAddCandidate}>
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
