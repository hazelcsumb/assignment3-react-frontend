import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

//  instructor updates assignment title, dueDate
//  use an mui Dialog
//  issue PUT to URL  /assignments with updated assignment

const AssignmentUpdate = (props) => {
  const [open, setOpen] = useState(false);
  const [editMessage, setEditMessage] = useState("");
  const [assignment, setAssignment] = useState({
    assignmentId: "",
    title: "",
    dueDate: "",
  });

  /*
   *  dialog for edit course
   */
  const editOpen = () => {
    setOpen(true);
    setEditMessage("");
    setAssignment(props.assignment);
  };

  const editClose = () => {
    setOpen(false);
    setAssignment({ assignmentId: "", title: "", dueDate: "" });
  };

  const editChange = (event) => {
    setAssignment({ ...assignment, [event.target.name]: event.target.value });
  };

  const onSave = () => {
    if (assignment.assignmentId === "") {
      setEditMessage("AssignmentId can not be blank");
    } else if (assignment.title === "") {
      setEditMessage("Title can not be blank");
    } else {
      props.save(assignment);
      editClose();
    }
  };

  // assignment_update.js
  /*
    document.getElementById('updateForm').addEventListener('submit', function(event) {
        event.preventDefault();
        // Fetch form data
        const updatedAssignmentName = document.getElementById('updatedAssignmentName').value;
        const updatedDueDate = document.getElementById('updatedDueDate').value;

        // Send data to the server to update the assignment
        // Example: Using fetch API
        fetch(`${SERVER_URL}/assignments`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                assignmentName: updatedAssignmentName,
                dueDate: updatedDueDate

           int id,
        String title,
        String dueDate,
        String courseId,
        int secId,
        int secNo
            })
        }).then(response => {
            // Handle response from the server
            // Example: Display success message
            alert('Assignment updated successfully!');
            // Optionally, redirect to another page or update the UI
        }).catch(error => {
            // Handle error
            console.error('Error updating assignment:', error);
        });
    });
        */

  return (
    <>
      <Button onClick={editOpen}>Edit</Button>
      <Dialog open={open}>
        <DialogTitle>Edit Assignment</DialogTitle>
        <DialogContent style={{ paddingTop: 20 }}>
          <h4>{editMessage}</h4>
          <TextField
            style={{ padding: 10 }}
            autoFocus
            fullWidth
            label="assignmentId"
            name="assignmentId"
            value={assignment.id}
            InputProps={{ readOnly: true }}
          />
          <TextField
            style={{ padding: 10 }}
            fullWidth
            label="title"
            name="title"
            value={assignment.title}
            onChange={editChange}
          />
          <TextField
            style={{ padding: 10 }}
            fullWidth
            label="dueDate"
            name="dueDate"
            value={assignment.dueDate}
            onChange={editChange}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={editClose}>
            Close
          </Button>
          <Button color="primary" onClick={onSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AssignmentUpdate;
