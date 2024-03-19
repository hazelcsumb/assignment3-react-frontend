import React, { useState, useEffect } from 'react';

// instructor enters students' grades for an assignment
// fetch the grades using the URL /assignment/{id}/grades
// REST api returns a list of GradeDTO objects
// display the list as a table with columns 'gradeId', 'student name', 'student email', 'score' 
// score column is an input field 
//  <input type="text" name="score" value={g.score} onChange={onChange} />
 

const AssignmentGrade = (props) => {

    // State to store the list of GradeDTO objects fetched from server
    const [grades, setGrades] = useState([]);

    // Function to handle score changes for each grade input field
    const onChange = (index, newScore) => {
        const updatedGrades = grades.map((grade, idx) => {
            if (idx === index) {
                return {...grade, score: newScore }; //update the score of the modified grade
            }
            return grade; // return unmodified grades as is
        });
        setGrades(updatedGrades); // update the state with the new grades array
    };

    // Fetch grades from the server
    useEffect(() => {
        const fetchGrades = async () => {
            try{
                // URL
                const response = await fetch(`/api/assignment/${props.assignmentId}/grades`);
                if (!response.ok) {
                    throw new Error('Failed to fetch grades');
                }
                const data = await response.json(); // parse the JSON response
                setGrades(data); // set fetched grades data to state
            } catch(error) {
                console.error('Error fetching grades ', error);
            }
        };

        fetchGrades();
    }, [props.assignmentId]); // dependency array re-fetch if assignmentId changes


    // Display grades as a table
    return(
        <div>
            <h3>Assignment Grades</h3>
            <table>
                <thead>
                <tr>
                    <th>Grade ID</th>
                    <th>Student Name</th>
                    <th>Student Email</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {
                    grades.map((grade,index) => (
                    <tr key = {grade.gradeId}>
                        <td>{grade.gradeId}</td>
                        <td>{grade.studentName}</td>
                        <td>{grade.studentEmail}</td>
                        <td>
                            <input
                                type = "text"
                                name = "score"
                                value = {grade.score}
                                onChange = {(e) => onChange(index, e.target.value)}
                            />
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssignmentGrade;