import React, { useState } from "react";

// student can view schedule of sections
// use the URL /enrollment?studentId=3&year= &semester=
// The REST api returns a list of EnrollmentDTO objects
// studentId=3 will be removed in assignment 7

// to drop a course
// issue a DELETE with URL /enrollment/{enrollmentId}
import { SERVER_URL, semesters, years } from "../../Constants";

const ScheduleView = (props) => {
  // schedule_view.js
  const [error, setError] = useState("");
  const [showSchedule, setShowSchedule] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const getClassSchedule = async (e) => {
    // Fetch schedule for the student from the server
    e.preventDefault();
    const [year, semester] = e.target;
    fetch(`${SERVER_URL}/enrollments?studentId=3&year=${year.value}&semester=${semester.value}`)
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
      <form onSubmit={getClassSchedule}>
        <label htmlFor="year">Year</label>
        <select name="year" id="year" required>
          <option disabled value="Select a year">Select a year</option>
          {
            years.map((year) => <option value={year}>{year}</option>)
          }
        </select>
        <label htmlFor="semester">Semester</label>
        <select name="semester" id="semester" required>
          <option disabled value="Select a semester">Select a semester</option>
          {
            semesters.map((semester) => <option value={semester}>{semester}</option>)
          }
        </select>
        <button type="submit">View Class Schedule</button>
      </form>
      <div id="schedule">

        {
          schedule.length === 0 && showSchedule ?
            (
              <p style={{ color: "red", margin: 0 }}>No Schedule found!</p>
            )
            :
            (
              schedule.map((course) => (
                <div key={course.courseId}>
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
