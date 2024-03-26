import React, {useState} from 'react';
import {SERVER_URL} from "../../Constants";

// student views a list of assignments and assignment grades 
// use the URL  /assignments?studentId= &year= &semester=
// The REST api returns a list of SectionDTO objects
// Use a value of studentId=3 for now. Until login is implemented in assignment 7.

// display a table with columns  Course Id, Assignment Title, Assignment DueDate, Score

const AssignmentsStudentView = (props) => {

    // assignments_student_view.js
// Fetch assignments for the student from the server
    fetch('/api/student/assignments')
        .then(response => response.json())
        .then(assignments => {
            // Process assignments and display them in the DOM
            const assignmentList = document.getElementById('assignmentList');
            assignments.forEach(assignment => {
                const listItem = document.createElement('li');
                listItem.textContent = assignment.name;
                assignmentList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching student assignments:', error);
        });

    return(
        <> 
            <h3>Not implemented</h3>   
        </>
    );
}

export default AssignmentsStudentView;