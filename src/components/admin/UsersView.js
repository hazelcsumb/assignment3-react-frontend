import React, {useState, useEffect} from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import UserUpdate from './UserUpdate';
import UserAdd from './UserAdd';
import Button from '@mui/material/Button';
import {baseURL} from '../../Constants';
import {api} from '../../api';

function UsersView(props) {
    const headers = ['ID', 'Name', 'Email', 'Type', '', ''];
    
    const [users, setUsers] = useState([  ]);

    const [message, setMessage] = useState('');

    const fetchUsers = async () => {
      try {
        const response = await api.get(`${baseURL}/users`);
        setUsers(response.data);
      } catch (err) {
        setMessage("network error: "+err);
      }  
    }

    useEffect( () => {
      fetchUsers();
    }, []);

    const saveUser = async (user) => {
      try {
        const response = await api.put(`${baseURL}/users`, JSON.stringify(user));
        setMessage("user saved");
        fetchUsers();
      } catch (err) {
        setMessage("network error: "+err);
      }   
    }

    const addUser = async (user) => {
      try {
        const response = await  api.post(`${baseURL}/users`, JSON.stringify(user));
        setMessage("user id added");
        fetchUsers();
      } catch (err) {
        setMessage("network error: "+err);
      }
    }

    const deleteUser = async (id) => {
      try {
        const response = await api.delete(`${baseURL}/users/${id}`);
        setMessage("User deleted");
        fetchUsers();
      } catch (err) {
        setMessage("network error: "+err);
      }
    }


    const onDelete = (e) => {
      const row_idx = e.target.parentNode.parentNode.rowIndex - 1;
      const id = users[row_idx].id;
      confirmAlert({
          title: 'Confirm to delete',
          message: 'Do you really want to delete?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => deleteUser(id)
            },
            {
              label: 'No',
            }
          ]
        });
    }

    return(
        <> 
            <h3>Users</h3>   
            <h4>{message}</h4>     
            <table className="Center" > 
                <thead>
                  <tr>
                      {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                          <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.type}</td>
                          <td><UserUpdate user={user} save={saveUser} /></td>
                          <td><Button onClick={onDelete}>Delete</Button></td>
                          </tr>
                      ))}
                </tbody>
            </table>
            <UserAdd save={addUser} />
        </>
    );
}
export default UsersView;
