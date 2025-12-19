import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FACULTY } from '../constants';
import ScrollReveal from './ScrollReveal';

const Faculty: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="faculty" className="py-24 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Academic Leaders</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our Faculty
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Guiding the next generation of statisticians with expertise and dedication.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-8">
          {FACULTY.map((member, index) => (
            <ScrollReveal key={member.id} delay={index * 50} width="fit-content">
              <div 
                className="group cursor-pointer w-full sm:w-[22rem]"
                onClick={() => openModal(member.image)}
              >
                <div className="w-full aspect-[16/9] bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-primary-200 transition-all duration-300 transform group-hover:-translate-y-1 relative">
                  <img
                    src={member.image}
                    alt="Faculty Member"
                    title={member.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?background=random&size=800&name=${encodeURIComponent(member.name)}`;
                    }}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/10 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white font-semibold tracking-wide bg-primary-600/90 px-6 py-2 rounded-full backdrop-blur-sm shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                          View
                      </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary-900/90 backdrop-blur-sm transition-opacity duration-300 animate-fade-in-up"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20 focus:outline-none"
            aria-label="Close modal"
          >
            <X size={32} />
          </button>
          
          <div 
            className="relative max-w-7xl max-h-[90vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} 
          >
            <img
              src={selectedImage}
              alt="Faculty Member Full View"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Faculty;