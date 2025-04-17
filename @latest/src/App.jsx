import React, { useState, useEffect } from 'react';


const App = () => {
  const [email, setemail] = useState('');
  const[contact,setcontact] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [register,setregister] =  useState(false);
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
  const handlelogout =() =>
  {
    setLoggedIn(false);
    localStorage.removeItem('currentUser');
  }

  const handlenewuser =() =>
  {
     
      setregister(true);
     

  }
   
  
  
  useEffect(() => {
    if (loggedIn) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const saved = JSON.parse(localStorage.getItem(`employees_${currentUser.email}`)) || [];
      setEmployees(saved);
    }
  }, [loggedIn]);
  

  const handleregisteruser = () => {
    if (!contact) {
      alert("Enter the phone number");
    } else if (!email) {
      alert("Enter the email ID");
    } else if (!password) {
      alert("Enter the password");
    } else {
      const newUser = {
        email,
        password,
        contact
      };
  
   
      const users = JSON.parse(localStorage.getItem('users')) || [];
  
      const userExists = users.some(user => user.email === email );
      const userexists = users.some(user => user.password===password)
      if(userexists)
      {
        alert("set some other paswword");
      }
      if (userExists) {
        alert("User already registered with this email.");
        return;
      }
  
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
  
      alert("Registration successful!");
  
      
      setemail('');
      setcontact('');
      setPassword('');
      setregister(false); 
    }
  };
  

const againlogin =() =>{

  setregister(false);
}


  const handlelogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
  const validUser = users.find(user => user.email === email && user.password === password);

  if (validUser) {
    setLoggedIn(true);
    localStorage.setItem('currentUser', JSON.stringify(validUser));
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
  
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userKey = `employees_${currentUser.email}`;
    const userEmployees = JSON.parse(localStorage.getItem(userKey)) || [];
  
    const newEmployee = { name, id, salary };
    let updated;
  
    if (editIndex === null) {
      updated = [...userEmployees, newEmployee];
    } else {
      userEmployees[editIndex] = newEmployee;
      updated = [...userEmployees];
      setEditIndex(null);
    }
  
    localStorage.setItem(userKey, JSON.stringify(updated));
    setEmployees(updated);
    setEmployee({ name: '', id: '', salary: '' });
  };
  
  
  const handleEdit = (index) => {
    setEmployee(employees[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userKey = `employees_${currentUser.email}`;
  
    const updated = employees.filter((_, i) => i !== index);
    localStorage.setItem(userKey, JSON.stringify(updated));
    setEmployees(updated);
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


  if(register)
  {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', height: '100vh', width: '100vw'
      }}>
        <h1>Register</h1>
        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          <h3>Email</h3>
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            style={{ padding: '10px', width: '20vw', borderRadius: '10px' }}
            type="text"
          />
          <h3>Contact Details</h3>
          <input
            value={contact}
            onChange={(e) => setcontact(e.target.value)}
            style={{ padding: '10px', width: '20vw', borderRadius: '10px' }}
            type="number"
          />
          <h3>Set Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', width: '20vw', borderRadius: '10px' }}
            type="password"
          />
          <button
            onClick={handleregisteruser}
            style={{ padding: '10px', borderRadius: '10px', marginTop: '10px' }}
          >
            register
          </button>
        </div>
        <div style={{display:'flex',gap:'20px',alignContent:'center',alignItems:'center',width:'23vw',height:'10vh'}}>
      <h3>have an account?</h3>
      <button
       onClick={againlogin}
      >click here</button>
    </div>
      </div>
    )
  }

  if (loggedIn) {
    return (
      <><div style={{display:'flex',alignItems:'end',justifyContent:"end",width:"100vw",backgroundColor: '#f0f2f5',}}><button onClick={handlelogout}
       style={{backgroundColor:'rgb(26, 188, 156)',color:'whitesmoke'}}>logout</button></div>
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
      </>
    );
  }

  return (
    <>
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', height: '100vh', width: '100vw'
    }}>
      <h1>Login</h1>
      <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <h3>Username</h3>
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
      <div style={{display:'flex',gap:'20px',alignContent:'center',alignItems:'center',width:'23vw',height:'10vh'}}>
    <h3>don't have an account?</h3>
    <button
     onClick={handlenewuser}
    >click here</button>
  </div>
    </div>
    
  </>
  );
};

export default App;
