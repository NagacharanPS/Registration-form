function Validation(values) {
    const errors = {};
  
    // Email validation
    if (!values.email || values.email.trim() === "") {
      errors.email = "Email should not be empty!!";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid!!";
    }
  
    // Password validation
    if (!values.password || values.password.trim() === "") {
      errors.password = "Password should not be empty!!";
    }
  
    return errors;
  }
  
  export default Validation;