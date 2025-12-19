import React from 'react';
import { TeamMember } from '../types';

interface TeamGridProps {
  items: TeamMember[];
  title: string;
  subtitle: string;
  id: string;
  bgWhite?: boolean;
}

const TeamGrid: React.FC<TeamGridProps> = ({ items, title, subtitle, id, bgWhite = false }) => {
  return (
    <section id={id} className={`py-24 ${bgWhite ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">{subtitle}</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {items.map((item) => (
            <div key={item.id} className="group relative flex flex-col items-center text-center">
              <div className="relative w-48 h-48 mb-6">
                <div className="absolute inset-0 rounded-full bg-primary-100 transform translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm font-medium text-primary-500 uppercase tracking-wide mb-3">
                  {item.position}
                </p>
                {item.bio && (
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                    {item.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;