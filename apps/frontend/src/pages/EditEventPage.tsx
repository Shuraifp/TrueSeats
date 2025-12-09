import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/InputField';
import Button from '../components/Button';
import type { Event } from '../types';

const dummyEvents: Event[] = [
  {
    id: 1,
    title: 'Concert in the Park',
    description: 'An evening of live music under the stars.',
    date: '2025-12-25',
    availableSeats: 150,
  },
  {
    id: 2,
    title: 'Tech Conference 2026',
    description: 'Discover the latest in technology and innovation.',
    date: '2026-01-15',
    availableSeats: 300,
  },
  {
    id: 3,
    title: 'Art Exhibition: Modern Visions',
    description: 'A collection of contemporary art from local artists.',
    date: '2026-02-10',
    availableSeats: 80,
  },
];

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
      // Simulate API call to fetch event details
      await new Promise(resolve => setTimeout(resolve, 500));
      const foundEvent = dummyEvents.find((e) => e.id === Number(id));
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        setError('Event not found.');
      }
    } catch (err) {
      setError('Failed to fetch event details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEventDetails();
  }, [fetchEventDetails]);

  const handleSubmit = useCallback(async (values: any) => {
    if (event) {
      // Simulate API call to update event
      console.log(`Updating event ${event.id} with:`, values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`Event "${values.title}" updated successfully! (Simulation)`);
      navigate('/admin/events/manage'); // Redirect to manage events after update
    }
  }, [event, navigate]);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-xl">Loading event details...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;
  if (!event) return <div className="flex justify-center items-center min-h-screen text-xl">No event data available for editing.</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Event: {event.title}</h2>
        <Formik
          initialValues={{
            title: event.title,
            description: event.description,
            date: event.date,
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
              <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
                Update Event
              </Button>
              <Button type="button" variant="secondary" onClick={() => navigate('/admin/events/manage')} className="w-full mt-2">
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
