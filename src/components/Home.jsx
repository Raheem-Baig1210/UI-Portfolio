import React from "react";

const Home = () => {
  return (
    // Main container with gradient and overflow hidden
    <section className="relative min-h-screen bg-gradient-to-br from-yellow-100 via-white to-yellow-50 overflow-hidden font-sans">
      
      {/* --- Text Behind Image --- */}
      {/* This text has a low z-index and opacity to sit in the background */}
      <h1 className="absolute text-[10vw] sm:text-[8vw] md:text-[7vw] font-serif italic text-black/10 select-none z-0 top-24 left-1/2 -translate-x-1/2">
        Hey,&nbsp;&nbsp;&nbsp;&nbsp;there
      </h1>

      {/* --- Profile Image Container --- */}
      {/* Positioned at the bottom center, sitting above the background text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl z-10 flex justify-center">
        <img
          src="src\assets\Ehtesham-removebg-preview.png" // ✅ Replace with your image path
          alt="Syed Ehtesham Ali"
          // Responsive image sizing for different screens
          className="w-72 sm:w-80 md:w-[400px] lg:w-[500px] h-auto object-cover"
        />
      </div>

      {/* --- Main Text Overlay --- */}
      {/* This container holds all the primary text and sits on top of everything (z-20) */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 flex justify-between items-end px-8 md:px-12 z-20">
        
        {/* --- Left Side Text (Name) --- */}
        <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-none text-black">
          <span className="block">I AM</span>
          {/* ✨ POLISHED: Name is split for better visual balance */}
          <span className="block">Syed Ehtesham</span>
          <span className="block">Ali</span>
        </div>

        {/* --- Right Side Text (Title & Specialization) --- */}
        {/* ✨ POLISHED: Grouped specialization and title together using flex-col */}
        <div className="flex flex-col items-end">
          
          {/* ✨ POLISHED: Moved specialization text here to match the target UI */}
          <p className="hidden md:block text-sm text-gray-600 font-semibold leading-relaxed mb-4">
            Specialized in Web Design,<br/>
            UX / UI, Webflow, and Front<br/>
            End Development.
          </p>

          <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-right leading-none text-black">
            <span className="block">DIGITAL</span>
            <span className="block">PRODUCT</span>
            <span className="block">DESIGNER</span>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Home;

