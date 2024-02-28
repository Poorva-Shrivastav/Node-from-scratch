const createUserValidationSchemaPOST = {
  username: {
    isLength: {
      options: { min: 5, max: 32 },
      errorMessage: "username must be 5-32 char long",
    },
    notEmpty: {
      errorMessage: "username can't be empty",
    },
    isString: {
      errorMessage: "username must be a string",
    },
  },

  displayName: {
    notEmpty: {
      errorMessage: "display name can't be empty",
    },
  },
  password: {
    notEmpty: true,
  },
};

const createUserValidationSchemaGET = {
  filter: {
    isString: true,
    notEmpty: { errorMessage: "must not be empty" },
  },
  value: {
    isString: true,
    notEmpty: { errorMessage: "must not be empty" },
  },
};

module.exports = {
  createUserValidationSchemaPOST,
  createUserValidationSchemaGET,
};
