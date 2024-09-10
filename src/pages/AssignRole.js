import React, { useState } from 'react';
import './AssignRole.css';

const AssignRole = () => {
  const [roleId, setRoleId] = useState('');
  const [userId, setDescription] = useState('');

  const handleCreate = () => {
    // Logic to handle role creation
    console.log('Creating role:', {
      roleId,
      userId,
    });
  };

  const handleDelete = () => {
    // Logic to handle role deletion
    console.log('Deleting role');
  };
  const handleUpdate = () => {
    console.log('Updating research lab');
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
        />
      </div>
      <div className="form-group">
        <label>User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="button-group">
        <button onClick={handleCreate}>Create</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleUpdate}>Update</button>

      </div>
    </div>
  );
};

export default AssignRole;
