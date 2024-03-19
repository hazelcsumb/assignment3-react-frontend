import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom'

// instructor views assignments for their section
// use location to get the section value 
// 
// GET assignments using the URL /sections/{secNo}/assignments
// returns a list of AssignmentDTOs
// display a table with columns 
// assignment id, title, dueDate and buttons to grade, edit, delete each assignment

const AssignmentsView = (props) => {

    const location = useLocation();
    const {secNo, courseId, secId} = location.state;

    // assignments_view.js
    // Fetch assignments from the server
    fetch('/api/assignments')
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
            console.error('Error fetching assignments:', error);
        });
     
    return(
        <> 
           <h3>Not implemented</h3>
        </>
    );
}

export default AssignmentsView;
