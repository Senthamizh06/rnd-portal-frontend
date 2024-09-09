import React, { useState } from 'react';
import './UserForm.css';

const UserForm = () => {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [userGroup, setUserGroup] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const userGroups = ['A', 'B', 'C', 'D', 'E', 'F'];
  const designations = ['E', 'F', 'G', 'H', 'I', 'J'];

  const handleCreate = () => {
    // Logic to handle user creation
    console.log('Creating user:', {
      userId,
      username,
      userGroup,
      designation,
      email,
      contactNumber,
    });
  };

  const handleDelete = () => {
    // Logic to handle user deletion
    console.log('Deleting user');
  };

  return (
    <div className="form-container">
      <h2>Create User</h2>
      <div className="form-group">
        <label>User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>User Group</label>
        <select
          value={userGroup}
          onChange={(e) => setUserGroup(e.target.value)}
        >
          <option value="">Select a group</option>
          {userGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Designation</label>
        <select
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        >
          <option value="">Select a designation</option>
          {designations.map((des) => (
            <option key={des} value={des}>
              {des}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Contact Number</label>
        <input
          type="text"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
      </div>
      <div className="button-group">
        <button onClick={handleCreate}>Create</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default UserForm;
