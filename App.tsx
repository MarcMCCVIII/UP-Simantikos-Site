import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Faculty from './components/Faculty';
import Officers from './components/Officers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Volume2, VolumeX } from 'lucide-react';

const App: React.FC = () => {
  // 0: Initial, 1: Logo/Text Appear, 2: Fade Out, 3: Finished
  const [animationStage, setAnimationStage] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Animation Sequence
  useEffect(() => {
    const startTimer = setTimeout(() => setAnimationStage(1), 100);
    const exitTimer = setTimeout(() => setAnimationStage(2), 2500);
    const removeTimer = setTimeout(() => setAnimationStage(3), 3500);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const isLoading = animationStage < 3;

  // Music Toggle Logic
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch((e) => {
        console.warn("Playback prevented or failed:", e);
      });
    } else {
      audio.pause();
    }
  };

  // Attempt auto-play on first user interaction to satisfy browser policies
  useEffect(() => {
    const startAudioOnInteraction = () => {
      const audio = audioRef.current;
      if (audio && audio.paused) {
        audio.volume = 0.3;
        audio.play()
          .then(() => setIsMusicPlaying(true))
          .catch(() => console.log("Autoplay blocked - waiting for manual toggle"));
      }
    };

    if (!isLoading) {
      window.addEventListener('click', startAudioOnInteraction, { once: true });
    }
    return () => window.removeEventListener('click', startAudioOnInteraction);
  }, [isLoading]);

  return (
    <>
      {/* Background Audio - Priority given to reliable source Helix */}
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        onPlay={() => setIsMusicPlaying(true)}
        onPause={() => setIsMusicPlaying(false)}
      >
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3" type="audio/mpeg" />
        <source src="https://www.bensound.com/bensound-music/bensound-smoothjazz.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Music Control */}
      {!isLoading && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-white/95 backdrop-blur-md rounded-full shadow-2xl border border-gray-100 hover:bg-white text-primary-600 transition-all duration-300 hover:scale-110 focus:outline-none group overflow-hidden"
          aria-label={isMusicPlaying ? "Mute Music" : "Play Music"}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Play/Audio Icon (Visible when playing) */}
            <div className={`absolute transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) transform ${
              isMusicPlaying ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90 pointer-events-none'
            }`}>
              <div className="relative flex items-center justify-center">
                <Volume2 size={28} />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-primary-500"></span>
                </span>
              </div>
            </div>

            {/* Mute Icon (Visible when paused) */}
            <div className={`absolute transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) transform ${
              !isMusicPlaying ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90 pointer-events-none'
            }`}>
              <VolumeX size={28} className="text-gray-400" />
            </div>
          </div>
        </button>
      )}

      {/* Intro Animation Overlay */}
      {isLoading && (
        <div 
          className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${
            animationStage === 2 ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="relative flex flex-col items-center">
            <div 
              className={`relative w-32 h-32 md:w-40 md:h-40 mb-6 rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-1000 ease-out ${
                animationStage >= 1 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-75 translate-y-10'
              }`}
            >
              <img 
                src="https://i.imgur.com/ACeGJEd.jpeg" 
                alt="UP Simantikos Logo" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center overflow-hidden">
               <h1 
                className={`text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2 transform transition-all duration-1000 delay-300 ease-out ${
                  animationStage >= 1 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-20 opacity-0'
                }`}
               >
                 UP Simantikos
               </h1>
               <p 
                className={`text-lg md:text-xl text-primary-600 font-medium uppercase tracking-widest transform transition-all duration-1000 delay-500 ease-out ${
                  animationStage >= 1 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
               >
                 Statistical Society
               </p>
            </div>
            
            <div className={`mt-12 h-1 bg-gray-100 rounded-full w-48 overflow-hidden transition-opacity duration-500 ${animationStage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="h-full bg-primary-500 animate-[width_2s_ease-in-out_forwards]" style={{ width: '0%', animationName: 'growWidth' }}></div>
            </div>
          </div>
          
          <style>{`
            @keyframes growWidth {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `}</style>
        </div>
      )}

      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Events />
          <Faculty />
          <Officers />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;