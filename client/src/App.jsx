import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { Calendar, Users, MapPin, Search, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

// API Client
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
});

function App() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const { data: events, isLoading, error } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const { data } = await api.get('/events');
            return data;
        },
    });

    const openBooking = (event) => {
        setSelectedEvent(event);
        setIsBookingOpen(true);
    };

    const closeBooking = () => {
        setIsBookingOpen(false);
        setSelectedEvent(null);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                                E
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600">
                                EventSure
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <div className="relative bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 px-4 sm:px-6 lg:px-8 pt-20">
                        <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Experience the best</span>{' '}
                                    <span className="block text-primary-600 xl:inline">events near you</span>
                                </h1>
                                <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Discover and book exclusive tickets to conferences, festivals, and exhibitions. Real-time availability, instant booking.
                                </p>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-slate-100">
                    <img
                        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                        src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Concert crowd"
                    />
                </div>
            </div>

            {/* Event List */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Upcoming Events</h2>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500">
                        Failed to load events. Please try again later.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <EventCard key={event.id} event={event} onBook={() => openBooking(event)} />
                        ))}
                    </div>
                )}
            </div>

            {/* Booking Modal */}
            <AnimatePresence>
                {isBookingOpen && selectedEvent && (
                    <BookingModal event={selectedEvent} onClose={closeBooking} />
                )}
            </AnimatePresence>
        </div>
    );
}

function EventCard({ event, onBook }) {
    const isSoldOut = event.availableSeats === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-100 flex flex-col h-full"
        >
            <div className="h-48 overflow-hidden relative">
                <img
                    src={event.image || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000"}
                    alt={event.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                    <span className={clsx(
                        "px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md",
                        isSoldOut ? "bg-red-500/90 text-white" : "bg-white/90 text-slate-900"
                    )}>
                        {isSoldOut ? "Sold Out" : `${event.availableSeats} seats left`}
                    </span>
                </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-primary-600 text-sm font-medium mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {format(new Date(event.date), 'MMMM d, yyyy')}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{event.title}</h3>
                <p className="text-slate-500 text-sm mb-6 flex-1">{event.description}</p>

                <button
                    onClick={onBook}
                    disabled={isSoldOut}
                    className={clsx(
                        "w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center",
                        isSoldOut
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                            : "bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/30 active:scale-95"
                    )}
                >
                    {isSoldOut ? "Sold Out" : "Book Ticket"}
                </button>
            </div>
        </motion.div>
    );
}

function BookingModal({ event, onClose }) {
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const mutation = useMutation({
        mutationFn: async (data) => {
            const res = await api.post('/book', {
                eventId: event.id,
                ...data
            });
            return res.data;
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries(['events']);
            onClose();
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Booking failed");
        }
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden"
            >
                <div className="bg-primary-600 p-6 text-white text-center">
                    <h3 className="text-xl font-bold">Book Your Ticket</h3>
                    <p className="text-primary-100 text-sm mt-1">{event.title}</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                            placeholder="John Doe"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                            placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="w-full py-3 px-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                        >
                            {mutation.isPending ? <Loader2 className="animate-spin w-5 h-5" /> : "Confirm Booking"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full mt-3 py-3 px-4 text-slate-600 font-medium hover:bg-slate-50 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

export default App;
