import React, { useState } from 'react';
import './RoleMasterForm.css';

const RoleMasterForm = () => {
  const [roleId, setRoleId] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    // Logic to handle role creation
    console.log('Creating role:', {
      roleId,
      description,
    });
  };

  const handleDelete = () => {
    // Logic to handle role deletion
    console.log('Deleting role');
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
      <div className="button-group">
        <button onClick={handleCreate}>Create</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default RoleMasterForm;
