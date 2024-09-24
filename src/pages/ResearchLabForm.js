import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ResearchLabForm.css';

const ResearchLabForm = () => {
    const [labId, setLabId] = useState('');
    const [labName, setLabName] = useState('');
    const [labDescription, setLabDescription] = useState('');
    const [labHead, setLabHead] = useState('');
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    // Fetch users for Lab Head dropdown
    useEffect(() => {
      const fetchUsers = async () => {
          try {
              const response = await axios.get('http://localhost:8080/api/users');
              console.log('Fetched users:', response.data); // Log the fetched users
              setUsers(response.data);
          } catch (error) {
              console.error('Error fetching users:', error);
          }
      };
  
      fetchUsers();
  }, []);
  

    // Handle creating a research lab
    const handleCreate = async () => {
        const researchLabData = {
            labName,
            labId,
            labDesc: labDescription,
            labHead: { userId: labHead },  // Assuming labHead is the user ID
        };
        try {
            const response = await axios.post('http://localhost:8080/api/researchlabs', researchLabData);
            console.log('Research lab created:', response.data);
            setMessage('Research lab created successfully!');
        } catch (error) {
            
            
            setMessage('Error creating research lab.');
        }
    };

    const handleDelete = async () => {
      try {
          const response = await axios.delete(`http://localhost:8080/api/researchlabs/${labId}`);
          console.log('Research lab deleted successfully:', response.data); // Log the response data
          setMessage('Research lab deleted successfully!');
      } catch (error) {
          
          setMessage('Error deleting research lab.');
      }
  };
  

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/researchlabs/${labId}`);
            setLabName(response.data.labName);
            setLabDescription(response.data.labDesc);
            setLabHead(response.data.labHead.userId); // Set lab head from response
            setMessage('Research lab found!');
        } catch (error) {
            
            setMessage('Error searching research lab.');
        }
    };

    const handleUpdate = async () => {
      const updatedLabData = {
          labName,
          labId,
          labDesc: labDescription,
          labHead: { userId: labHead },
      };
      try {
          const response = await axios.put(`http://localhost:8080/api/researchlabs/${labId}`, updatedLabData);
          console.log('Research lab updated successfully:', response.data); // Log the response data
          setMessage('Research lab updated successfully!');
      } catch (error) {
          
          setMessage('Error updating research lab.');
      }
  };
  
    return (
        <div className="form-container">
            <h2>Research Lab</h2>
            {message && <p>{message}</p>}
            <div className="form-group">
                <label>Research Lab Code</label>
                <input
                    type="text"
                    placeholder="deptid+r+count"
                    value={labId}
                    onChange={(e) => setLabId(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Research Lab Name</label>
                <input
                    type="text"
                    value={labName}
                    onChange={(e) => setLabName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Research Lab Description</label>
                <input
                    type="text"
                    value={labDescription}
                    onChange={(e) => setLabDescription(e.target.value)}
                />
            </div>
            <div className='form-group'>
                <label>Research Lab Head</label>
                <select value={labHead} onChange={(e) => setLabHead(e.target.value)}>
                    <option value="">Select Lab Head</option>
                    {users.map(user => (
                        <option key={user.userId} value={user.userId}>
                            {user.username}
                        </option>
                    ))}
                </select>
            </div>
            <div className="button-group">
                <button onClick={handleCreate}>Create</button>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default ResearchLabForm;
