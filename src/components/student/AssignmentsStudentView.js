import React, {useEffect, useState} from 'react';
import { Select, MenuItem} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { studentId, SERVER_URL} from '../../Constants';
import dayjs from 'dayjs';

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

const AssignmentsStudentView = (props) => {
  // State to store the liist of assignments
  const [assignments, setAssignments] = useState([]);
  const [year, setYear] = useState(0);
  const [semester, setSemester] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting")
    setSubmitted(true);
    fetch(`${SERVER_URL}/assignments?studentId=${studentId}&year=${year}&semester=${semester}`)
      .then(response => response.json())
      .then(data => {
        // Update state with the fetched assignments
        setAssignments(data);
      })
      .catch(error => {
        console.error('Error fetching student assignments:', error);
      });

  }

  useEffect(() => {
    // Fetch assignments for teh student from the server when the component mounts
    // Fetch assignments for the student from the server

  }, []);
  // assignments_student_view.js
  if (!submitted)
  return (
    <form onSubmit={handleSubmit} style={{marginTop:20}}>
      <DatePicker 
        label="Pick a year"
        views={['year']} 
        minDate={dayjs('2022-01-01T15:30')}
        maxDate={dayjs('2024-12-30T15:30')}
        onChange={(newYear) => setYear(newYear.$y)}
      />
      <Select
        label="Semester"
        onChange={(newSemester) => setSemester(newSemester.target.value)}
        required
      >
        <MenuItem value={"Fall"}>Fall</MenuItem>
        <MenuItem value={"Spring"}>Spring</MenuItem>
      </Select>
      <button type='submit'>Submit</button>
    </form>
  )

  return(
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
            <TableRow key={assignment.id}>
              <TableCell>{assignment.courseId}</TableCell>
              <TableCell>{assignment.title}</TableCell>
              <TableCell>{assignment.dueDate}</TableCell>
              <TableCell>{assignment.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AssignmentsStudentView;
