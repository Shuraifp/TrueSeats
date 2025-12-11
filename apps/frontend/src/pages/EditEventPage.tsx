import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/InputField';
import Button from '../components/Button';
import type { Event } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import { AppRoutes } from '../routes'; // Import AppRoutes
import toast from 'react-hot-toast';
import { api } from '../api/axios'; // Import the API instance
import { API_ROUTES } from '../constants/apiRoutes'; // Import API routes

const EditEventSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.string().required('Date is required'),
  availableSeats: Yup.number()
    .min(0, 'Seats cannot be negative')
    .required('Available seats is required'),
});

const EditEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEventDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Event>(API_ROUTES.EVENTS.GET_BY_ID(id!));
      setEvent(response.data);
    } catch (err: any) {
      setError('Failed to fetch event details.');
      toast.error('Failed to fetch event details: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEventDetails();
  }, [fetchEventDetails]);

  const handleSubmit = useCallback(async (values: any) => {
    if (!event) return;
    try {
      await api.put(API_ROUTES.EVENTS.UPDATE(event.id), values);
      toast.success(`Event "${values.title}" updated successfully!`);
      navigate(AppRoutes.ADMIN_MANAGE_EVENTS);
    } catch (err: any) {
      toast.error('Failed to update event: ' + (err.response?.data?.message || err.message));
    }
  }, [event, navigate]);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-white text-xl bg-gray-900"><LoadingSpinner msg='Loading event details...' /></div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500 bg-gray-900">Error: {error}</div>;
  if (!event) return <div className="flex justify-center items-center min-h-screen text-white text-xl bg-gray-900">No event data available for editing.</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Edit Event: {event.title}</h2>
        <Formik
          initialValues={{
            title: event.title,
            description: event.description,
            date: event.date.split('T')[0],
            availableSeats: event.availableSeats,
          }}
          validationSchema={EditEventSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
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
              <Button type="submit" disabled={isSubmitting} variant="primary_golden" className="w-full mt-4">
                Update Event
              </Button>
              <Button type="button" variant="secondary" onClick={() => navigate(AppRoutes.ADMIN_MANAGE_EVENTS)} className="w-full mt-2">
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditEventPage;
