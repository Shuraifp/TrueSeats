import React, { useCallback } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/InputField';
import Button from '../components/Button';
import CheckboxField from '../components/CheckboxField';
import { useNavigate, Link } from 'react-router-dom';
import { AppRoutes } from '../routes';
import { useAuth } from '../context/AuthContext';
import { Role } from '../constants';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  isOrganizer: Yup.boolean(),
});

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const handleSubmit = useCallback(async (values: any) => {
    const role = values.isOrganizer ? Role.Admin : Role.User;

    try {
      await register({ ...values, role });
      toast.success('registeration successful')
      navigate(AppRoutes.SIGNIN);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  }, [register, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-50 p-4">
      <div className="w-full max-w-md p-8 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-8 tracking-tight">Create Your Account</h2>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            isOrganizer: false,
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <InputField
                label="Name"
                name="name"
                type="text"
                placeholder="Enter your name"
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
              />
              <CheckboxField
                name="isOrganizer"
                label="I am an organizer"
              />
              <Button type="submit" disabled={isSubmitting} variant="primary_golden" className="w-full mt-6">
                Register
              </Button>
              <p className="text-gray-400 text-sm mt-4">
                Already have an account? {' '}
                <Link to={AppRoutes.SIGNIN} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Login here
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
