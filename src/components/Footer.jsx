import React from "react";
import { Github, Linkedin } from "lucide-react";

// Main component, adhering to the requirement that the main component must be named App
const App = () => {
  const profile = {
    name: "Mirza Raheem Baig",
    githubUrl: "https://github.com/Raheem-Baig1210", // Placeholder URL
    linkedinUrl: "https://www.linkedin.com/in/raheem-baig-407574273/", // Placeholder URL
  };

  // Define a reusable large link component
  const FooterLink = ({ href, Icon, text }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // Large text size, responsive padding and hover effects
      className="flex items-center space-x-3 text-3xl md:text-5xl font-extrabold p-3 transition-colors duration-300 hover:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-lg"
    >
      <Icon className="w-8 h-8 md:w-12 md:h-12" aria-hidden="true" />
      <span className="truncate">{text}</span>
    </a>
  );

  return (
    // Outer container: Black background, white text, Inter font (default Tailwind sans)
    <footer className="bg-black text-white font-sans w-full p-8 md:p-16 min-h-64 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* HUGE NAME SECTION */}
       

        {/* Separator Line (Black and White only) */}
        {/* <hr className="border-t-2 border-neutral-700 mb-20 md:mb-16" /> */}

        {/* SOCIAL LINKS SECTION */}
        <div className="flex flex-col md:flex-row md:justify-between space-y-8 md:space-y-0 ">
          <div className="flex flex-col space-y-4">
           

             <h1 className="font-['Great_Vibes'] text-5xl md:text-7xl tracking-tight">
          {profile.name}
        </h1>
          </div>

          {/* CONTACT INFO (Optional secondary text) */}
          <div className="flex flex-col text-neutral-400 text-lg md:text-xl md:text-right space-y-1 mt-8 md:mt-0">
            <p className="font-semibold">Get in Touch:</p>
            <p className="text-neutral-500">raheembaig825@gmail.com</p>{" "}
            {/* Placeholder email */}
            <p className="pt-4 text-sm">
              &copy; {new Date().getFullYear()} Mirza Raheem Baig
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default App;
