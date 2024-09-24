import React, { useState, useEffect, useCallback } from 'react';
import './DepartmentForm.css';

const DepartmentForm = () => {
  const [departmentCode, setDepartmentCode] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [description, setDescription] = useState('');
  const [departments, setDepartments] = useState([]); 
  const [isViewing, setIsViewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Define handleView with useCallback to memoize it
  const handleView = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/departments');
      if (response.ok) {
        const data = await response.json();
        setDepartments(data);
      } else {
        alert('Failed to fetch departments. Please try again.');
      }
    } catch (error) {
      alert('An unexpected error occurred. Please try again.');
    }
    setIsViewing(prev => !prev); // Toggle the viewing state
  }, []); // No dependencies, so the function only changes if explicitly modified

  useEffect(() => {
    // Call handleView when the component mounts
    handleView();
  }, [handleView]); // Add 'handleView' to the dependency array

  const handleCreate = async () => {
    const departmentData = {
      deptcode: departmentCode,
      deptname: departmentName,
      deptdesc: description,
    };
  
    try {
      const response = await fetch('http://localhost:8080/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(departmentData),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(`Department "${data.deptname}" has been successfully added!`);
        setDepartmentCode('');
        setDepartmentName('');
        setDescription('');
      } else {
        alert('Error creating department. Please try again.');
      }
    } catch (error) {
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (!departmentCode) {
      alert('Please enter a Department Code to delete.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/departments/${departmentCode}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert(`Department with code "${departmentCode}" has been successfully deleted!`);
        setDepartmentCode('');
        setDepartmentName('');
        setDescription('');
      } else {
        alert('Failed to delete department. Please try again.');
      }
    } catch (error) {
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const handleEdit = async () => {
    if (!departmentCode) {
      alert('Please enter a Department Code to edit.');
      return;
    }
  
    const updatedDepartmentData = {
      deptcode: departmentCode,
      deptname: departmentName,
      deptdesc: description,
    };
  
    try {
      const response = await fetch(`http://localhost:8080/departments/${departmentCode}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDepartmentData),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(`Department "${data.deptname}" has been successfully updated!`);
        setDepartmentCode('');
        setDepartmentName('');
        setDescription('');
        setIsEditing(false);
      } else {
        alert('Error updating department. Please try again.');
      }
    } catch (error) {
      alert('An unexpected error occurred. Please try again.');
    }
  };
  
  const handleSelectEdit = (department) => {
    setDepartmentCode(department.deptcode);
    setDepartmentName(department.deptname);
    setDescription(department.deptdesc);
    setIsEditing(true);
  };

  return (
    <div className="form-container">
      <h2>Manage Department</h2>
      <div className="form-group">
        <label htmlFor="departmentCode">Department ID:</label>
        <input
          type="text"
          id="departmentCode"
          value={departmentCode}
          onChange={(e) => setDepartmentCode(e.target.value)}
          disabled={isEditing} // Disable editing department code when updating
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
        <button onClick={isEditing ? handleEdit : handleCreate}>
          {isEditing ? 'Update' : 'Create'}
        </button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleView}>
          {isViewing ? 'Hide Departments' : 'View Departments'}
        </button>
      </div>
      {departments.length > 0 && isViewing && (
        <div className="department-table">
          <table>
            <thead>
              <tr>
                <th>Department Code</th>
                <th>Department Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr key={department.deptcode}>
                  <td>{department.deptcode}</td>
                  <td>{department.deptname}</td>
                  <td>{department.deptdesc}</td>
                  <td>
                    <button onClick={() => handleSelectEdit(department)}>E</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DepartmentForm;
