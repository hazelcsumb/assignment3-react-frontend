import React, { useState } from "react";

// student can view schedule of sections
// use the URL /enrollment?studentId=3&year= &semester=
// The REST api returns a list of EnrollmentDTO objects
// studentId=3 will be removed in assignment 7

// to drop a course
// issue a DELETE with URL /enrollment/{enrollmentId}
import { baseURL, semesters, years } from "../../Constants";
import YearSemesterForm from "../common/YearSemesterForm";
import { api } from "../../api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ScheduleView = () => {
  // schedule_view.js
  const [error, setError] = useState("");
  const [year, setYear] = useState(years[0]);
  const [semester, setSemester] = useState(semesters[0]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const getClassSchedule = async (e) => {
    // Fetch schedule for the student from the server
    e.preventDefault();
    try {
      const response = await api.get(`${baseURL}/enrollments?year=${year}&semester=${semester}`)
      setShowSchedule(true);
      setError("");
      setSchedule(response.data);
    } catch (error) {
      console.error("Error fetching student schedule:", error);
      setShowSchedule(false);
      setError(error.response.data.message);
    }
  }

  const deleteCourse = async (enrollmentId) => {
    try {
      const response = await api.delete(`${baseURL}/enrollments/${enrollmentId}`);
      if (response.status === 404 || response.status === 400) {
        throw new Error("There was an error trying to delete enrollment.");
      }
      setSchedule(schedule.filter((course) => course.enrollmentId !== enrollmentId));
      setError("");
    } catch (error) {
      console.error("Error deleting course", error);
      setError(error.response.data.message);
    }
  }

  return (
    <div>
      <YearSemesterForm
        setYear={setYear}
        year={year}
        setSemester={setSemester}
        semester={semester}
        handleSubmit={getClassSchedule}
        label="View Class Schedule"
      />
      <div id="schedule">

        {
          schedule.length === 0 && showSchedule ?
            (
              <p style={{ color: "red", margin: 0 }}>No Schedule found!</p>
            )
            :
            (
                  <TableContainer component={Paper}>
                    <Table aria-label="assignments table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Year</TableCell>
                          <TableCell>Semester</TableCell>
                          <TableCell>Course-Section ID</TableCell>
                          <TableCell>Credits</TableCell>
                          <TableCell>Student ID</TableCell>
                          <TableCell>Times</TableCell>
                          <TableCell>Building</TableCell>
                          <TableCell>Room</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {schedule.map((course) => (
                          <TableRow key={course.enrollmentId}>
                            <TableCell>{course.year}</TableCell>
                            <TableCell>{course.semester}</TableCell>
                            <TableCell>{course.courseId}-{course.sectionId}</TableCell>
                            <TableCell>{course.credits}</TableCell>
                            <TableCell>{course.studentId}</TableCell>
                            <TableCell>{course.times}</TableCell>
                            <TableCell>{course.building}</TableCell>
                            <TableCell>{course.room}</TableCell>
                            <TableCell><button type="submit" onClick={() => deleteCourse(course.enrollmentId)}>Drop course</button></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
            )
        }
        <p style={{ color: "red", margin: 0 }}>{error}</p>
      </div>
    </div>
  );
};

export default ScheduleView;
