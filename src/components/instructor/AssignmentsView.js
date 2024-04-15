import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import AssignmentUpdate from "./AssignmentUpdate";
import AssignmentAdd from "./AssignmentAdd";
import Button from "@mui/material/Button";
import { baseURL } from "../../Constants";
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
      const response = await fetch(
        `${baseURL}/sections/${secNo}/assignments`,
      );
      if (response.ok) {
        const assignments = await response.json();
        setAssignments(assignments);
      } else {
        const json = await response.json();
        setMessage("response error: " + json.message);
      }
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
      const response = await fetch(`${baseURL}/assignments`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignment),
      });
      if (response.ok) {
        setMessage("Assignment saved");
        fetchAssignments();
      } else {
        const json = await response.json();
        setMessage("response error: " + json.message);
      }
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

      const response = await fetch(`${baseURL}/assignments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAssignment),
      });
      if (response.ok) {
        setMessage("Assignment added");
        fetchAssignments();
      } else {
        const rc = await response.json();
        setMessage(rc.message);
      }
    } catch (err) {
      setMessage("network error: " + err);
    }
  };

  const deleteAssignment = async (assignmentId) => {
    try {
      const response = await fetch(
        `${baseURL}/assignments/${assignmentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        setMessage("Assignment deleted");
        fetchAssignments();
      } else {
        const rc = await response.json();
        setMessage("Delete failed " + rc.message);
      }
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
