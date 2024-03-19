import React, { useState } from 'react';

// complete the code.  
// instructor adds an assignment to a section
// use mui Dialog with assignment fields Title and DueDate
// issue a POST using URL /assignments to add the assignment

const AssignmentAdd = (props)  => {

    document.getElementById('assignmentForm').addEventListener('submit', function(event) {
        event.preventDefault();
        // Fetch form data
        const assignmentName = document.getElementById('assignmentName').value;
        const dueDate = document.getElementById('dueDate').value;

        // Send data to the server to add the assignment
        // Example: Using fetch API
        fetch('/api/addAssignment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                assignmentName: assignmentName,
                dueDate: dueDate
            })
        }).then(response => {
            // Handle response from the server
            // Example: Display success message
            alert('Assignment added successfully!');
            // Optionally, redirect to another page or update the UI
        }).catch(error => {
            // Handle error
            console.error('Error adding assignment:', error);
        });
    });

    return (
        <>
            <h3>Not implemented</h3>
        </>                       
    )
}

export default AssignmentAdd;
