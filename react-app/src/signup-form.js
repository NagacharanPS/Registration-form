import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Validation from './signup-validation';

function SignUp() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios.post('http://localhost:3003/signup', values)
        .then((res) => {
          console.log('Registered Successfully');
          toast.success('You Registered Successfully!', {
            position: 'top-center',
          });
        })
        .catch((err) => {
          if(err.response && err.response.status === 409){
            toast.error(err.response.data.message, {
              position:'top-center'
            })
          }
          else{
            toast.error("Registration failed please try again", {
              position: 'top-center'
            })
          }
        });
    } else {
      // There are validation errors, do not make the API call
      toast.error('Please fix the errors in the form.', {
        position: 'top-center',
      });
    }
  };

  return (
    <div className='form-container-wrapper'>
      <div className='form-container'>
        <div className='h1-container'>
          <h1>Sign Up</h1>
        </div>

        <form onSubmit={handleSubmit} data-netlify="true" name="registration-form"  >
          
          <input type="hidden" name="form-name" value="registration-form"/>

          <div className='login-email-container'>
            <label htmlFor='name'>
              <strong>Username</strong>
            </label>
            <input
              type='text'
              placeholder='Enter Your Name'
              name='name'
              onChange={handleChange}
            />
            {errors.name && <span className='error'>{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className='login-email-container'>
            <label htmlFor='email'>
              <strong>Email</strong>
            </label>
            <input
              type='email'
              placeholder='Enter Email'
              name='email'
              onChange={handleChange}
            />
            {errors.email && <span className='error'>{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div className='login-password-container'>
            <label htmlFor='password'>
              <strong>Password</strong>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              onChange={handleChange}
            />
            {errors.password && <span className='error'>{errors.password}</span>}
          </div>

          {/* Submit Button */}
          <div className='btn-container'>
            <button type='submit' className='btn signup-btn'>
              <strong>Sign Up</strong>
            </button>
          </div>

          {/* Login Link */}
          <div className='p-container'>
            <p>
              Already have an account? <Link to='/' className='login'>Log in</Link>
            </p>
          </div>
        </form>
      </div>

      
    </div>
  );
}

export default SignUp;