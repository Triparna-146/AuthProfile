import * as yup from 'yup';
import { InferType } from 'yup';

// 1. Signup Schema
export const signupSchema = yup.object({
  username: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

// 2. Login Schema
export const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

// 3. (Optional) Get User Info - Usually just a protected API call, no form input

export const updateProfileschema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  age: yup
    .number()
    .positive('Invalid age')
    .integer('Invalid age')
    .required('Age is required')
    .transform((v, o) => (o === '' ? null : v)),
  gender: yup.string().oneOf(['Male', 'Female', 'Prefer Not to Say']).required('Gender is required'),
  bio: yup.string().required('Bio is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
});


export type UpdateProfileFormData = InferType<typeof updateProfileschema>;