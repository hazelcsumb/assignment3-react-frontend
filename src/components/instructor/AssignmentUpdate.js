import React, { useState } from 'react';

//  instructor updates assignment title, dueDate 
//  use an mui Dialog
//  issue PUT to URL  /assignments with updated assignment

const AssignmentUpdate = (props)  => {

    // assignment_update.js
    document.getElementById('updateForm').addEventListener('submit', function(event) {
        event.preventDefault();
        // Fetch form data
        const updatedAssignmentName = document.getElementById('updatedAssignmentName').value;
        const updatedDueDate = document.getElementById('updatedDueDate').value;

        // Send data to the server to update the assignment
        // Example: Using fetch API
        fetch('/api/updateAssignment', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                assignmentName: updatedAssignmentName,
                dueDate: updatedDueDate
            })
        }).then(response => {
            // Handle response from the server
            // Example: Display success message
            alert('Assignment updated successfully!');
            // Optionally, redirect to another page or update the UI
        }).catch(error => {
            // Handle error
            console.error('Error updating assignment:', error);
        });
    });

    return (
        <>
          <h3>Not implemented</h3>  
        </>                       
    )
}

export default AssignmentUpdate;
