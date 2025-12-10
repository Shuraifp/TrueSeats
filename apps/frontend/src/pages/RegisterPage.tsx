import React, { useCallback } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/InputField';
import Button from '../components/Button';
import CheckboxField from '../components/CheckboxField';
import { useNavigate, Link } from 'react-router-dom';
import type { UserRole } from '../types';
import { Role } from '../constants';

interface RegisterPageProps {
  onRegisterSuccess: (role: UserRole) => void;
}

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  isOrganizer: Yup.boolean(),
});

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  const handleSubmit = useCallback(async (values: any) => {
    const role: UserRole = values.isOrganizer ? Role.Admin : Role.User;

    // Here you would typically send the registration data to your backend API
    console.log('Registration attempt with:', { ...values, role });
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`User "${values.name}" registered successfully as ${role}! (Simulation)`);
    onRegisterSuccess(role);
    navigate('/login');
  }, [onRegisterSuccess, navigate]);

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
                <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
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
