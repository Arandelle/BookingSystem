import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useBookingData } from '@/hooks/useBookingData';
import { BookingForm } from '@/components/BookingForm';
import { AppointmentsTable } from '@/components/AppointmentsTable';
import { FieldManager } from '@/components/FieldManager';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();
  const [activeView, setActiveView] = useState<'user' | 'admin'>('user');
  const [adminTab, setAdminTab] = useState<'appointments' | 'fields'>('appointments');

  const {
    config,
    appointments,
    addAppointment,
    deleteAppointment,
    addField,
    updateField,
    deleteField
  } = useBookingData();

  const handleBookingSubmit = (data: Record<string, string>) => {
    addAppointment(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-gray-900">BookingPro</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveView('user')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeView === 'user' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  User View
                </button>
                <button
                  onClick={() => setActiveView('admin')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeView === 'admin' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Admin Panel
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'user' ? (
          <div>
            {/* Hero Section */}
            {/* <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl overflow-hidden mb-12">
              <div className="absolute inset-0">
                <img
                  src="https://d64gsuwffb70l.cloudfront.net/68d63ba79f4b3a216dce3b3d_1758870483151_78dc3e7f.webp"
                  alt="Professional booking"
                  className="w-full h-full object-cover opacity-20"
                />
              </div>
              <div className="relative px-8 py-16 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Schedule Your Appointment
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Book your appointment quickly and easily with our streamlined booking system
                </p>
                <div className="flex justify-center items-center space-x-8 text-blue-100">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://d64gsuwffb70l.cloudfront.net/68d63ba79f4b3a216dce3b3d_1758870485897_8b3c8cdb.webp"
                      alt="Calendar"
                      className="w-8 h-8 opacity-80"
                    />
                    <span>Easy Scheduling</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://d64gsuwffb70l.cloudfront.net/68d63ba79f4b3a216dce3b3d_1758870484974_c90bd2d5.webp"
                      alt="Professional"
                      className="w-8 h-8 rounded-full opacity-80"
                    />
                    <span>Professional Service</span>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Booking Form */}
            <BookingForm
              fields={config.fields}
              title={config.title}
              description={config.description}
              onSubmit={handleBookingSubmit}
            />

            {/* Features Section */}
            {/* <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Booking</h3>
                <p className="text-gray-600">Schedule your appointment in just a few clicks</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Confirmation</h3>
                <p className="text-gray-600">Get immediate confirmation of your booking</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Options</h3>
                <p className="text-gray-600">Choose from multiple service types and times</p>
              </div>
            </div> */}
          </div>
        ) : (
          <div>
            {/* Admin Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
                  <p className="text-gray-600 mt-1">Manage appointments and form configuration</p>
                </div>
                {/* <img
                  src="https://d64gsuwffb70l.cloudfront.net/68d63ba79f4b3a216dce3b3d_1758870487069_683f8399.webp"
                  alt="Admin Dashboard"
                  className="w-16 h-12 object-cover rounded-lg"
                /> */}
              </div>
              
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setAdminTab('appointments')}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    adminTab === 'appointments' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Appointments ({appointments.length})
                </button>
                <button
                  onClick={() => setAdminTab('fields')}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    adminTab === 'fields' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Form Fields ({config.fields.length})
                </button>
              </div>
            </div>

            {/* Admin Content */}
            {adminTab === 'appointments' ? (
              <AppointmentsTable
                appointments={appointments}
                fields={config.fields}
                onDelete={deleteAppointment}
              />
            ) : (
              <FieldManager
                fields={config.fields}
                onAddField={addField}
                onUpdateField={updateField}
                onDeleteField={deleteField}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AppLayout;