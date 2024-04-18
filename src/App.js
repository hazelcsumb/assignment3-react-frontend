import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import UsersView from './components/admin/UsersView';
import CoursesView from './components/admin/CoursesView';
import SectionsView from './components/admin/SectionsView';
import {AdminHome, AdminLayout} from './components/admin/AdminLayout';
import {StudentLayout, StudentHome} from './components/student/StudentLayout';
import ScheduleView from './components/student/ScheduleView';
import Transcript from './components/student/Transcript';
import StudentAssignmentsView from './components/student/AssignmentsStudentView';
import InstructorLayout from './components/instructor/InstructorLayout';
import InstructorHome from './components/instructor/InstructorHome';
import AssignmentsView from './components/instructor/AssignmentsView';
import EnrollmentsView from './components/instructor/EnrollmentsView';
import InstructorSectionsView from './components/instructor/InstructorSectionsView';
import AssignmentAdd from './components/instructor/AssignmentAdd';
import AssignmentGrade from './components/instructor/AssignmentGrade';
import CourseEnroll from './components/student/CourseEnroll';



function App() {

  // change to INSTRUCTOR or STUDENT for testing.  
  // when login is implemented, the user type will come from the logged in user's ROLE.

  const userType = 'INSTRUCTOR'; // change to INSTRUCTOR or STUDENT for testing.

  if (userType==='ADMIN') {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AdminLayout />}>
                <Route index element={<AdminHome />} />
                <Route path="users" element={<UsersView />} />
                <Route path="courses" element={<CoursesView />} />
                <Route path="sections" element={<SectionsView />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </LocalizationProvider>
    )
  } else if (userType==='STUDENT') {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<StudentLayout />}>
                <Route index element={<StudentHome />} />
                <Route path="schedule" element={<ScheduleView />} />
                <Route path="studentAssignments" element={<StudentAssignmentsView />} />
                <Route path="transcript" element={<Transcript />} />
                <Route path="courseEnroll" element={<CourseEnroll />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </LocalizationProvider>
    )
  } else if (userType==='INSTRUCTOR') {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<InstructorLayout />}>
                <Route index element={<InstructorHome />} />
                <Route path="assignments" element={<AssignmentsView />} />
                <Route path="enrollments" element={<EnrollmentsView />} />
                <Route path="sections" element={<InstructorSectionsView />} />
                <Route path="assignmentAdd" element={<AssignmentAdd />} />
                <Route path="assignmentGrade" element={<AssignmentGrade />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </LocalizationProvider>
    )

  } else {
    return <h1>Unknown user type</h1>

  }
}
export default App;
