import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Email does not valid").required(),
  password: Yup.string().min(6).max(20).required(),
});
