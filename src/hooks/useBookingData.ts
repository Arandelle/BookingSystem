import { useState, useEffect } from 'react';
import { FormField, Appointment, BookingConfig } from '@/types/booking';

// Initial configuration
const initialConfig: BookingConfig = {
  title: "Book Your Appointment",
  description: "Fill out the form below to schedule your appointment with us.",
  fields: [
    { id: 'name', label: 'Full Name', type: 'text', required: true },
    { id: 'email', label: 'Email Address', type: 'email', required: true },
    { id: 'phone', label: 'Phone Number', type: 'tel', required: true },
    { id: 'date', label: 'Preferred Date', type: 'date', required: true },
    { id: 'time', label: 'Preferred Time', type: 'time', required: true },
    { 
      id: 'service', 
      label: 'Service Type', 
      type: 'select', 
      required: true,
      options: ['Consultation', 'Follow-up', 'Treatment', 'Emergency']
    },
    { id: 'notes', label: 'Additional Notes', type: 'textarea', required: false }
  ]
};

export const useBookingData = () => {
  const [config, setConfig] = useState<BookingConfig>(initialConfig);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('bookingConfig');
    const savedAppointments = localStorage.getItem('appointments');
    
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
    
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('bookingConfig', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (data: Record<string, string>) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      data,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  };

  const updateConfig = (newConfig: BookingConfig) => {
    setConfig(newConfig);
  };

  const addField = (field: FormField) => {
    setConfig(prev => ({
      ...prev,
      fields: [...prev.fields, field]
    }));
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setConfig(prev => ({
      ...prev,
      fields: prev.fields.map(field => 
        field.id === fieldId ? { ...field, ...updates } : field
      )
    }));
  };

  const deleteField = (fieldId: string) => {
    setConfig(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId)
    }));
  };

  return {
    config,
    appointments,
    addAppointment,
    deleteAppointment,
    updateConfig,
    addField,
    updateField,
    deleteField
  };
};