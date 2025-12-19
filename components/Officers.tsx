import React, { useState } from 'react';
import { EXECUTIVE_COMMITTEE, YEAR_LEVEL_REPS } from '../constants';
import { TeamMember } from '../types';
import ScrollReveal from './ScrollReveal';

const Officers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'exec' | 'reps'>('exec');

  const renderGrid = (members: TeamMember[]) => (
    <div className="flex flex-wrap justify-center gap-6 gap-y-8 px-4 max-w-7xl mx-auto">
      {members.map((member, index) => (
        <ScrollReveal key={member.id} delay={index * 50} width="fit-content">
          <div className="flex flex-col items-center w-64 group">
            <div className="w-full h-64 bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-200 group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
              <img
                src={member.image}
                alt={member.name}
                title={`${member.name} - ${member.position}`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(member.name)}&size=256`;
                }}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-gray-900 leading-tight">{member.name}</h3>
              <p className="text-primary-600 text-sm font-medium mt-1">{member.position}</p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );

  return (
    <section id="officers" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal width="100%">
          <div className="text-center mb-12">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Leadership</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Meet Our Officers
            </p>
          </div>
        </ScrollReveal>

        {/* Custom Tabs */}
        <ScrollReveal width="100%" delay={100}>
          <div className="flex justify-center mb-16">
            <div className="bg-gray-100 p-1.5 rounded-full inline-flex shadow-inner">
              <button
                onClick={() => setActiveTab('exec')}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeTab === 'exec'
                    ? 'bg-white text-primary-600 shadow-md transform scale-105'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Executive Committee
              </button>
              <button
                onClick={() => setActiveTab('reps')}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeTab === 'reps'
                    ? 'bg-white text-primary-600 shadow-md transform scale-105'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Year Level Reps
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="min-h-[400px] w-full flex justify-center">
          {activeTab === 'exec' ? renderGrid(EXECUTIVE_COMMITTEE) : renderGrid(YEAR_LEVEL_REPS)}
        </div>
      </div>
    </section>
  );
};

export default Officers;