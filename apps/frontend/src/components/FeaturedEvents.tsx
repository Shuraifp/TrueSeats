import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiNonSecure } from "../api/axios";
import { API_ROUTES } from "../constants/apiRoutes";
import LoadingSpinner from "./LoadingSpinner";
import EventCard from "./EventCard";
import { AppRoutes } from "../routes";
import { Link } from "react-router-dom";
import Button from "./Button";
import type { Event } from "../types";


export default function FeaturedEvents (){
    const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const fetchFeaturedEvents = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await apiNonSecure.get<Event[]>(API_ROUTES.EVENTS.GET_ALL);
          setFeaturedEvents(response.data.slice(0, 3));
        } catch (err: any) {
          setError('Failed to fetch events.');
          toast.error('Failed to fetch events: ' + (err.response?.data?.message || err.message));
        } finally {
          setLoading(false);
        }
      }, []);

      useEffect(() => {
        fetchFeaturedEvents();
      }, [fetchFeaturedEvents]);

      if (loading) return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white text-xl"><LoadingSpinner msg="Loading featured events..." /></div>;
      if (error) return <div className="flex justify-center items-center min-h-screen text-red-500 bg-gray-900">Error: {error}</div>;
    

    return (
        <div className="py-12 bg-gray-800 rounded-lg shadow-xl mb-10">
        <h2 className="text-3xl font-bold text-white mb-8">Upcoming Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
            {featuredEvents.length > 0 ? (
              featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p className="text-gray-400 col-span-full">No upcoming highlights available.</p>
            )}
          </div>
          <div className="mt-10">
            <Link to={AppRoutes.EVENTS}>
              <Button variant="secondary" className="text-lg px-8 py-3">Browse All Events</Button>
            </Link>
          </div>
        </div>
    )
}