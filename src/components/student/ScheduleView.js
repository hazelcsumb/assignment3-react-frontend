import React, { useState } from "react";

// student can view schedule of sections
// use the URL /enrollment?studentId=3&year= &semester=
// The REST api returns a list of EnrollmentDTO objects
// studentId=3 will be removed in assignment 7

// to drop a course
// issue a DELETE with URL /enrollment/{enrollmentId}
import { REGISTRAR_URL, semesters, years } from "../../Constants";
import YearSemesterForm from "../common/YearSemesterForm";

const ScheduleView = (props) => {
  // schedule_view.js
  const [error, setError] = useState("");
  const [year, setYear] = useState(years[0]);
  const [semester, setSemester] = useState(semesters[0]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const getClassSchedule = async (e) => {
    // Fetch schedule for the student from the server
    e.preventDefault();
    fetch(`${REGISTRAR_URL}/enrollments?studentId=${3}&year=${year}&semester=${semester}`)
      .then((response) => response.json())
      .then((schedule) => {
        setShowSchedule(true);
        setSchedule(schedule);
        setError("");
      })
      .catch((error) => {
        console.error("Error fetching student schedule:", error);
        setShowSchedule(false);
        setError(error.message);
      });
  }

  const deleteCourse = async (enrollmentId) => {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', }
    };
    fetch(`http://localhost:8080/enrollments/${enrollmentId}`, options)
      .then((response) => response.json())
      .then(({ status, message }) => {
        if (status === 404) {
          throw new Error(message);
        }
        setSchedule(schedule.filter((course) => course.enrollmentId !== enrollmentId));
        setError("");
      })
      .catch((error) => {
        console.error("Error deleting course", error);
        setError(error.message);
      })
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
              schedule.map((course) => (
                <div id="scourseId" key={course.courseId}>
                  {`Course: ${course.courseId}, Time: ${course.times}`}
                  <button type="submit" onClick={() => deleteCourse(course.enrollmentId)}>Drop course</button>
                </div>
              ))
            )
        }
        <p style={{ color: "red", margin: 0 }}>{error}</p>
      </div>
    </div>
  );
};

export default ScheduleView;
