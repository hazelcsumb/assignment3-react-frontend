import React, {useState, useEffect} from 'react';

// instructor views a list of sections they are teaching 
// use the URL /sections?email=dwisneski@csumb.edu&year= &semester=
// the email= will be removed in assignment 7 login security
// The REST api returns a list of SectionDTO objects
// The table of sections contains columns
//   section no, course id, section id, building, room, times and links to assignments and enrollments
// hint:  
// <Link to="/enrollments" state={section}>View Enrollments</Link>
// <Link to="/assignments" state={section}>View Assignments</Link>

const InstructorSectionsView = (props) => {

    // instructor_sections_view.js
// Fetch sections/groups from the server
    fetch('/api/sections')
        .then(response => response.json())
        .then(sections => {
            // Process sections and display them in the DOM
            const sectionList = document.getElementById('sectionList');
            sections.forEach(section => {
                const listItem = document.createElement('li');
                listItem.textContent = section.name;
                sectionList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching sections:', error);
        });


    return(
        <> 
           <h3>Not implemented</h3>
        </>
    );
}

export default InstructorSectionsView;

