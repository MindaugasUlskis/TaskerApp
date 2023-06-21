// validates and checks if email and password imputs are following the rules.

var validator = require('validator');


interface LoginInput {
    email: string;
    password: string;
  }
  
  interface LoginErrors {
    email?: string;
    password?: string;
  }

  export const validateInputs = ({ email, password }: LoginInput): LoginErrors => {
    let errors: LoginErrors = {};
  
    // Validate email
    if (!email) {
      errors.email = 'Email is required';
    } else if (!validator.isEmail(email)) {
      errors.email = 'Invalid email format';
    }
  
    // Validate password
    if (!password) {
      errors.password = 'Password is required';
    } else if (!validator.isLength(password, { min: 8 })) {
      errors.password = 'Password must be at least 8 characters';
    }
  
    return errors;
  };