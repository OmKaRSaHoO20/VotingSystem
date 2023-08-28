import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Login = (props) => {
  const [candidatesList, setCandidatesList] = React.useState([]);
  const [candidateVotes, setCandidateVotes] = React.useState([]);
  const [totalVotes, setTotalVotes] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedCandidateIndex, setSelectedCandidateIndex] =
    React.useState(null);

  function createData(name, votes) {
    return { name, votes };
  }

  React.useEffect(() => {
    const fetchCandidatesAndVotes = async () => {
      if (!props.methods) {
        console.log("Error loading functions from contract");
        return;
      }

      const candidatesCount = await props.methods
        .candidatesCount()
        .call({ from: props.accountData });

      const candidatePromises = [];
      const votePromises = [];

      for (let i = 0; i < candidatesCount; i++) {
        const candidatePromise = props.methods
          .getCandidate(i)
          .call({ from: props.accountData });
        candidatePromises.push(candidatePromise);

        const votePromise = props.methods
          .getVoteCount(i)
          .call({ from: props.accountData });
        votePromises.push(votePromise);
      }

      const newCandidatesList = await Promise.all(candidatePromises);
      setCandidatesList(newCandidatesList);

      const votes = await Promise.all(votePromises);
      setCandidateVotes(votes);

      const totalVotesCount = votes.reduce(
        (sum, voteCount) => sum + parseInt(voteCount),
        0
      );
      setTotalVotes(totalVotesCount);
    };
    fetchCandidatesAndVotes();
  }, [props]);

  const rows = candidatesList.map((candidateName, index) => {
    return createData(candidateName, candidateVotes[index]);
  });

  const handleClickOpen = (i) => {
    setOpen(true);
    setSelectedCandidateIndex(i);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleVote = async () => {
    try {
      if (selectedCandidateIndex !== null) {
        await props.methods.vote(selectedCandidateIndex).send({
          from: props.accountData,
          gas: 500000,
        });

        const newVotes = [...candidateVotes];
        newVotes[selectedCandidateIndex] = await props.methods
          .getVoteCount(selectedCandidateIndex)
          .call({ from: props.accountData });
        setCandidateVotes(newVotes);
        const newTotalVotes = newVotes.reduce(
          (sum, voteCount) => sum + parseInt(voteCount),
          0
        );
        setTotalVotes(newTotalVotes);
        setSelectedCandidateIndex(null);
        handleClose();
      }
    } catch (error) {
      console.error("Error voting:", error);
      handleClose();
    }
  };

  return (
    <Box marginTop={25}>
      <Box style={{ height: "auto", width: "80%", margin: "auto" }}>
        <Box sx={{ marginBottom: 5, fontSize: 36 }}>All Candidates</Box>
        <Paper>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell>Candidates</TableCell>
                  <TableCell align="right" sx={{ paddingRight: 5 }}>
                    Vote
                  </TableCell>
                  <TableCell align="right">Votes</TableCell>
                  <TableCell align="right">Vote Ratio(%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((row, i) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          onClick={() => {
                            handleClickOpen(i);
                          }}
                        >
                          Vote
                        </Button>
                      </TableCell>
                      <TableCell align="right">{`${Number(
                        row.votes
                      )}`}</TableCell>
                      <TableCell align="right">
                        {totalVotes !== 0
                          ? ((Number(row.votes) / totalVotes) * 100).toFixed(
                              2
                            ) + "%"
                          : "0.00%"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} fontSize={24} align="center">
                      No Candidates
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            Are you 18+
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
          </DialogContent>
          <DialogActions sx={{ marginRight: 2 }}>
            <Button onClick={handleClose} variant="outlined">
              No
            </Button>
            <Button onClick={(i) => handleVote(i)} variant="outlined">
              Yes, Vote
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Login;
