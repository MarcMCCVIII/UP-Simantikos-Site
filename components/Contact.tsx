import React, { useState } from 'react';
import { Mail, MapPin, Phone, Facebook, Instagram, Send, CheckCircle, Loader2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { SOCIAL_LINKS } from '../constants';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    // Simulate network request
    setTimeout(() => {
      setFormState('success');
      const form = e.target as HTMLFormElement;
      form.reset();
      
      // Reset state after 4 seconds
      setTimeout(() => setFormState('idle'), 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center">
        
        {/* Contact Info Header & Details - Centered on Page */}
        <ScrollReveal delay={0} className="w-full max-w-4xl text-center mb-20">
          <div className="flex flex-col items-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Get in Touch</h2>
            <p className="mt-2 text-4xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-6">
              Contact Us
            </p>
            <p className="text-xl text-gray-500 mb-16 leading-relaxed max-w-2xl">
              Have questions about membership, events, or partnerships? Reach out to us through any of the channels below.
            </p>

            {/* Contact Grid - Address, Email, Phone Centered */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full mb-16">
              <div className="flex flex-col items-center group">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-50 text-primary-600 shadow-sm transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white mb-6">
                  <MapPin size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Location</h3>
                <p className="text-gray-500 leading-relaxed">
                  University of the Philippines Cebu,<br />
                  Gorordo Avenue, Lahug, Cebu
                </p>
              </div>

              <div className="flex flex-col items-center group">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-50 text-primary-600 shadow-sm transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white mb-6">
                  <Mail size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-gray-500 hover:text-primary-600 transition-colors">
                  {SOCIAL_LINKS.email}
                </a>
              </div>

              <div className="flex flex-col items-center group">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-50 text-primary-600 shadow-sm transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white mb-6">
                  <Phone size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-500">
                  0999 273 288 18
                </p>
              </div>
            </div>

            {/* Centered Socials */}
            <div className="pt-8 border-t border-gray-100 w-full flex flex-col items-center">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">Follow Our Journey</h3>
              <div className="flex justify-center space-x-12">
                <a 
                  href={SOCIAL_LINKS.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-primary-500 transition-all transform hover:scale-125"
                >
                  <span className="sr-only">Facebook</span>
                  <Facebook size={40} />
                </a>
                <a 
                  href={SOCIAL_LINKS.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-primary-500 transition-all transform hover:scale-125"
                >
                  <span className="sr-only">Instagram</span>
                  <Instagram size={40} />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Large Centered Contact Form */}
        <ScrollReveal delay={200} className="w-full max-w-5xl">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-gray-100 shadow-[0_32px_64px_rgba(0,0,0,0.06)] relative">
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-3">
                  <label htmlFor="name" className="block text-sm font-bold text-gray-800 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="py-5 px-7 block w-full bg-gray-50 border-2 border-transparent focus:border-primary-500 focus:bg-white rounded-2xl outline-none transition-all duration-300 text-gray-900 text-lg placeholder-gray-400"
                      placeholder="John Doe"
                      disabled={formState === 'submitting'}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="email" className="block text-sm font-bold text-gray-800 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="py-5 px-7 block w-full bg-gray-50 border-2 border-transparent focus:border-primary-500 focus:bg-white rounded-2xl outline-none transition-all duration-300 text-gray-900 text-lg placeholder-gray-400"
                      placeholder="you@example.com"
                      disabled={formState === 'submitting'}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="message" className="block text-sm font-bold text-gray-800 uppercase tracking-widest ml-1">
                  Message
                </label>
                <div className="relative group">
                  <textarea
                    id="message"
                    name="message"
                    rows={8}
                    required
                    className="py-5 px-7 block w-full bg-gray-50 border-2 border-transparent focus:border-primary-500 focus:bg-white rounded-2xl outline-none transition-all duration-300 text-gray-900 text-lg placeholder-gray-400 resize-none"
                    placeholder="How can we help you?"
                    disabled={formState === 'submitting'}
                  ></textarea>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className={`w-full inline-flex justify-center items-center py-6 px-12 border border-transparent shadow-2xl text-2xl font-black rounded-2xl text-white transition-all transform hover:scale-[1.01] active:scale-[0.99]
                    ${formState === 'submitting' 
                      ? 'bg-primary-400 cursor-not-allowed' 
                      : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-100'}`}
                >
                  {formState === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-4 h-8 w-8" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-5 -mr-1 h-7 w-7" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </ScrollReveal>
      </div>

      {/* Full Screen Success Message Overlay */}
      {formState === 'success' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm animate-fade-in-up">
           <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-20 max-w-3xl w-full mx-4 flex flex-col items-center text-center transform scale-100 transition-all border border-gray-100">
              <div className="bg-green-100 p-6 rounded-full mb-10">
                <CheckCircle className="h-24 w-24 text-green-500" />
              </div>
              <h3 className="text-5xl font-extrabold text-gray-900 mb-8">Message Sent!</h3>
              <p className="text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Thank you for reaching out to UP Simantikos Statistical Society. <br/>We have received your inquiry and our team will get back to you shortly.
              </p>
              <button 
                onClick={() => setFormState('idle')}
                className="mt-12 px-10 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
           </div>
        </div>
      )}
    </section>
  );
};

export default Contact;