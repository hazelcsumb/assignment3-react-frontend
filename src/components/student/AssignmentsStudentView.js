import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {SERVER_URL} from "../../Constants";

// student views a list of assignments and assignment grades 
// use the URL  /assignments?studentId= &year= &semester=
// The REST api returns a list of SectionDTO objects
// Use a value of studentId=3 for now. Until login is implemented in assignment 7.

// display a table with columns  Course Id, Assignment Title, Assignment DueDate, Score

const AssignmentsStudentView = (props) => {
    const studentId = 3; // Placeholder until login is implemented
    const headers = ['Course', 'Title', 'Due Date', 'Score'];
    const [assignments, setAssignments] = useState([]);
    const [message, setMessage] = useState('');
    const [search, setSearch] = useState({ year: '', semester: '' });

    const fetchAssignments = async () => {
        const { year, semester } = search;
        if (!year.trim() || isNaN(Number(year))) {
            setMessage('Invalid year');
            return;
        }

        try {
            const response = await fetch(`${SERVER_URL}/assignments?studentId=${studentId}&year=${year}&semester=${semester}`);
            if (!response.ok) throw new Error('Failed to fetch assignments');
            const data = await response.json();
            setAssignments(data);
            setMessage('');
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearch(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <h3>Assignments</h3>
            <TextField autoFocus label="Year" name="year" value={search.year} onChange={handleChange} />
            <TextField label="Semester" name="semester" value={search.semester} onChange={handleChange} />
            <Button variant="contained" onClick={fetchAssignments}>Search</Button>
            <h5 className="Error">{message}</h5>
            {assignments.length > 0 ? (
                <table className="Center Border" style={{ marginTop: 10 }}>
                    <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {assignments.map((assignment, idx) => (
                        <tr key={idx}>
                            <td>{assignment.courseId}</td>
                            <td>{assignment.title}</td>
                            <td>{assignment.dueDate}</td>
                            <td>{assignment.score}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No assignments found.</p>
            )}
        </div>
    );
};

export default AssignmentsStudentView;