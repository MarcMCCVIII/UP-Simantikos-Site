import React, { useState } from 'react';
import { X } from 'lucide-react';

const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

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

  const openPolicyModal = (e: React.MouseEvent, type: 'privacy' | 'terms') => {
    e.preventDefault();
    setActiveModal(type);
    document.body.style.overflow = 'hidden';
  };

  const closePolicyModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'unset';
  };

  const modalContent = {
    privacy: {
      title: "Privacy Policy",
      content: (
        <div className="space-y-4 text-gray-600">
          <p>Last updated: October 2024</p>
          <p>
            At UP Simantikos Statistical Society, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or engage with our organization.
          </p>
          <h4 className="font-bold text-gray-900">1. Information We Collect</h4>
          <p>
            We may collect personal information such as your name, email address, and student number when you register for events, apply for membership, or contact us through our forms.
          </p>
          <h4 className="font-bold text-gray-900">2. How We Use Your Information</h4>
          <p>
            The information collected is used solely for the purpose of organizing events, managing membership records, and communicating updates regarding the organization's activities. We do not sell or share your data with third parties.
          </p>
          <h4 className="font-bold text-gray-900">3. Cookies</h4>
          <p>
            Our website may use cookies to enhance user experience. You can choose to disable cookies through your browser settings, though this may affect site functionality.
          </p>
          <h4 className="font-bold text-gray-900">4. Contact Us</h4>
          <p>
            If you have any questions about this Privacy Policy, please contact us at up.simantikos@gmail.com.
          </p>
        </div>
      )
    },
    terms: {
      title: "Terms of Service",
      content: (
        <div className="space-y-4 text-gray-600">
          <p>Last updated: October 2024</p>
          <p>
            Welcome to the UP Simantikos Statistical Society website. By accessing or using this website, you agree to be bound by these Terms of Service.
          </p>
          <h4 className="font-bold text-gray-900">1. Use of Content</h4>
          <p>
            All content provided on this website, including text, images, and graphics, is for informational purposes only. You may not modify, reproduce, or distribute any content without prior written permission from the organization.
          </p>
          <h4 className="font-bold text-gray-900">2. User Conduct</h4>
          <p>
            You agree to use this website only for lawful purposes. Harassment, hate speech, or any form of harmful behavior in our contact forms or community spaces will not be tolerated.
          </p>
          <h4 className="font-bold text-gray-900">3. Event Registration</h4>
          <p>
            Registration for events is subject to availability. UP Simantikos reserves the right to cancel or reschedule events and will notify registered participants accordingly.
          </p>
          <h4 className="font-bold text-gray-900">4. Changes to Terms</h4>
          <p>
            We reserve the right to modify these terms at any time. Your continued use of the website constitutes acceptance of those changes.
          </p>
        </div>
      )
    }
  };

  return (
    <>
      <footer className="bg-gray-900 text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-bold tracking-wider text-primary-400">UP Simantikos</span>
              <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-xs">
                The premier statistical society of the University of the Philippines. Transcending Probabilities, Transforming Communities
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Navigation</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a 
                    href="#about" 
                    onClick={(e) => handleScroll(e, '#about')}
                    className="text-base text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="#events" 
                    onClick={(e) => handleScroll(e, '#events')}
                    className="text-base text-gray-400 hover:text-white transition-colors"
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a 
                    href="#faculty" 
                    onClick={(e) => handleScroll(e, '#faculty')}
                    className="text-base text-gray-400 hover:text-white transition-colors"
                  >
                    Faculty
                  </a>
                </li>
                <li>
                  <a 
                    href="#officers" 
                    onClick={(e) => handleScroll(e, '#officers')}
                    className="text-base text-gray-400 hover:text-white transition-colors"
                  >
                    Officers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => openPolicyModal(e, 'privacy')}
                    className="text-base text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => openPolicyModal(e, 'terms')}
                    className="text-base text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-base text-gray-500">
              &copy; {new Date().getFullYear()} UP Simantikos Statistical Society. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm transition-opacity duration-300"
          onClick={closePolicyModal}
        >
          <div 
            className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] shadow-2xl overflow-hidden flex flex-col animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900">
                {modalContent[activeModal].title}
              </h3>
              <button
                onClick={closePolicyModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              {modalContent[activeModal].content}
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button
                onClick={closePolicyModal}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;