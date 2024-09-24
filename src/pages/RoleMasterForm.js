import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RoleMasterForm.css';

const RoleMasterForm = () => {
  const [roleId, setRoleId] = useState('');
  const [description, setDescription] = useState('');
  const [authLevel, setAuthLevel] = useState('');
  const [roles, setRoles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showRoles, setShowRoles] = useState(false); // New state for toggling role display

  useEffect(() => {
    // Load roles on component mount, but you can remove this if you want to load only on button click
    // handleView();
  }, []);

  const handleCreate = async () => {
    const payload = {
      roleId: Number(roleId),
      description,
      authLevel,
    };

    try {
      await axios.post('http://localhost:8080/api/rolemaster', payload);
      alert("Role created successfully!");
      handleView(); // Refresh roles
      resetForm();
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/rolemaster/${roleId}`, {
        description,
        authLevel,
      });
      alert("Role updated successfully!");
      handleView(); // Refresh roles
      resetForm();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/rolemaster/${roleId}`);
      const role = response.data;
      setDescription(role.description);
      setAuthLevel(role.authLevel);
      setIsEditing(true); // Set editing mode
    } catch (error) {
      console.error('Error fetching role for edit:', error);
    }
  };

  const handleDelete = async () => {
    if (!roleId) {
      alert("Please enter a Role ID to delete.");
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/api/rolemaster/${roleId}`);
      alert("Role deleted successfully!");
      handleView(); // Refresh roles
      resetForm();
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const handleView = async () => {
    if (!showRoles) { // Fetch roles only if they are not currently shown
      try {
        const response = await axios.get('http://localhost:8080/api/rolemaster');
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    }
    setShowRoles((prev) => !prev); // Toggle visibility of roles
  };

  const resetForm = () => {
    setRoleId('');
    setDescription('');
    setAuthLevel('');
    setIsEditing(false);
  };

  return (
    <div className="form-container">
      <h2>Role Master</h2>
      <div className="form-group">
        <label>Role ID</label>
        <input
          type="text"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Authorization Level</label>
        <select 
          value={authLevel} 
          onChange={(e) => setAuthLevel(e.target.value)}
        >
          <option value="">Select Level</option>
          <option value="A">Admin</option>
          <option value="B">Editor</option>
          <option value="C">Viewer</option>
          <option value="D">Viewer1</option>
        </select>
      </div>
      <div className="button-group">
        <button onClick={handleCreate}>Create</button>
        <button onClick={isEditing ? handleUpdate : handleEdit}>
          {isEditing ? 'Update' : 'Edit'}
        </button>
        <button onClick={handleDelete}>Remove</button>
        <button onClick={handleView}>{showRoles ? 'Hide' : 'View'}</button> {/* Toggle button text */}
      </div>

      {showRoles && ( // Conditional rendering of the roles list
        <div className="role-list-container">
          <h3>Roles</h3>
          <div className="role-list">
            {roles.length === 0 ? (
              <p>No roles to display</p>
            ) : (
              roles.map((role) => (
                <div key={role.roleId} className="role-item">
                  <p><strong>Role ID:</strong> {role.roleId}</p>
                  <p><strong>Description:</strong> {role.description}</p>
                  <p><strong>Authorization Level:</strong> {role.authLevel}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleMasterForm;
