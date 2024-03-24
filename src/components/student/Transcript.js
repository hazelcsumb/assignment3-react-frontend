import React, {useState, useEffect} from 'react';
import { SERVER_URL, studentId } from '../../Constants';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// students gets a list of all courses taken and grades
// use the URL /transcript?studentId=
// the REST api returns a list of EnrollmentDTO objects 
// the table should have columns for 
//  Year, Semester, CourseId, SectionId, Title, Credits, Grade
//
// Rubric:
// Transcript
// Lists enrollments and grades for student using URL /transcripts?studentId=
// Displays enrollments in table

const Transcript = (props) => {
  const [transcripts, setTranscripts] = useState([]);
  console.log(transcripts);


  useEffect(()=> {
    fetch(`${SERVER_URL}/transcripts?studentId=${studentId}`)
      .then(response => response.json())
      .then(transcripts => {
        // Process transcript and display it in the DOM
        setTranscripts(transcripts);
      })
      .catch(error => {
        console.error('Error fetching student transcript:', error);
      });

  }, []);

  // transcript.js
  // Fetch transcript for the student from the server

  return(
    <TableContainer component={Paper}>
      <Table aria-label="assignments table">
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell>Semester</TableCell>
            <TableCell>Course ID</TableCell>
            <TableCell>SectionId</TableCell>
            <TableCell>Credits</TableCell>
            <TableCell>Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transcripts.map((transcript) => (
            <TableRow key={transcript.id}>
              <TableCell>{transcript.year}</TableCell>
              <TableCell>{transcript.semester}</TableCell>
              <TableCell>{transcript.courseId}</TableCell>
              <TableCell>{transcript.sectionId}</TableCell>
              <TableCell>{transcript.credits}</TableCell>
              <TableCell>{transcript.grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Transcript;
