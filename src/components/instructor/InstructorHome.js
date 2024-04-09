import React, {useState } from 'react';
import {Link} from 'react-router-dom';

const InstructorHome = () => {

    const [term, setTerm] = useState({year:'', semester:''});

    const onChange = (event) => {
    setTerm({...term, [event.target.name]:event.target.value});
    }

    return (
        <div style={{marginTop: 20}}>
            <Link to='/sections' state={term}>Show Sections</Link>
        </div>
    )
};

export default InstructorHome;
