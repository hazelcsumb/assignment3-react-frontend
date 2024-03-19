import React, { useState } from 'react';

// instructor enters students' grades for an assignment
// fetch the grades using the URL /assignment/{id}/grades
// REST api returns a list of GradeDTO objects
// display the list as a table with columns 'gradeId', 'student name', 'student email', 'score' 
// score column is an input field 
//  <input type="text" name="score" value={g.score} onChange={onChange} />
 

const AssignmentGrade = (props) => {

    // assignment_grade.js
// Fetch assignments from the server
    fetch('/api/assignments')
        .then(response => response.json())
        .then(assignments => {
            // Process assignments and display them in the DOM
            const assignmentList = document.getElementById('assignmentList');
            assignments.forEach(assignment => {
                const listItem = document.createElement('li');
                listItem.textContent = assignment.name;
                const gradeInput = document.createElement('input');
                gradeInput.type = 'number';
                gradeInput.min = 0;
                gradeInput.max = 100;
                gradeInput.placeholder = 'Enter grade';
                listItem.appendChild(gradeInput);
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

export default AssignmentGrade;