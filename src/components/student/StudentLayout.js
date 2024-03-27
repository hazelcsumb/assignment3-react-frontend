import { Outlet, Link } from "react-router-dom";

export const StudentHome = () => {

  return (
      <div>
          <h1>Student Home</h1>
          <p>View and change class information.</p> 
      </div>
      
      );
};

export const StudentLayout = () => {
  return (
    <>
      <nav>
        <Link id="sections" to="/">Home</Link> &nbsp;|&nbsp;
        <Link to="/schedule">View Class Schedule</Link>&nbsp;|&nbsp;
        <Link to="/courseEnroll">Enroll in a class</Link>&nbsp;|&nbsp;
        <Link to="/studentAssignments">View Assignments</Link>&nbsp;|&nbsp;  
        <Link to="/transcript">View Transcript</Link>
      </nav>

      <Outlet />
    </>
  )
};
