function Validation(values) {
    const errors = {};
  
    // Name validation
    if (!values.name || values.name.trim() === "") {
      errors.name = "Username should not be empty!!";
    } else if (values.name.length < 5) {
      errors.name = "Username should be at least 5 characters long!!";
    }
  
    // Email validation
    if (!values.email || values.email.trim() === "") {
      errors.email = "Email should not be empty!!";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid!!";
    }
  
    // Password validation
    if (!values.password || values.password.trim() === "") {
      errors.password = "Password should not be empty!!";
    } else if (values.password.length < 6) {
      errors.password = "Password should be at least 6 characters long!!";
    }
  
    return errors;
  }
  
  export default Validation;