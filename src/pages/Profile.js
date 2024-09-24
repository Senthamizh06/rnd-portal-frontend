
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [, setUsers] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false); // Track whether we're in edit mode


  const apiUrl = 'http://localhost:8080/api/users'; // Update with your backend URL

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(apiUrl);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreate = async () => {
    const newUser = {
      userId,
      username,
      designation,
      email,
      contactNumber,
      department: { deptcode: departmentId }, // Assuming you have a way to select or enter department ID
      specialization,
    };
    try {
      await axios.post(apiUrl, newUser);
      fetchUsers();
      clearForm();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/${id}`);
      const userData = response.data;
  
      // Populate the form with the fetched user data
      setUserId(userData.userId);
      setUsername(userData.username);
      setDesignation(userData.designation);
      setEmail(userData.email);
      setContactNumber(userData.contactNumber);
      setDepartmentId(userData.department.deptcode);
      setSpecialization(userData.specialization);
  
      setIsEditMode(true); // Switch to edit mode
    } catch (error) {
      console.error('Error fetching user:', error.response ? error.response.data : error.message);
    }
  };
  const handleUpdate = async (id) => {
    try {
      const updatedUser = {
        userId, // Assuming this is your primary key
        username,
        designation,
        email,
        contactNumber,
        department: { deptcode: departmentId }, // Assuming departmentId is used for deptcode
        specialization,
      };
  
      // Send PUT request to update user data
      await axios.put(`${apiUrl}/${id}`, updatedUser);
      
      console.log('User updated successfully:', updatedUser);
      setIsEditMode(false); // Switch back to normal mode after update
  
    } catch (error) {
      console.error('Error updating user:', error.response ? error.response.data : error.message);
    }
  };
  

  const clearForm = () => {
    setUserId('');
    setUsername('');
    setDesignation('');
    setEmail('');
    setContactNumber('');
    setDepartmentId('');
    setSpecialization('');
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: '500px' }}>
        <div className="card-header text-center bg-dark text-white">
          <h5>Profile</h5>
        </div>
        <div className="card-body d-flex align-items-center">
          <img
            src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
            width="100px"
            alt="Profile"
            className="me-3 border rounded"
          />
          <div>
            <h5>Admin</h5>
            <h6>ADMIND</h6>
            <p>Admin</p>
          </div>
        </div>
        <hr />
        <div className="p-3">
          <label htmlFor="User_ID" className="form-label">User_ID</label>
          <input id="User_ID" type="text" className="form-control" placeholder="User_ID" value={userId} onChange={(e) => setUserId(e.target.value)} />

          <label htmlFor="Username" className="form-label mt-3">Username</label>
          <input id="Username" type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

          {/* Row for Email, Contact Number, Department Code */}
          <div className="row mt-3">
            <div className="col-md-4">
              <label htmlFor="Email_ID" className="form-label">Email</label>
              <input id="Email_ID" type="text" className="form-control" placeholder="Email_ID" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label htmlFor="Contact" className="form-label">Contact Number</label>
              <input id="Contact" type="text" className="form-control" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label htmlFor="Dept_ID" className="form-label">DepartmentID</label>
              <input id="Dept_ID" type="text" className="form-control" placeholder="Dept_ID" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} />
            </div>
          </div>

          {/* Row for Specialization and Designation */}
          <div className="row mt-3">
            <div className="col-md-6">
              <label htmlFor="Specialization" className="form-label">Specialization</label>
              <input id="Specialization" type="text" className="form-control" placeholder="Specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label htmlFor="Designation" className="form-label">Designation</label>
              <input id="Designation" type="text" className="form-control" placeholder="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
            </div>
          </div>

          {/* All buttons in the same row with padding and dark blue color */}
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-dark-blue mx-2 w-25" onClick={handleCreate}>Create</button>
            <button
  className="btn btn-dark-blue mx-2 w-25"
  onClick={isEditMode ? () => handleUpdate(userId) : () => handleEdit(userId)}
>
  {isEditMode ? 'Update' : 'Edit'}
</button>

            <button className="btn btn-dark-blue mx-2 w-25" onClick={() => handleDelete(userId)}>Remove</button>
            <button className="btn btn-dark-blue mx-2 w-25" onClick={fetchUsers}>View</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom CSS for dark blue buttons
const styles = `
  .btn-dark-blue {
    background-color: #003366;
    color: white;
  }

  .btn-dark-blue:hover {
    background-color: #002244;
  }

  .mx-2 {
    margin-left: 0.5rem;
    margin-right: 1.0rem;

  }
`;

// Add custom styles to the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Profile;
