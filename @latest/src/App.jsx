import React, { useState } from 'react';

const App = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const [employee, setEmployee] = useState({ name: '', id: '', salary: '' });
  const [employees, setEmployees] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
   
  function buttontext(editIndex) {
    if (editIndex === null) {
      return 'Register';
    } else {
      return 'Update';
    }
  }
  




  const handlelogin = () => {
    if (email === 'prajwal@gmail.com' && password === '123456') {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleregister = () => {
    const { name, id, salary } = employee;
    if (!name || !id || !salary) {
      alert('Enter all fields');
      return;
    }
  
    const newEmployee = { name, id, salary };
  
    if (editIndex === null) {
     
      setEmployees([...employees, newEmployee]);
    } else {
      
      const updated = [...employees];
      updated[editIndex] = newEmployee;
      setEmployees(updated);
      setEditIndex(null);
    }
  
    
    setEmployee({ name: '', id: '', salary: '' });
  };
  
  const handleEdit = (index) => {
    setEmployee(employees[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    for (let i = 0; i < employees.length; i++) {
      if (i !== index) {

        filtered = [...filtered, employees[i]];
      } else {
       
      }
    
  
    }
  
    setEmployees(filtered); 
    setEditIndex(null);     
  };
  



  const display = () => (
    <ul>
      {employees.map((emp, index) => (
        <li key={index} style={{ marginBottom: '10px' ,display:'flex',gap:"20px",flexDirection:'ROW'}}>
          <strong>Name:</strong> {emp.name} | <strong>ID:</strong> {emp.id} | <strong>Salary:</strong> {emp.salary}
          <button 
         onClick={() => handleDelete(index)}
         style={{backgroundColor:'red',}}>delete</button>
           <button 
         onClick={() => handleEdit(index)}
         style={{backgroundColor:'greenyellow',}}>EDIT</button>
           </li>
      ))}
      
    </ul>

    
  );

  if (loggedIn) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f0f2f5',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
      }}>
        <div style={{
          backgroundColor: '#2c3e50',
          padding: '30px 40px',
          borderRadius: "20px",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
          boxShadow: '0px 0px 20px rgba(0,0,0,0.2)',
          color: 'white',
          width: '400px'
        }}>
          <h2 style={{ margin: 0, fontSize: '26px', fontWeight: '600' }}>Employee Registration</h2>

          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <label style={{ marginBottom: '5px', fontSize: '16px' }}>Employee Name</label>
            <input
              value={employee.name}
              onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
              type="text"
              style={{
                borderRadius: '8px',
                border: '1px solid #ccc',
                padding: '10px',
                fontSize: '14px',
                outline: 'none',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <label style={{ marginBottom: '5px', fontSize: '16px' }}> Employee ID</label>
            <input
              value={employee.id}
              onChange={(e) => setEmployee({ ...employee, id: e.target.value })}
              type="text"
              style={{
                borderRadius: '8px',
                border: '1px solid #ccc',
                padding: '10px',
                fontSize: '14px',
                outline: 'none',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <label style={{ marginBottom: '5px', fontSize: '16px' }}>Employee Salary</label>
            <input
              value={employee.salary}
              onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
              type="text"
              style={{
                borderRadius: '8px',
                border: '1px solid #ccc',
                padding: '10px',
                fontSize: '14px',
                outline: 'none',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          <button
            onClick={handleregister}
            style={{
              backgroundColor: '#1abc9c',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '10px',
              color: 'white',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '10px',
              transition: 'background-color 0.3s ease'
            }}
          >
            {buttontext(editIndex)}
          </button>
        </div>

        <div style={{ marginTop: '30px',display:'flex',}}>
          
          <div style={{display:'flex',flexDirection:'row',gap:'20px'}}>
          {display()}
      
         </div>
        </div>
    
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', height: '100vh', width: '100vw'
    }}>
      <h1>Login</h1>
      <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <h3>Email</h3>
        <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          style={{ padding: '10px', width: '20vw', borderRadius: '10px' }}
          type="text"
        />
        <h3>Password</h3>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', width: '20vw', borderRadius: '10px' }}
          type="password"
        />
        <button
          onClick={handlelogin}
          style={{ padding: '10px', borderRadius: '10px', marginTop: '10px' }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default App;
