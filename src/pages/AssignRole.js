import React, { useState } from 'react';
import axios from 'axios';
import './AssignRole.css';

const AssignRole = () => {
  const [roleId, setRoleId] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  // Check if user already has a role
  const checkUserRole = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/check-user-role?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error checking user role:', error);
      return null;
    }
  };

  // Create a new role assignment
  const handleCreate = async () => {
    if (!roleId || !userId) {
      setMessage('Please provide both Role ID and User ID');
      return;
    }

    try {
      const userRole = await checkUserRole();
      if (userRole) {
        setMessage(`User ${userId} already has a role assigned: ${userRole.roleId}`);
        return;
      }

      const response = await axios.post('http://localhost:8080/api/assign-role', { roleId, userId });
      setMessage('Role successfully assigned');
      console.log('Role assigned:', response.data);
    } catch (error) {
      setMessage('Error creating role assignment');
      console.error('Error creating role assignment:', error);
    }
  };

  // Update an existing role assignment
  const handleUpdate = async () => {
    if (!roleId || !userId) {
      setMessage('Please provide both Role ID and User ID');
      return;
    }

    try {
      const response = await axios.put('http://localhost:8080/api/assign-role', { roleId, userId });
      setMessage('Role assignment updated');
      console.log('Role assignment updated:', response.data);
    } catch (error) {
      setMessage('Error updating role assignment');
      console.error('Error updating role assignment:', error);
    }
  };

  // Retrieve role details on role ID input
  const handleRetrieveRoleDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/assign-role?roleId=${roleId}`);
      if (response.data) {
        setUserId(response.data.userId);  // Autofill the userId for the role
        setMessage(`Role ${roleId} is assigned to user ${response.data.userId}`);
      } else {
        setMessage('No assignment found for this role ID');
      }
    } catch (error) {
      setMessage('Error retrieving role assignment');
      console.error('Error retrieving role assignment:', error);
    }
  };

  // Delete a role assignment
  // Delete a role assignment
const handleDelete = async () => {
  if (!roleId || !userId) {
    setMessage('Please provide both Role ID and User ID');
    return;
  }

  try {
    await axios.delete(`http://localhost:8080/api/assign-role`, { params: { userId, roleId } });
    setMessage('Role assignment deleted');
  } catch (error) {
    setMessage('Error deleting role assignment');
    console.error('Error deleting role assignment:', error);
  }
};

  

  return (
    <div className="form-container">
      <h2>Assign Role</h2>
      <div className="form-group">
        <label>Role ID</label>
        <input
          type="text"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
          onBlur={handleRetrieveRoleDetails}  // Fetch role details when input loses focus
        />
      </div>
      <div className="form-group">
        <label>User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      {message && <p>{message}</p>}  {/* Display messages */}
      <div className="button-group">
        <button onClick={handleCreate}>Create</button>
        <button onClick={handleUpdate}>Edit</button>
        <button onClick={handleDelete}>Remove</button>
      </div>
    </div>
  );
};

export default AssignRole;
