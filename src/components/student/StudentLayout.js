import { Outlet, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Logout from "../../Logout.js";
import ScheduleView from "./ScheduleView";
import Transcript from "./Transcript";
import CourseEnroll from "./CourseEnroll";
import AssignmentsStudentView from "./AssignmentsStudentView";

export const StudentRouter = (props) => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentLayout />}>
            <Route index element={<StudentHome />} />
            <Route
              path="studentAssignments"
              element={<AssignmentsStudentView />}
            />
            <Route path="schedule" element={<ScheduleView />} />
            <Route path="addCourse" element={<CourseEnroll />} />
            <Route path="transcript" element={<Transcript />} />
            <Route path="logout" element={<Logout logout={props.logout} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export const StudentHome = () => {
  return (
    <div>
      <h1>Student Home</h1>
      <p>Choose a link above to get started!</p>
    </div>
  );
};

export const StudentLayout = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> &nbsp;|&nbsp;
        <Link to="/schedule">View Class Schedule</Link>&nbsp;|&nbsp;
        <Link to="/addCourse">Enroll in a class</Link>&nbsp;|&nbsp;
        <Link to="/studentAssignments">View Assignments</Link>&nbsp;|&nbsp;
        <Link to="/transcript">View Transcript</Link>&nbsp;|&nbsp;
        <Link to="/logout">Logout</Link>
      </nav>

      <Outlet />
    </>
  );
};
