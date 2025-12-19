import React, { useState, useEffect, useRef } from 'react';
import { Calendar, X } from 'lucide-react';
import { EVENTS } from '../constants';
import { Event } from '../types';

const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [visibleEvents, setVisibleEvents] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) {
              setVisibleEvents((prev) => {
                const newSet = new Set(prev);
                newSet.add(id);
                return newSet;
              });
              observerRef.current?.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('.event-card-animate');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = 'unset';
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://picsum.photos/800/600?grayscale';
  };

  return (
    <section id="events" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Activities</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Events Gallery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENTS.map((event, index) => (
            <div 
              key={event.id} 
              data-id={event.id}
              className={`event-card-animate flex flex-col bg-gray-50 rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group ${
                visibleEvents.has(event.id) 
                  ? 'animate-fade-in-up opacity-100' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: `${index * 150}ms`, transitionProperty: 'opacity, transform' }}
            >
              <div className="relative h-56 w-full cursor-pointer overflow-hidden" onClick={() => openModal(event)}>
                <img
                  src={event.image}
                  alt={event.title}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <div className="p-6 flex-1 flex flex-col items-center text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{event.title}</h3>
                <div className="flex items-center justify-center text-sm text-gray-500 mb-4 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5 text-primary-500" />
                    {event.date}
                  </div>
                </div>
                <p className="text-gray-600 mb-6 flex-1 line-clamp-3 leading-relaxed">{event.description}</p>
                <button 
                  onClick={() => openModal(event)}
                  className="w-full sm:w-auto py-2.5 px-6 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300 transition-all focus:outline-none"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" 
              aria-hidden="true"
              onClick={closeModal}
            ></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-fade-in-up">
              <div className="relative h-64">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.title} 
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors focus:outline-none backdrop-blur-md"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                   <h3 className="text-2xl font-bold text-white shadow-sm" id="modal-title">
                      {selectedEvent.title}
                    </h3>
                </div>
              </div>
              <div className="px-6 pt-6 pb-6 text-center">
                <div className="flex items-center justify-center text-sm text-primary-600 font-medium mb-4 bg-primary-50 w-fit px-3 py-1 rounded-full mx-auto">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  {selectedEvent.date}
                </div>
                <div className="prose prose-sm text-gray-600 mx-auto">
                  <p className="text-base leading-relaxed">
                    {selectedEvent.description}
                  </p>
                  <p className="mt-4 text-sm text-gray-500 italic border-l-4 border-primary-200 pl-4 text-left">
                    Interested in joining? Contact our membership committee or check your email for registration links.
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 flex flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-lg shadow-sm px-4 py-2 bg-gray-900 text-base font-medium text-white hover:bg-gray-800 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;