import React, { useState, useEffect } from "react";
import { api } from "../../api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

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

const Transcript = () => {
  const [transcripts, setTranscripts] = useState([]);

  useEffect(() => {
    // fetch(`${REGISTRAR_URL}/transcripts`, {headers})
    const getTranscipts = async () => {
      try {
        const response = await api.get("/transcripts");
        setTranscripts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getTranscipts();
  }, []);

  // transcript.js
  // Fetch transcript for the student from the server
  if (transcripts.length === 0) {
    return (
      <div style={{ color: "red", marginTop: 20 }}>No transcripts found!</div>
    );
  }

  return (
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
            <TableRow key={transcript.enrollmentId}>
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
};

export default Transcript;
