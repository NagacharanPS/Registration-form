import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Validation from './login-validation';
function Login() {

    const [values, setValues] = useState({
         
        email: "",
        password: ""

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
      
      axios
        .post('http://localhost:3003/login', values)
        .then((res) => {
            console.log('Login Successfull!');
            toast.success('Login Successfull!', {
            position: 'top-center',
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error('Please Enter a Valid Email or Password', {
            position: 'top-center',
          });
        });
    } else {
      // Display validation errors
      toast.error('Please fix the errors in the form.', {
        position: 'top-center',
      });
    }
  };

    return(
       
        <div className='form-container-wrapper'>
        <div className='form-container '>

            <div className='h1-container'>
                <h1>Sign In</h1>
            </div>
            <form onSubmit={handleSubmit}>

                <div className='login-email-container'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' name='email' placeholder='Enter Email' onChange={handleChange} />
                    {errors.email && <span className='error'>{errors.email}</span>}
                </div>

                <div className='login-password-container'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type='password' name='password' placeholder='Enter Password' onChange={handleChange} />
                        {errors.password && <span className='error'>{errors.password}</span>}
                </div>

                
                <div className='btn-container'>
                    <button type='submit' className='btn'><strong>Login</strong></button>
                </div>
              <div className='link-container'>
                  
              <Link to='/signup' className='link' id='create-btn'><strong>Create Account</strong></Link>
              </div>
            </form>
        </div>
        </div>
    )
    
}


export default Login;