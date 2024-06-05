const userSignUpValidationSchema = {
  trim: true,
  fullName:{
    notEmpty: {
      errorMessage: "full name should not be empty..."
    }
  },
  username: {
    notEmpty: {
      errorMessage: "username must be not Empty..",
    },
    isLength: {
      options: { min: 6, max: 15 },
      errorMessage: "username must be 8-15 characters long...",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "password must be not empty...",
    },
    isLength: {
      options: { min: 6, max: 15 },
      errorMessage: "password must be 8-15 characters long...",
    },
  },
  gender: {
    notEmpty: {
      errorMessage: "gender cannot be empty.."
    },
    isIn: {options :["boy","girl"]}
  }
};

const userLoginValidationSchema = {
  username: {
    notEmpty: {
      errorMessage: "username must be not Empty..",
    },
    isLength: {
      options: { min: 8, max: 15 },
      errorMessage: "username must be 8-15 characters long...",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "password must be not empty...",
    },
    isLength: {
      options: { min: 8, max: 15 },
      errorMessage: "password must be 8-15 characters long...",
    },
  },
}

export {userLoginValidationSchema,userSignUpValidationSchema} ;
