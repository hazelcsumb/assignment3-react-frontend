import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {SERVER_URL} from "../../Constants";

// student can view schedule of sections 
// use the URL /enrollment?studentId=3&year= &semester=
// The REST api returns a list of EnrollmentDTO objects
// studentId=3 will be removed in assignment 7

// to drop a course 
// issue a DELETE with URL /enrollment/{enrollmentId}

const ScheduleView = (props) => {
    const studentId = 3; // Consider replacing with dynamic studentId in the future
    const [formData, setFormData] = useState({ year: '', semester: '' });
    const [message, setMessage] = useState('');
    const [enrollments, setEnrollments] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const fetchEnrollments = async () => {
        const { year, semester } = formData;
        if (!year.trim() || isNaN(Number(year))) {
            setMessage('Invalid year');
            setEnrollments([]);
            return;
        }

        try {
            const response = await fetch(`${SERVER_URL}/enrollments?studentId=${studentId}&year=${year}&semester=${semester}`);
            if (!response.ok) throw new Error(await response.text());
            const data = await response.json();
            setEnrollments(data);
            setMessage('');
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    const dropCourse = async (enrollmentId) => {
        try {
            const response = await fetch(`${SERVER_URL}/enrollments/${enrollmentId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error(await response.text());
            setEnrollments((currentEnrollments) => currentEnrollments.filter((enrollment) => enrollment.enrollmentId !== enrollmentId));
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="Center-Flex-Horizontally">
            <div>
                <h3>Schedule</h3>
                <h5 className="Error">{message}</h5>
                <div className="Center-Flex-Vertically">
                    <TextField autoFocus label="Year" name="year" value={formData.year} onChange={handleInputChange} />
                    <TextField label="Semester" name="semester" value={formData.semester} onChange={handleInputChange} style={{ marginLeft: 5 }} />
                    <Button variant="contained" onClick={fetchEnrollments} style={{ marginLeft: 5 }}>Query</Button><br />
                </div>
                <div className="Text-Align-Left" style={{ marginTop: 10 }}>
                    <div><b>Year:</b> {formData.year}</div>
                    <div><b>Semester:</b> {formData.semester}</div>
                </div>
                <table className="Center Border Fill-Width" style={{ marginTop: 10 }}>
                    <thead>
                    <tr>
                        {["CourseId", "SectionId", "Title", "Credits", "Grade", ""].map((header, idx) => <th key={idx}>{header}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {enrollments.map((enrollment, idx) => (
                        <tr key={idx}>
                            <td>{enrollment.courseId}</td>
                            <td>{enrollment.sectionId}</td>
                            <td>{enrollment.courseTitle}</td>
                            <td>{enrollment.credits}</td>
                            <td>{enrollment.grade}</td>
                            <td><Button onClick={() => dropCourse(enrollment.enrollmentId)}>Drop Course</Button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default ScheduleView;