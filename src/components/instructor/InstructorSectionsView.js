import React, { useState, useEffect } from "react";
import { years, semesters, baseURL } from "../../Constants";
import YearSemesterForm from "../common/YearSemesterForm";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { api } from "../../api";

// instructor views a list of sections they are teaching
// use the URL /sections?email=dwisneski@csumb.edu&year= &semester=
// the email= will be removed in assignment 7 login security
// The REST api returns a list of SectionDTO objects
// The table of sections contains columns
//   section no, course id, section id, building, room, times and links to assignments and enrollments
// hint:
// <Link to="/enrollments" state={section}>View Enrollments</Link>
// <Link to="/assignments" state={section}>View Assignments</Link>
//
// Rubric:
// InstrurctorSectionsView
// Prompts instructor user to enter year, semester
// Fetches and displays sections that an instructor is teaching using URL /sections?email=&year=&semester=
// Allows user to select a row in the table and navigate to enrollments or assignments for that section

const InstructorSectionsView = () => {
  // instructor_sections_view.js
  const [submitted, setSubmitted] = useState(false);
  const [sections, setSections] = useState([]);
  const [year, setYear] = useState(years[0]);
  const [semester, setSemester] = useState(semesters[0]);
  // Fetch sections/groups from the server

  const handleSubmit = async () => {
    setSubmitted(true);
    try {
      const response = await api.get(`${baseURL}/sections?year=${year}&semester=${semester}`);
      setSections(response.data);
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  if (submitted)
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="Sections table">
          <TableHead>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Course ID</TableCell>
              <TableCell>SectionId</TableCell>
              <TableCell>SectionNo</TableCell>
              <TableCell>Times</TableCell>
              <TableCell>Instructor Name</TableCell>
              <TableCell>Enrollments</TableCell>
              <TableCell>Assignments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sections.map((section) => (
              <TableRow key={section.secNo}>
                <TableCell>{section.year}</TableCell>
                <TableCell>{section.semester}</TableCell>
                <TableCell>{section.courseId}</TableCell>
                <TableCell>{section.secId}</TableCell>
                <TableCell>{section.secNo}</TableCell>
                <TableCell>{section.times}</TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>
                  {section.instructorName}
                </TableCell>
                <TableCell>
                  <Link to="/enrollments" state={section}>
                    View Enrollments
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to="/assignments" state={section}>
                    View Assignments
                  </Link>
                </TableCell>
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
    </div>
  );
  else
  return (
    <div style={{ width: "100%" }}>
      <YearSemesterForm
        setYear={setYear}
        year={year}
        setSemester={setSemester}
        semester={semester}
        handleSubmit={handleSubmit}
        label="View Section Info"
      />
    </div>
  );
};

export default InstructorSectionsView;
