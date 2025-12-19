import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TeamMember } from '../types';

interface CarouselProps {
  items: TeamMember[];
  title: string;
  subtitle: string;
  id: string;
  bgWhite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ items, title, subtitle, id, bgWhite = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % Math.ceil(items.length / itemsPerPage));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => 
      prev === 0 ? Math.ceil(items.length / itemsPerPage) - 1 : prev - 1
    );
  };

  // Get current slice of items
  // This logic is a bit simplified for "sliding", often better to use a library for true endless loop, 
  // but for a lightweight custom implementation, we can just show 'pages' of items.
  // To make it feel more like a slider, let's just index through the start position.
  
  const maxIndex = items.length - itemsPerPage;
  const safeIndex = Math.min(activeIndex, Math.max(0, maxIndex));

  // Simpler sliding approach: Single item step
  const handleNext = () => {
    setActiveIndex((prev) => (prev >= items.length - itemsPerPage ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev <= 0 ? items.length - itemsPerPage : prev - 1));
  };
  
  // Calculate the transform value
  const itemWidth = 100 / itemsPerPage;
  const translateX = -(activeIndex * itemWidth); // Logic needs to be percentage based on active index

  // IMPORTANT: For a smooth infinite-like feel without complex cloning, 
  // we will limit the activeIndex to [0, total - perPage].
  // If we want it to cycle, we reset.
  
  return (
    <section id={id} className={`py-20 ${bgWhite ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">{subtitle}</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handlePrev}
              className="p-3 rounded-full border border-gray-300 text-gray-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300 transition-all disabled:opacity-50"
              disabled={items.length <= itemsPerPage}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNext}
              className="p-3 rounded-full border border-gray-300 text-gray-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300 transition-all disabled:opacity-50"
              disabled={items.length <= itemsPerPage}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${activeIndex * (100 / itemsPerPage)}%)` 
            }}
          >
            {items.map((item) => (
              <div 
                key={item.id} 
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / itemsPerPage}%` }}
              >
                <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="aspect-w-1 aspect-h-1 w-full h-80 overflow-hidden bg-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="text-lg font-bold">{item.name}</p>
                      <p className="text-sm text-primary-200 font-medium">{item.position}</p>
                    </div>
                  </div>
                  {item.bio && (
                    <div className="p-6">
                       <p className="text-gray-600 text-sm line-clamp-3">{item.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;