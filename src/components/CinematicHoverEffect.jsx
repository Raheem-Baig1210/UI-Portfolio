import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Placeholder data for the carousel
const carouselItems = [
  { id: 1, text: "REACT", thumbnail: "https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png" },
  { id: 2, text: "NODE JS", thumbnail: "https://images.seeklogo.com/logo-png/27/1/node-js-logo-png_seeklogo-273749.png" },
  { id: 3, text: "MY SQL", thumbnail: "https://pngimg.com/d/mysql_PNG9.png" },
  { id: 4, text: "MONGO DB", thumbnail: "https://images.seeklogo.com/logo-png/27/1/mongodb-logo-png_seeklogo-273731.png" },
  { id: 5, text: "HTML", thumbnail: "https://logowik.com/content/uploads/images/492_html5.jpg" },
  { id: 6, text: "CSS", thumbnail: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_1280.png" },
  { id: 7, text: "JAVA SCRIPT", thumbnail: "https://static.vecteezy.com/system/resources/thumbnails/001/416/690/small/js-emblem-orange-shield-and-white-text-vector.jpg" },
  
];

// Default text when no item is hovered
const defaultText = "SKILLS";

// Main App Component
const App = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  // Removed the 'coords' state as the ImagePreview is no longer used.

  const currentText = hoveredItem ? hoveredItem.text : defaultText;

  const handleMouseEnter = (item) => {
    // Only setting the hovered item, no need for coordinate calculation anymore.
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 overflow-hidden font-['Inter']">
      
      {/* The Image Preview Container has been removed per your request. */}

      {/* Thumbnail Bar */}
      <nav className="flex space-x-2 md:space-x-4 mb-20 md:mb-40 z-10 p-2 bg-black">
        {carouselItems.map((item) => (
          <div
            key={item.id}
            className="relative cursor-pointer group"
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
          >
            <motion.img
              src={item.thumbnail}
              alt={item.text}
              className={`w-12 h-12 md:w-16 md:h-16 rounded-full object-cover transition-all duration-300 ring-2 ${
                hoveredItem?.id === item.id ? 'ring-white scale-110 shadow-lg' : 'ring-[#222222] hover:ring-white/50'
              }`}
              onError={(e) => e.target.src = "https://placehold.co/60x60/555/ffffff?text=Err"}
            />

            {/* Hover Indicator (Red Circle with White Arrow) - Still displayed */}
            {hoveredItem?.id === item.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  scale: [1, 1.1, 1], // Subtle pulse
                  y: [-3, 3, -3], // Slight float up and down
                  rotate: [0, 2, -2, 0] // Gentle wiggle
                }}
                transition={{
                  scale: { duration: 0.3, ease: "easeOut" },
                  y: { duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                  rotate: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                }}
                className="absolute -top-3 -right-2 pointer-events-none z-40" // Positioned top right, off-center
              >
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-xl border-2 border-white">
                  {/* Up arrow SVG */}
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7"></path>
                  </svg>
                </div>
              </motion.div>
            )}
            
          </div>
        ))}
      </nav>

      {/* Large Title Text (The main visual element) */}
      <div className="relative w-full h-[250px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentText}
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`
              absolute text-center 
              text-[100px] sm:text-[120px] md:text-[180px] lg:text-[250px] 
              font-extrabold leading-none tracking-wide 
              ${hoveredItem ? 'text-red-600' : 'text-white'} 
              transition-colors duration-300
            `}
            style={{ fontFamily: 'Impact, Arial Black, sans-serif' }} // Use Impact or a similar bold font
          >
            {currentText}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Footer/Context Text */}
      <motion.p 
        className="text-gray-500 mt-20 text-sm tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Hover over the thumbnails to change the title.
      </motion.p>
    </div>
  );
};

export default App;