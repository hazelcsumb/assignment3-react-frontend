import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { api } from "../../api";
import { baseURL } from "../../Constants";

// complete the code.
// instructor adds an assignment to a section
// use mui Dialog with assignment fields Title and DueDate
// issue a POST using URL /assignments to add the assignment

const AssignmentAdd = () => {
  const [open, setOpen] = useState(false); // controls the dialog's open/close state
  const [assignmentName, setAssignmentName] = useState(""); //state for the assignment's name
  const [dueDate, setDueDate] = useState(""); // state for the assignment's due date

  // handles opening of the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // handles the closing of the dialog
  const handleClose = () => {
    setOpen(false);
  };


  // handles the assignment form
  const handleSubmit = async(event) => {
    event.preventDefault();
    // preparing the assignment data to be sent to the server
    const assignmentData = {
      title: assignmentName,
      dueDate: dueDate,
    };

    // sending the assignment data to the server using Axios
    try {
      await api.post(`${baseURL}/assignments`, JSON.stringify(assignmentData));
      alert('Assignment added successfully!');
      handleClose(); // close the dialog
      setAssignmentName(''); // reset assignment name
      setDueDate(''); // Reset the due date
    } catch (error) {
      console.error('Error adding assignment:', error);
      alert('Failed to add the assignment.  Please try again.');
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Assignment
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Assignment</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              autoFocus
              margin="dense"
              id="assignmentName"
              label="Assignment Title"
              type="text"
              fullWidth
              variant="outlined"
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
            />
            <TextField
              margin="dense"
              id="dueDate"
              label="Due Date"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button id="submit" type="submit">
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AssignmentAdd;
