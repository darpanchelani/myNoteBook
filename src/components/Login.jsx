import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });

      if (!response.ok) {
        props.showAlert(' Invalid credentials', 'danger');
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      localStorage.setItem('token', data.authToken);
      props.showAlert(' Logged In Successfully', 'success');
      navigate('/');
      console.log('Response:', data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='my-2'>
      <h2 className='mx-1'>Login to continue myNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            aria-describedby='emailHelp'
            placeholder='Enter email'
            value={credentials.email}
            onChange={onChange}
          />
          <small id='emailHelp' className='form-text text-muted'>
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            placeholder='Password'
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type='submit' className='btn btn-primary my-2'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
