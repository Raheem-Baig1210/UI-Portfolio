import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// FIX: Removed the explicit import which was causing the "Could not resolve" error.

// --- Waveform Bar Component ---
const WaveformBar = ({ index, isPlaying, transition }) => {
  
  // Paused state definition (static small bar)
  const pausedVariants = {
    height: "25%",
    y: "30%", // Pushes the short bar down to visually center it
  };

  // Function to generate a random height (between 20% and 90%)
  const getRandomHeight = () => (Math.random() * 70 + 20) + '%';
  
  // Variants for continuous, randomized playing animation
  const playingVariants = {
    animate: {
      height: [
        getRandomHeight(), 
        getRandomHeight(), 
        getRandomHeight(), 
        getRandomHeight(), 
      ],
      transition: {
        // Shorter, randomized duration for realistic fluctuation
        duration: 0.3 + Math.random() * 0.3, // Faster fluctuation for small size
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: index * 0.05, // Subtle stagger
      }
    }
  };

  return (
    <motion.div
      className="bg-white rounded-full mx-[0.5px]"
      style={{ width: '3px' }} // Smaller width for bars
      // When playing, use the randomized playingVariants, otherwise use the static pausedVariants
      variants={isPlaying ? playingVariants : {}}
      animate={isPlaying ? "animate" : pausedVariants}
      transition={!isPlaying ? transition : undefined} 
      custom={index}
    />
  );
};

// --- Main App Component ---
const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Framer Motion spring configuration for smooth, bouncy animation (used for state toggles)
  const springTransition = {
    type: "spring",
    stiffness: 350,
    damping: 30,
  };

  // Toggle play/pause state and control audio playback
  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Toggle the state first
    setIsPlaying(prev => {
      const newState = !prev;

      if (newState) {
        // Play audio directly on user interaction
        audio.loop = true;
        audio.play().catch(error => {
          console.warn("Audio playback failed (Autoplay prevented):", error);
        });
      } else {
        // Pause the audio
        audio.pause();
      }

      return newState;
    });
  }, []); 

  // Effect to ensure audio cleanup 
  useEffect(() => {
    // Cleanup: pause audio when component unmounts
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  // --- MUSIC SOURCE ---
  // Reverting to the string path which should correctly resolve for the native <audio> tag.
  const audioSource = './Song.mp3'; 
  
  return (
    <div className="min-h-screen bg-gray-900 font-inter">
      
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" />

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={audioSource} preload="auto" />

      {/* --- FIXED POSITION CONTAINER (BOTTOM RIGHT) --- */}
      <div className="fixed bottom-10 right-10 z-50">

        {/* The Play/Pause Button */}
        <motion.button
          onClick={togglePlayPause}
          className="relative w-14 h-14 flex items-center justify-center rounded-full  transition-colors duration-300"
          style={{ 
            background: isPlaying 
              ? 'linear-gradient(145deg, #0d0d0d, #000000)' 
              : 'linear-gradient(145deg, #2b2b2b, #111111)',
            boxShadow: isPlaying
              ? 'inset 4px 4px 8px #000000, inset -4px -4px 8px #1a1a1a' // Inner shadow when playing
              : '8px 8px 16px #0d0d0d, -8px -8px 16px #333333' // Outer shadow when paused
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
        
          <AnimatePresence mode="wait" initial={false}>
            {isPlaying ? (
              // --- VISUALIZER (WHEN PLAYING) ---
              // When playing, the bars are dynamically animated by the WaveformBar component
              <motion.div 
                key="playing-waveform"
                className="flex items-end justify-center h-6 w-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={springTransition}
              >
                {[...Array(4)].map((_, index) => (
                  <WaveformBar 
                    key={`playing-${index}`} 
                    index={index} 
                    isPlaying={true} 
                    transition={springTransition}
                  />
                ))}
              </motion.div>
            ) : (
              // --- STATIC WAVEFORM (WHEN PAUSED) ---
              // When paused, the bars are static, acting as the 'Play' icon.
              <motion.div
                key="paused-waveform"
                className="flex items-end justify-center h-6 w-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={springTransition}
              >
                {[...Array(4)].map((_, index) => (
                  <WaveformBar 
                    key={`paused-${index}`} 
                    index={index} 
                    isPlaying={false} 
                    transition={springTransition}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

export default App;