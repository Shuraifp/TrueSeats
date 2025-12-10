import React, { useCallback } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';
import type { UserRole } from '../types';
import { Role } from '../constants'; // Import Role constant

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const handleSubmit = useCallback(async (values: any) => {
    // Here you would typically send the login data to your backend API
    console.log('Login attempt with:', values);
    // Simulate a successful login and determine role
    const dummyRole: UserRole = Role.Admin
    await new Promise(resolve => setTimeout(resolve, 1000));
    onLogin(dummyRole);
    alert(`Logged in as ${dummyRole}!`);
    navigate('/events');
  }, [onLogin, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="w-full max-w-md p-8 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-8 tracking-tight">Welcome Back!</h2>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
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
              <Button type="submit" disabled={isSubmitting} variant="primary_golden" className="w-full mt-6">
                Login
              </Button>
              <p className="text-gray-400 text-sm mt-4">
                Don't have an account? {' '}
                <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Register here
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
