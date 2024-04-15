import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { baseURL, semesters, years } from "../../Constants";
import { api } from "../../api";
import YearSemesterForm from "../common/YearSemesterForm";

// student views a list of assignments and assignment grades
// use the URL  /assignments?studentId= &year= &semester=
// The REST api returns a list of SectionDTO objects
// Use a value of studentId=3 for now. Until login is implemented in assignment 7.

// display a table with columns  Course Id, Assignment Title, Assignment DueDate, Score
//
// Rubric:
// AssignmentsStudentView
// Prompts user to enter year and semester
// Fetches data using URL /assignments?studentId=&year=&semester
// Displays assignments in table format

const AssignmentsStudentView = () => {
  // State to store the liist of assignments
  const [assignments, setAssignments] = useState([]);
  const [year, setYear] = useState(years[0]);
  const [semester, setSemester] = useState(semesters[0]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting");
    setSubmitted(true);
    try {
      const response = await api.get(
        `${baseURL}/assignments?year=${year}&semester=${semester}`,
      );
      // Update state with the fetched assignments
      setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching student assignments:", error);
    }
  };

  useEffect(() => {
    // Fetch assignments for teh student from the server when the component mounts
    // Fetch assignments for the student from the server
  }, []);
  // assignments_student_view.js
  if (!submitted)
    return (
      <YearSemesterForm
        setYear={setYear}
        year={year}
        setSemester={setSemester}
        semester={semester}
        handleSubmit={handleSubmit}
        label="View Assignments"
      />
    );
  else if (submitted && assignments.length === 0) {
    return (
      <div style={{ color: "red", marginTop: 20 }}>
        No assignments found for you! How lucky!
      </div>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="assignments table">
          <TableHead>
            <TableRow>
              <TableCell>Course ID</TableCell>
              <TableCell>Assignment Title</TableCell>
              <TableCell>Assignment DueDate</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.assignmentId}>
                <TableCell>{assignment.courseId}</TableCell>
                <TableCell>{assignment.title}</TableCell>
                <TableCell>{assignment.dueDate}</TableCell>
                <TableCell>{assignment.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button
        onClick={() => setSubmitted(false)}
        style={{ marginTop: "10px", padding: "10px" }}
      >
        OK
      </button>
    </>
  );
};

export default AssignmentsStudentView;
