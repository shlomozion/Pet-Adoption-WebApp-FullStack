const signUpSchema = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    phoneNumber: { type: "string" },
  },

  required: ["firstName", "lastName", "email", "password", "phoneNumber"],
  additionalProperties: { type: "boolean" },
};

const signInSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },

  required: ["email", "password"],
  additionalProperties: false,
};

module.exports = { signUpSchema, signInSchema };
