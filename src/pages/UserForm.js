import React, { useState } from 'react';
import './UserForm.css';
import axios from 'axios';

const UserForm = () => {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [photo, setPhoto] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [departmentCode, setDepartmentCode] = useState('');
  const [users, setUsers] = useState([]);
  const [isViewing, setIsViewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Create User
  const handleCreate = () => {
    const userData = {
      userId,
      username,
      designation,
      email,
      contactNumber,
      photo,
      specialization,
      department: { deptcode: Number(departmentCode) },
    };

    axios.post('http://localhost:8080/api/users', userData)
      .then(response => {
        alert('User created successfully');
      })
      .catch(error => {
        console.error('Error creating the user!', error);
      });
  };

  // Delete User
  const handleDelete = () => {
    if (!userId.trim()) {
      alert('Please enter a User ID to delete.');
      return;
    }

    axios.delete(`http://localhost:8080/api/users/${userId.trim()}`)
      .then(response => {
        alert('User deleted successfully!');
        setUserId('');
      })
      .catch(error => {
        alert('Error deleting user. Please try again.');
      });
  };

  // View Users
  const handleView = () => {
    axios.get('http://localhost:8080/api/users')
      .then(response => {
        setUsers(response.data);
        setIsViewing(!isViewing);
      })
      .catch(error => {
        alert('Error fetching users. Please try again.');
      });
  };

  // Fetch user details for editing
  const handleEditFetch = () => {
    if (!userId.trim()) {
      alert('Please enter a User ID to edit.');
      return;
    }

    axios.get(`http://localhost:8080/api/users/${userId.trim()}`)
      .then(response => {
        const user = response.data;
        setUsername(user.username);
        setDesignation(user.designation);
        setEmail(user.email);
        setContactNumber(user.contactNumber);
        setPhoto(user.photo);
        setSpecialization(user.specialization);
        setDepartmentCode(user.department.deptcode.toString());
        setIsEditing(true);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        alert('Error fetching user details. Please try again.');
      });
  };

  // Update User Details after Editing
  const handleEditSave = () => {
    if (!isEditing) return;

    const updatedUserData = {
      userId,
      username,
      designation,
      email,
      contactNumber,
      photo,
      specialization,
      department: { deptcode: Number(departmentCode) },
    };

    axios.put(`http://localhost:8080/api/users/${userId.trim()}`, updatedUserData)
      .then(response => {
        alert('User details updated successfully!');
        setIsEditing(false);
      })
      .catch(error => {
        console.error('Error updating user details:', error);
        alert('Error updating user details. Please try again.');
      });
  };

  return (
    <div className="form-container">
      <h2>{isEditing ? 'Edit User' : 'Manage User'}</h2>

      <div className="form-group small-input">
        <label>User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      <div className="form-group small-input">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="form-group small-input">
        <label>Designation</label>
        <input
          type="text"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
      </div>

      <div className="form-group-row">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email-input"
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

        <div className="form-group">
          <label>Department ID</label>
          <input
            type="number"
            value={departmentCode}
            onChange={(e) => setDepartmentCode(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group-row">
        <div className="form-group">
          <label>Photo URL</label>
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Specialization</label>
          <input
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />
        </div>
      </div>

      <div className="button-group">
        <button onClick={handleCreate}>Create</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleView}>
          {isViewing ? 'Hide Users' : 'View Users'}
        </button>
        <button onClick={handleEditFetch}>Edit</button>
        {isEditing && <button onClick={handleEditSave}>Save Changes</button>}
      </div>

      {isViewing && users.length > 0 && (
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Department Code</th>
                <th>Photo URL</th>
                <th>Specialization</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.username}</td>
                  <td>{user.designation}</td>
                  <td>{user.email}</td>
                  <td>{user.contactNumber}</td>
                  <td>{user.department.deptcode}</td>
                  <td>{user.photo}</td>
                  <td>{user.specialization}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserForm;
