import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        props.showAlert('Invalid details', 'danger');
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Successful signup
      const data = await response.json();
      console.log('Response:', data);
      props.showAlert('Account Created Successfully', 'success');

      // Redirect to login page after successful signup
      navigate('/login');
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  return (
    <div className='my-2'>
      <h2 className='mx-1'>Create an account to use myNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Enter your full name</label>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            aria-describedby='emailHelp'
            placeholder='name'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            aria-describedby='emailHelp'
            placeholder='email'
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
            placeholder='password'
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='cpassword'>Confirm Password</label>
          <input
            type='password'
            className='form-control'
            id='cpassword'
            name='cpassword'
            placeholder='type again'
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        {errorMessage && <div className='text-danger'>{errorMessage}</div>}

        <button type='submit' className='btn btn-primary my-2'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
