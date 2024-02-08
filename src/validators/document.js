import Yup from ".";

export const docValidation = Yup.object().shape({
  // buss_id: Yup.string().required('Output Profile is required'),
  kw: Yup.string().required('Must have at least one keyword'),
  audience: Yup.string().required('Audience must have at least one value'),
  tone: Yup.string().required('tone must have at least one value'),
  title: Yup.string().required('Blog Title is required'),
  
});