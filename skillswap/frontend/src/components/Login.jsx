// skillswap/frontend/src/components/Login.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { login } from '../services/authService';
const Login = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values) => {
    console.log('Form data', values);
 try {
      const response = await login(values);
      console.log('Login successful:', response);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {() => (
            <Form>
              <div> {/* This div wraps all form elements */}
                <div className="mt-4">
                  <label className="block" htmlFor="email">Email</label>
                  <Field type="email" name="email" placeholder="Email" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mt-4">
                  <label className="block" htmlFor="password">Password</label>
                  <Field type="password" name="password" placeholder="Password" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex items-baseline justify-between mt-4"> {/* Moved mt-4 here */}
                  <button type="submit" className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900"> {/* Added type="submit" */}
                    Login
                  </button>
                  <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div> {/* This closing div was also misplaced */}
    </div>
  );
};

export default Login;