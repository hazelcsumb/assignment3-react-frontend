import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import { GRADEBOOK_SERVICE } from '../../Constants';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import  Select from "@mui/material/Select";
import  MenuItem  from "@mui/material/MenuItem";

// instructor view list of students enrolled in a section 
// use location to get section no passed from InstructorSectionsView
// fetch the enrollments using URL /sections/{secNo}/enrollments
// display table with columns
//   'enrollment id', 'student id', 'name', 'email', 'grade'
//  grade column is an input field
//  hint:  <input type="text" name="grade" value={e.grade} onChange={onGradeChange} />
//
//  Rubric:
//  EnrollmentsView
// Fetches enrollments for a section using URL /sections/${secNo}/enrollments
// Displays data as a table
// Allow instructor to enter a final grade for each enrolled students
// Instructor can save grades by issues a PUT request to URL /enrollments


const EnrollmentsView = (props) => {

  const location = useLocation();
  const {secNo, courseId, secId} = location.state;
  const [enrollments, setEnrollments] = useState([]);

  const updateGrade = (enrollment, e) => {
    console.log("Updating grade..");
    const new_grade = e.target.value;
    setEnrollments(enrollments.map((enrollmentToChange) => {
      if (enrollmentToChange.enrollmentId === enrollment.enrollmentId) {
        enrollmentToChange.grade = new_grade;
      }
      return enrollmentToChange;
    }));
  }

  const saveGrades = () => {
    console.log("Saving grades...");
    const options = {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enrollments),
    };
    fetch(`${GRADEBOOK_SERVICE}/enrollments`, options)
    .then(_ => {
        alert("Grade updated in the database.");
    })
    .catch(_ => {
        alert("Something went wrong. Please try again");
    })
  }

  // enrollments_view.js
  // Fetch enrolled students from the server
  useEffect(() => {
    fetch(`${GRADEBOOK_SERVICE}/sections/${secNo}/enrollments`)
      .then(response => response.json())
      .then(enrollments => {
        setEnrollments(enrollments);
      })
      .catch(error => {
        console.error('Error fetching enrollments:', error);
      });

  },[secNo]);
  if (enrollments.length === 0) 
    return <div style={{color: "red", marginTop: 20}}>No enrollments for this section!</div>

  return(
    <div> 
      <TableContainer component={Paper}>
        <Table aria-label="Enrollments table">
          <TableHead>
            <TableRow>
              <TableCell>Enrollment Id</TableCell>
              <TableCell>Student Id</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Student Email</TableCell>
              <TableCell>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enrollments.map((enrollment) => (
              <TableRow key={enrollment.enrollmentId}>
                <TableCell>{enrollment.enrollmentId}</TableCell>
                <TableCell>{enrollment.studentId}</TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>{enrollment.name}</TableCell>
                <TableCell>{enrollment.email}</TableCell>
                <TableCell>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={enrollment.grade}
                    label="Grade"
                    onChange={(e) => updateGrade(enrollment, e)}
                  >
                    <MenuItem value={"A"}>A</MenuItem>
                    <MenuItem value={"B"}>B</MenuItem>
                    <MenuItem value={"C"}>C</MenuItem>
                    <MenuItem value={"D"}>D</MenuItem>
                    <MenuItem value={"F"}>F</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button 
        onClick={saveGrades}
        style={{marginTop:"10px", padding:"10px"}}
      >Save Grades</button>
    </div>
  );
}

export default EnrollmentsView;
