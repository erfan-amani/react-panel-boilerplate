import * as yup from "yup";

export const loginValidationSchema = yup
  .object({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(8, "Password length must be at least 8 characters long")
      .required("Password is required"),
  })
  .required();
