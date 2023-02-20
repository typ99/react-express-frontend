import { useState } from 'react';
import './App.css';

function App() {
  const [employee, setEmployee] = useState({
    name: '',
    age: 0,
    country: '',
    position: '',
    wage: 0,
  });

  const [employeeList, setEmployeeList] = useState([]);

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    age: 0,
    country: '',
    position: '',
    wage: 0,
  });

  const addEmployee = async () => {
    setEmployeeList((prev) => [...prev, employee]);
    await fetch('http://localhost:5000/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
  };

  const getEmployees = async () => {
    const request = await fetch('http://localhost:5000/employees');
    const response = await request.json();
    setEmployeeList(response);
  };

  const updateEmployee = async (id) => {
    setEmployeeList(
      employeeList.map((employee) => {
        return employee.id === id
          ? {
              ...employee,
              wage: newEmployee.wage,
            }
          : employee;
      })
    );
    await fetch('http://localhost:5000/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newEmployee,
        id: id,
      }),
    });
  };

  const deleteEmployee = async (id) => {
    await fetch(`http://localhost:5000/delete/${id}`, {
      method: 'DELETE',
    });
    setEmployeeList(employeeList.filter((employee) => employee.id !== id));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnChangeUpdate = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='App'>
      <div className='information'>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          name='name'
          value={employee.name}
          onChange={handleOnChange}
        />
        <label htmlFor='age'>Age:</label>
        <input
          type='number'
          name='age'
          value={employee.age}
          onChange={handleOnChange}
        />
        <label htmlFor='country'>Country:</label>
        <input
          type='text'
          name='country'
          value={employee.country}
          onChange={handleOnChange}
        />
        <label htmlFor='position'>Position:</label>
        <input
          type='text'
          name='position'
          value={employee.position}
          onChange={handleOnChange}
        />
        <label htmlFor='wage'>Wage (year):</label>
        <input
          type='number'
          name='wage'
          value={employee.wage}
          onChange={handleOnChange}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <hr />
      <div className='show-employees'>
        <button onClick={getEmployees}>Show employees</button>
        {employeeList.map((employee) => {
          return (
            <div
              key={employee.id}
              className='employee'
            >
              <div>
                <h3>Name: {employee.name}</h3>
                <h3>Age: {employee.age}</h3>
                <h3>Country: {employee.country}</h3>
                <h3>Position: {employee.position}</h3>
                <h3>Wage: {employee.wage}</h3>
              </div>
              <div>
                <input
                  type='number'
                  placeholder='Wage'
                  name='wage'
                  value={newEmployee.wage}
                  onChange={handleOnChangeUpdate}
                />
                <button
                  onClick={() => {
                    updateEmployee(employee.id);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    deleteEmployee(employee.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
