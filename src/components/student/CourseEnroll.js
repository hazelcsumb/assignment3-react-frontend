import React, {useState, useEffect} from 'react';

// students displays a list of open sections for a 
// use the URL /sections/open
// the REST api returns a list of SectionDTO objects

// the student can select a section and enroll
// issue a POST with the URL /enrollments?secNo= &studentId=3
// studentId=3 will be removed in assignment 7.

const CourseEnroll = (props) => {

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


    return(
        <>
           <h3>Not implemented</h3>
        </>
    );
}

export default CourseEnroll;