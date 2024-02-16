import * as Yup from "yup";

export const courseUpdateSchema = Yup.object().shape({
  title: Yup.string(),
  subtitle: Yup.string(),
  duration: Yup.string(),
  fee: Yup.number().min(0, 'Fee cannot be a negative number'),
  createdby: Yup.string(),
  description: Yup.string(),
  banner: Yup.mixed(),
  introvideo: Yup.mixed(),
});
