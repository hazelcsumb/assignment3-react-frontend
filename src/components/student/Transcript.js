import React, {useState, useEffect} from 'react';
import {SERVER_URL} from "../../Constants";

// students gets a list of all courses taken and grades
// use the URL /transcript?studentId=
// the REST api returns a list of EnrollmentDTO objects 
// the table should have columns for 
//  Year, Semester, CourseId, SectionId, Title, Credits, Grade

const Transcript = (props) => {

    const studentId = 3; // Replace with dynamic data as appropriate
    const headers = ['Year', 'Semester', 'CourseId', 'SectionId', 'Title', 'Credits', 'Grade'];
    const [transcripts, setTranscripts] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTranscripts = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/transcripts?studentId=${studentId}`);
                if (!response.ok) throw new Error('Failed to fetch transcripts');
                const data = await response.json();
                setTranscripts(data);
            } catch (error) {
                setMessage(`Error: ${error.message}`);
            }
        };
        fetchTranscripts();
    }, [studentId]);

    return (
        <>
            <h3>Transcript</h3>
            <h5 className="Error">{message}</h5>
            <table className="Center Border">
                <thead>
                <tr>{headers.map((header, idx) => <th key={idx}>{header}</th>)}</tr>
                </thead>
                <tbody>
                {transcripts.map((record, idx) => (
                    <tr key={idx}>
                        {headers.map((header) => (
                            <td key={`${header}-${idx}`}>{record[header.toLowerCase()]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default Transcript;