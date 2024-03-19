import React, {useState, useEffect} from 'react';

// students gets a list of all courses taken and grades
// use the URL /transcript?studentId=
// the REST api returns a list of EnrollmentDTO objects 
// the table should have columns for 
//  Year, Semester, CourseId, SectionId, Title, Credits, Grade

const Transcript = (props) => {

    // transcript.js
// Fetch transcript for the student from the server
    fetch('/api/student/transcript')
        .then(response => response.json())
        .then(transcript => {
            // Process transcript and display it in the DOM
            const transcriptDiv = document.getElementById('transcript');
            transcript.forEach(course => {
                const courseElement = document.createElement('div');
                courseElement.textContent = `Course: ${course.name}, Grade: ${course.grade}`;
                transcriptDiv.appendChild(courseElement);
            });
        })
        .catch(error => {
            console.error('Error fetching student transcript:', error);
        });

    return(
        <> 
            <h3>Not implemented</h3>
        </>
    );
}

export default Transcript;