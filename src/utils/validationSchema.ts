import * as yup from "yup";

const  SignupSchema = yup.object().shape({
  firstname: yup.string().required("First name is required."),
  lastname: yup.string().required("Last name is required."),
  email: yup.string().email("Invalid email address.").required("Email is required."),
  mobile: yup
    .string()
    .required("Mobile number is required.")
    .matches(/^[0-9]{10}$/, "Invalid mobile number."),
  password: yup
    .string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters long."),
  confirm_password: yup
    .string()
    .required("Confirm password is required.")
    .oneOf([yup.ref("password")], "Passwords must match."),
    image: yup
    .object()
    .required("Profile picture is required")
    
   
});
export default SignupSchema