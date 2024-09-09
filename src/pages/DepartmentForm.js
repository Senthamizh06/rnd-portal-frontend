import React, { useState } from 'react';
import './DepartmentForm.css';

const DepartmentForm = () => {
  const [departmentCode, setDepartmentCode] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    // Handle the form submission logic here
    console.log({ departmentCode, departmentName, description });
  };

  const handleDelete = () => {
    // Handle the delete logic here
    setDepartmentCode('');
    setDepartmentName('');
    setDescription('');
  };
  const handleSearch = () => {
    // Implement search logic here
    console.log('Search clicked for Department Code:', departmentCode);
  };

  const handleUpdate = () => {
    // Implement update logic here
    console.log('Update clicked for Department:', { departmentCode, departmentName, description });
  };

  return (
    <div className="form-container">
      <h2>Create Department</h2>
      <div className="form-group">
        <label htmlFor="departmentCode">Department Code:</label>
        <input
          type="text"
          id="departmentCode"
          value={departmentCode}
          onChange={(e) => setDepartmentCode(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="departmentName">Department Name:</label>
        <input
          type="text"
          id="departmentName"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={handleCreate}>Create</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleUpdate}>update</button>
        
      </div>
    </div>
  );
};

export default DepartmentForm;
