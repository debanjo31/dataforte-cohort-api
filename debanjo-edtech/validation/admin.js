import Joi from "joi";

export const adminRegister = Joi.object().keys({
  email: Joi.string().email().trim().lowercase().required(),
  name: Joi.string().min(2).required(),
  password: Joi.string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?;.^&#])[A-Za-z\d@$!%.*?;^&#]{8,30}$/
    )
    .message(
      "Password must contain at least one uppercase letter, one lowercase letter, one of these symbols (@$.;!%*?;^&#) , one digit, and be between 8 and 30 characters in length."
    )
    .required(),
  passwordConfirm: Joi.ref("password"),
});

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};
