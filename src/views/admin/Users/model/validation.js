/* eslint-disable jsx-a11y/anchor-is-valid */
import * as yup from "yup";
import "yup-phone";
import { AgentUser } from "./Data";

export const createUserValidation = yup.object().shape(
  {
    mobile: yup
      .string()
      .typeError("Mobile is a required field")
      .nullable()
      .when("email", {
        is: (val) => !val || val.length < 1,
        then: yup.string().nullable().required("Mobile is a required field"),
        otherwise: yup.string().nullable(),
      }),
    email: yup
      .string()
      .typeError("Email is a required field")
      .email("Email Format Not Correct")
      .nullable()
      .when("mobile", {
        is: (val) => !val || val.length < 1,
        then: yup
          .string()
          .email()
          .nullable()
          .required("Email is a required field"),
        otherwise: yup.string().nullable(),
      }),
    name: yup
      .string()
      .required("Name is a required field")
      .typeError("Name must be a string"),
    address: yup
      .string()
      .required("Address is a required field")
      .typeError("Address must be a string"),
    // password: yup
    //   .string()
    //   .nullable()
    //   .matches(
    //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,64}$/,
    //     "The password must contain uppercase and lowercase letters, numbers and symbols, and must be at least 8 characters long"
    //   )
    //   .required("Password is a required field"),
    status: yup
      .string()
      .typeError("Status is a required field")
      .required("Status is a required field"),
    // level: yup
    //   .string()
    //   .typeError("Level is a required field")
    //   .required("Level is a required field"),

    //   isVerified: yup.boolean().required("Verified is a required field"),
  },
  [["email", "mobile"]]
);

export const updateUserValidation = yup.object().shape(
  {
    name: yup
      .string()
      .nullable()
      .typeError("Name must be a string")
      .required("Name is a required field"),
    mobile: yup
      .string()
      .typeError("Mobile is a required field")
      .nullable()
      .when("email", {
        is: (val) => !val || val.length < 1,
        then: yup.string().nullable().required("Mobile is a required field"),
        otherwise: yup.string().nullable(),
      }),
    email: yup
      .string()
      .typeError("Email is a required field")
      .email("Email Format Not Correct")
      .nullable()
      .when("mobile", {
        is: (val) => !val || val.length < 1,
        then: yup
          .string()
          .email()
          .nullable()
          .required("Email is a required field"),
        otherwise: yup.string().nullable(),
      }),
    status: yup
      .string()
      .typeError("Status is a required field")
      .required("Status is a required field"),
    level: yup
      .string()
      .typeError("Level is a required field")
      .required("Level is a required field"),
    password: yup
      .string()
      .trim()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,64}$/,
        "The password must contain uppercase and lowercase letters, numbers and symbols, and must be at least 8 characters long"
      )
      .nullable()
      .transform((value) => (!value ? null : value)),
    fee: yup
      .number()
      .typeError("Agent fee must be number")
      .when("level", {
        is: (val) => val === AgentUser.value,
        then: yup
          .number()
          .nullable()
          .min(0, "Minimum value is 0")
          .max(100, "Maximum value is 100")
          .required("Agent fee is a required field"),
        otherwise: yup.number().nullable(),
      }),
  },
  [["email", "mobile"]]
);
