import React, {useState} from 'react';

// student can view schedule of sections 
// use the URL /enrollment?studentId=3&year= &semester=
// The REST api returns a list of EnrollmentDTO objects
// studentId=3 will be removed in assignment 7

// to drop a course 
// issue a DELETE with URL /enrollment/{enrollmentId}

const ScheduleView = (props) => {

    // schedule_view.js
// Fetch schedule for the student from the server
    fetch('/api/student/schedule')
        .then(response => response.json())
        .then(schedule => {
            // Process schedule and display it in the DOM
            const scheduleDiv = document.getElementById('schedule');
            schedule.forEach(course => {
                const courseElement = document.createElement('div');
                courseElement.textContent = `Course: ${course.name}, Time: ${course.time}`;
                scheduleDiv.appendChild(courseElement);
            });
        })
        .catch(error => {
            console.error('Error fetching student schedule:', error);
        });


    return(
        < > 
            <h3>Not implemented</h3>
        </ >
    );

}

export default ScheduleView;