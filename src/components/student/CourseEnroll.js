import React, {useState, useEffect} from 'react';
import { SERVER_URL, studentId } from '../../Constants';

// students displays a list of open sections for a 
// use the URL /sections/open
// the REST api returns a list of SectionDTO objects

// the student can select a section and enroll
// issue a POST with the URL /enrollments?secNo= &studentId=3
// studentId=3 will be removed in assignment 7.
//
//
//
// Rubric:
// CourseEnroll
// Fetches and displays a list of open sections using URL /sections/open
// Allows user to select a section
// Issues a POST request to /enrollments/section/{secNo}?studentId=
// Displays success or error message from POST

const CourseEnroll = (props) => {

  // State to store the list of open sections fetched from server
  const [openSections, setOpenSections] = useState([]);

  // State to store the user's selected section to enroll in
  const [selectedSection, setSelectedSection] = useState('');

  useEffect(() => {
    // using the URL /sections/open to get sections that are open
    fetch(`${SERVER_URL}/sections/open`)
      .then(response => response.json())
      .then(data => setOpenSections(data)) // Set fetched data (SectionDTO objects)
      .catch(error => console.error('Error fetching open sections: ', error));
  }, []); // empty dependency array means this runs only once after initial rendering

  // Handles form submission for enrolling
  const handleSubmit = (event) => {
    event.preventDefault(); // prevents the default form submission
    // Issue a POST request to enroll in the selected section
    // **use studentId = 3 temporarily, will be removed in assignment 7

    fetch(`${SERVER_URL}/enrollments/sections/${selectedSection}?studentId=${studentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          alert('Enrolled successfully!'); // success message
          setSelectedSection(''); // resets selected section state
        } else {
          response.json()
          .then((data) => alert(data.message))
        }
      })
      .catch(error => console.error('Error enrolling in the course: ', error));
  };
  /*
    // course_enroll.js
    document.getElementById('enrollForm').addEventListener('submit', function(event) {
        event.preventDefault();
        // Fetch form data
        const courseId = document.getElementById('courseId').value;

        // Send data to the server to enroll the student in the course
        // Example: Using fetch API
        fetch(`/api/enroll/${courseId}`, {
            method: 'POST'
        }).then(response => {
            // Handle response from the server
            // Example: Display success message
            alert('Enrolled successfully!');
            // Optionally, redirect to another page or update the UI
        }).catch(error => {
            // Handle error
            console.error('Error enrolling in the course:', error);
        });
    });

    */

  // Note: make selection required to ensure a section a chosen
  // Also display section name and number
  return(
    <div>
      <h3>Enroll in a Course Section</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="courseId">Select a Section:</label>
        <select
          id="courseId"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          <option value="">Select...</option>
          {openSections.map((section) => (
            <option key={section.secNo} value={section.secNo}>
              {section.courseId} - Section {section.secNo}
            </option>
          ))}
        </select>
        <button type="submit">Enroll</button>
      </form>
    </div>
  );
};


export default CourseEnroll;
