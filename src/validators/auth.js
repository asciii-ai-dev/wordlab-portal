import Yup from ".";


export const resetPassValidator = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase character")
    .matches(/[a-z]/, "Password must contain at least one lowercase character")
    .matches(/[0-9]/, "Password must contain at least one digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "The passwords entered do not match each other"
    ),
});

export const changePassValidator = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase character")
    .matches(/[a-z]/, "Password must contain at least one lowercase character")
    .matches(/[0-9]/, "Password must contain at least one digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "The passwords entered do not match each other"
    ),
    
});

export const loginValidator = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase character")
    .matches(/[a-z]/, "Password must contain at least one lowercase character")
    .matches(/[0-9]/, "Password must contain at least one digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

const step1Schema = Yup.object().shape({
  name: Yup.string().min(3).max(80),
  email: Yup.string().email().required("Email is required"),
});

const step2Schema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase character")
    .matches(/[a-z]/, "Password must contain at least one lowercase character")
    .matches(/[0-9]/, "Password must contain at least one digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "The passwords entered do not match each other"
  ),
});

const step3Schema = Yup.object().shape({
  user_industry: Yup.string()
    .required("This field is required")
    .oneOf(
      ["freelancer", "marketer", "business owner", "other"],
      "Please select a valid option"
    ),
  company: Yup.string().optional().min(2).max(100),
  domain: Yup.string().url(),
});

export const signupValidator = {
  step1Schema,
  step2Schema,
  step3Schema,
};
