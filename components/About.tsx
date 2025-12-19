import React from 'react';
import { Eye, Users, BookOpen } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const About: React.FC = () => {
  const features = [
    {
      icon: <Eye className="h-8 w-8 text-primary-500" />,
      title: 'Our Vision',
      description: 'UP Simantikos: the premier statistical organization bonded together towards a dynamic and holistic development immersed in academic, service, and socials and advocates proactive change and excellence in statistics education.',
    },
    {
      icon: <Users className="h-8 w-8 text-primary-500" />,
      title: 'Our Community',
      description: 'A vibrant family of students, alumni, and faculty united by a passion for data, research, and service.',
    },
    {
      icon: <BookOpen className="h-8 w-8 text-primary-500" />,
      title: 'Academic Excellence',
      description: 'Providing tutorials, workshops, and resources to help students excel in their statistical coursework and future careers.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Who We Are</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              About UP Simantikos
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Established with the goal of fostering a culture of statistical proficiency, we are the premier academic organization for Statistics students in UP Cebu.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 150} className="h-full">
              <div
                className="bg-gray-50 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100 flex flex-col items-center text-center h-full"
              >
                <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;