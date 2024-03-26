import React, {useState, useEffect} from 'react';
import { confirmAlert } from 'react-confirm-alert';
import Button from '@mui/material/Button';
import {SERVER_URL} from "../../Constants";

// students displays a list of open sections for a 
// use the URL /sections/open
// the REST api returns a list of SectionDTO objects

// the student can select a section and enroll
// issue a POST with the URL /enrollments?secNo= &studentId=3
// studentId=3 will be removed in assignment 7.

const CourseEnroll = (props) => {
    const studentId = 3; // Placeholder until login is implemented
    const headers = [
        'Semester',
        'Section No',
        'Course Id',
        'Section Id',
        'Room',
        'Times',
        'Instructor',
        'Instructor Email',
        ''
    ];

    // State for open courses and messages
    const [openCourses, setOpenCourses] = useState([]);
    const [message, setMessage] = useState('');

    // Fetch open courses from the server
    const fetchOpenCourses = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/sections/open`);
            if (!response.ok) throw new Error(await response.text());
            const data = await response.json();
            setOpenCourses(data);
            setMessage('');
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchOpenCourses();
    }, []);

    // Function to display confirmation dialog and enroll in a course
    const handleEnrollment = async (secNo) => {
        const enroll = async () => {
            try {
                const response = await fetch(
                    `${SERVER_URL}/enrollments/sections/${secNo}?studentId=${studentId}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
                if (!response.ok) throw new Error(await response.text());
                setMessage(`You have enrolled in Section ${secNo}!`);
                await fetchOpenCourses(); // Refresh open courses list
            } catch (error) {
                setMessage(`Enrollment error: ${error.message}`);
            }
        };

        confirmAlert({
            title: 'Confirm Enrollment',
            message: `Are you sure you want to enroll in Section ${secNo}?`,
            buttons: [
                {
                    label: 'Enroll',
                    onClick: enroll
                },
                {
                    label: 'Cancel'
                }
            ]
        });
    };

    return (
        <div>
            <h3>Open Courses</h3>
            {openCourses.length ? (
                <table className="Center Border" style={{ marginTop: 10 }}>
                    <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {openCourses.map((course) => (
                        <tr key={course.secNo}>
                            {Object.values(course).map((value, idx) => (
                                <td key={idx}>{value}</td>
                            ))}
                            <td>
                                <Button variant="contained" onClick={() => handleEnrollment(course.secNo)}>Enroll</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No open courses available.</p>
            )}
            <h4>{message}</h4>
        </div>
    );
};

export default CourseEnroll;