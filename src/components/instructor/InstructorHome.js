import React, {useState } from 'react';
import {Link} from 'react-router-dom';

const InstructorHome = () => {

    const [term, setTerm] = useState({year:'', semester:''});

    const onChange = (event) => {
    setTerm({...term, [event.target.name]:event.target.value});
    }

    return (
        <>
            <table className="Center">
            <tbody>
            <tr>
                <td>Year:</td>
                <td><input type="text" id="year" name="year" value={term.year} onChange={onChange} /></td>
            </tr>
            <tr>
                <td>Semester:</td>
                <td><input type="text" id="semester" name="semester" value={term.semester} onChange={onChange} /></td>
            </tr>
            </tbody>
            </table>
            <Link to='/sections' state={term}>Show Sections</Link>
            <Link to='/assignmentAdd' style={{ display: 'block', marginTop: '20px' }}>Add Assignment</Link>
        </>
    )
};

export default InstructorHome;
