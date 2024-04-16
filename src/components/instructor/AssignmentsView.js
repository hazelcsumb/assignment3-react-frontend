import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import AssignmentUpdate from "./AssignmentUpdate";
import AssignmentAdd from "./AssignmentAdd";
import Button from "@mui/material/Button";
import { baseURL } from "../../Constants";
import { api } from "../../api";
import AssignmentGrade from "./AssignmentGrade";

// instructor views assignments for their section
// use location to get the section value
//
// GET assignments using the URL /sections/{secNo}/assignments
// returns a list of AssignmentDTOs
// display a table with columns
// assignment id, title, dueDate and buttons to grade, edit, delete each assignment

const AssignmentsView = () => {
  const location = useLocation();
  const { secNo, courseId, secId } = location.state;
  const headers = ["AssignmentId", "Title", "DueDate", "", ""];
  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState("");

  const fetchAssignments = async () => {
    try {
      const response = await api.get(`${baseURL}/sections/${secNo}/assignments`);
      setAssignments(response.data);
    } catch (err) {
      setMessage("network error: " + err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const saveAssignment = async (assignment) => {
    try {
      // const response = await fetch (`${SERVER_URL}/sections/${secNo}/assignments`,
      await api.put(`${baseURL}/assignments`, JSON.stringify(assignment));
      setMessage("Assignment saved");
      fetchAssignments();
    } catch (err) {
      setMessage("network error: " + err);
    }
  };

  const addAssignment = async (assignment) => {
    try {
      const newAssignment = {
        ...assignment,
        courseId,
        secId,
        secNo,
      };

      await api.post(`${baseURL}/assignments`, JSON.stringify(newAssignment));
      setMessage("Assignment added");
      fetchAssignments();
    } catch (err) {
      setMessage("network error: " + err);
    }
  };

  const deleteAssignment = async (assignmentId) => {
    try {
      await api.delete(`${baseURL}/assignments/${assignmentId}`);
      setMessage("Assignment deleted");
      fetchAssignments();
    } catch (err) {
      setMessage("network error: " + err);
    }
  };

  const onDelete = (e) => {
    const row_idx = e.target.parentNode.parentNode.rowIndex - 1;
    const assignmentId = assignments[row_idx].id;
    confirmAlert({
      title: "Confirm to delete",
      message: "Do you really want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteAssignment(assignmentId),
        },
        {
          label: "No",
        },
      ],
    });
  };

  // // assignments_view.js
  // // Fetch assignments from the server
  // fetch('/api/assignments')
  //     .then(response => response.json())
  //     .then(assignments => {
  //         // Process assignments and display them in the DOM
  //         const assignmentList = document.getElementById('assignmentList');
  //         assignments.forEach(assignment => {
  //             const listItem = document.createElement('li');
  //             listItem.textContent = assignment.name;
  //             assignmentList.appendChild(listItem);
  //         });
  //     })
  //     .catch(error => {
  //         console.error('Error fetching assignments:', error);
  //     });

  if (assignments.length === 0)
  return (
    <div style={{ color: "red", marginTop: 20 }}>
      No assignments for this section!
    </div>
  );

  return (
    <>
      <div>
        <h3>Assignments</h3>
        <h4>{message}</h4>
        <table className="Center">
          <thead>
            <tr>
              {headers.map((s, idx) => (
                <th key={idx}>{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.title}</td>
                <td>{a.dueDate}</td>
                <td>
                  <AssignmentUpdate assignment={a} save={saveAssignment} />
                </td>
                <td>
                  <Button onClick={onDelete}>Delete</Button>
                </td>
                <td>
                  <Link to="/assignmentGrade" state={{ assignmentId: a.id }}>
                    Grade
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <AssignmentAdd save={addAssignment} />
      </div>
    </>
  );
};

export default AssignmentsView;
