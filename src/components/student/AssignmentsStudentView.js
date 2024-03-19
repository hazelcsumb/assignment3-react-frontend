import React, {useEffect, useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// student views a list of assignments and assignment grades 
// use the URL  /assignments?studentId= &year= &semester=
// The REST api returns a list of SectionDTO objects
// Use a value of studentId=3 for now. Until login is implemented in assignment 7.

// display a table with columns  Course Id, Assignment Title, Assignment DueDate, Score

const AssignmentsStudentView = (props) => {
    // State to store the liist of assignments
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        // Fetch assignments for teh student from the server when the component mounts
        const studentId = 3; // using studentId=3 for now until login is implemented
        const year = '2024'; // example year, adjust as necessary
        const semester = 'Fall'; // example semester, adjust as necessary

        // Fetch assignments for the student from the server
        fetch(`/api/student/assignments?studentId=${studentId}&year=${year}&semester=${semester}`)
            .then(response => response.json())
            .then(data => {
                // Update state with the fetched assignments
                setAssignments(data);
            })
               .catch(error => {
                console.error('Error fetching student assignments:', error);
            });

    }, []);
    // assignments_student_view.js


    return(
        <TableContainer component={Paper}>
            <Table aria-label="assignments table">
                <TableHead>
                    <TableRow>
                        <TableCell>Course ID</TableCell>
                        <TableCell>Assignment Title</TableCell>
                        <TableCell>Assignment DueDate</TableCell>
                        <TableCell>Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {assignments.map((assignment) => (
                        <TableRow key={assignment.id}>
                            <TableCell>{assignment.courseId}</TableCell>
                            <TableCell>{assignment.title}</TableCell>
                            <TableCell>{assignment.dueDate}</TableCell>
                            <TableCell>{assignment.score}</TableCell>
                        </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AssignmentsStudentView;