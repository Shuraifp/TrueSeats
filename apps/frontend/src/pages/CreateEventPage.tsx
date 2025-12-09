import React, { useCallback } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const CreateEventSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.string().required('Date is required'), // Consider a date picker for production
  availableSeats: Yup.number()
    .min(1, 'Must have at least 1 seat')
    .required('Available seats is required'),
});

const CreateEventPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (values: any) => {
    // Simulate API call to create an event
    console.log('Creating event with:', values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`Event "${values.title}" created successfully! (Simulation)`);
    navigate('/admin/dashboard'); // Redirect to admin dashboard after creation
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Event</h2>
        <Formik
          initialValues={{
            title: '',
            description: '',
            date: '',
            availableSeats: 1,
          }}
          validationSchema={CreateEventSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                label="Event Title"
                name="title"
                type="text"
                placeholder="Enter event title"
              />
              <InputField
                label="Description"
                name="description"
                type="text"
                placeholder="Enter event description"
              />
              <InputField
                label="Date"
                name="date"
                type="date"
              />
              <InputField
                label="Available Seats"
                name="availableSeats"
                type="number"
              />
              <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
                Create Event
              </Button>
              <Button type="button" variant="secondary" onClick={() => navigate('/admin/dashboard')} className="w-full mt-2">
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateEventPage;
