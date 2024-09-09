import React, { useState } from 'react';
import './ResearchLabForm.css';

const ResearchLabForm = () => {
  const [labName, setLabName] = useState('');
  const [labCode, setLabCode] = useState('');
  const [labDescription, setLabDescription] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const departments = [
    'CSE', 'ECE', 'CSD', 'MCT', 'IT', 'MECH',
    'FT', 'EEE', 'BME', 'AIDS', 'AIML'
  ];

  const handleCreate = () => {
    console.log('Creating research lab:', {
      labName,
      labCode,
      labDescription,
      selectedDepartment,
    });
  };

  const handleDelete = () => {
    console.log('Deleting research lab');
  };

  const handleSearch = () => {
    console.log('Searching research lab');
  };

  const handleUpdate = () => {
    console.log('Updating research lab');
  };

  return (
    <div className="form-container">
      <h2>Research Lab</h2>
      <div className="form-group">
        <label>Research Lab Name</label>
        <input
          type="text"
          value={labName}
          onChange={(e) => setLabName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Research Lab Code</label>
        <input
          type="text"
          placeholder="deptid+r+count"
          value={labCode}
          onChange={(e) => setLabCode(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Department</label>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">Select a department</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Research Lab Description</label>
        <input
          type="text"
          value={labDescription}
          onChange={(e) => setLabDescription(e.target.value)}
        />
      </div>
      
      <div className="button-group">
        <button onClick={handleCreate}>Create</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default ResearchLabForm;
