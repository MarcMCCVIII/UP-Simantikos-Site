import React from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Hero: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.imgur.com/a1Wtc1w.jpeg"
          className="w-full h-full object-cover animate-[scale_20s_ease-in-out_infinite_alternate]"
          style={{ animationName: 'kenBurns' }}
        />
        <style>{`
          @keyframes kenBurns {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
          }
        `}</style>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 to-gray-900/80 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <ScrollReveal width="100%">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
            <span className="block text-primary-200">UP Simantikos</span>
            <span className="block">Statistical Society</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal width="100%" delay={200}>
          <p className="mt-4 text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 font-light">
            Promoting statistical literacy and excellence within the university and beyond.
          </p>
        </ScrollReveal>
        
        <ScrollReveal width="100%" delay={400}>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#about"
              onClick={(e) => handleScroll(e, '#about')}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-primary-900 bg-white hover:bg-gray-100 transition-transform transform hover:scale-105 shadow-lg"
            >
              Learn More
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-400 text-base font-medium rounded-full text-white hover:bg-primary-600 hover:border-primary-600 transition-colors"
            >
              Contact Us <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Hero;