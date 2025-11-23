import React, { useState } from "react";

// Components
import Preloader from "./components/Preloader";
import PortfolioNav from "./components/PortfolioNav";
import CyberFiction from "./components/CyberFiction";
import CinematicHoverEffect from "./components/CinematicHoverEffect";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import ScrollReveal from "./components/ScrollReveal";
import "./App.css";
import SplashCursor from "./components/SplashCursor";
import TextPressure from "./components/Footer";
import ContactUs from "./components/ContactUs";
import FallingText from "./components/Two";
import { FaWhatsapp } from "react-icons/fa";

function App() {
  const [isSiteEntered, setIsSiteEntered] = useState(false);

  const handleEnterSite = () => setIsSiteEntered(true);

const menuItems = [
  { label: "Home", ariaLabel: "Go to home", href: "#main" },
  { label: "Projects", ariaLabel: "Go to projects", href: "#projects" },
  { label: "Skills", ariaLabel: "Go to skills", href: "#skills" },
  { label: "Experience", ariaLabel: "Go to experience", href: "#experience" },
  { label: "Contact", ariaLabel: "Go to contact", href: "#contact" },
];



  const socialItems = [
    { label: "Twitter", link: "https://twitter.com" },
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      {!isSiteEntered && <Preloader onEnter={handleEnterSite} />}

      {isSiteEntered && (
        <>
          <SplashCursor />

           <PortfolioNav
            position="left"
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor="#000000"
            changeMenuColorOnOpen={true}
            colors={["#B19EEF", "#5227FF"]}
            accentColor="#fff"
          />

          {/* --- WHATSAPP BUTTONS (FIXED BOTTOM-RIGHT) --- */}
          {/* 1️⃣ Personal WhatsApp Chat */}
          <a
            href="https://wa.me/971558850649?text=Hello,%20I'm%20interested%20in%20your%20portfolio%20projects."
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-10 right-4 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
          >
            <FaWhatsapp size={48} />
          </a>

        

          {/* --- MAIN CONTENT --- */}
          <section id="main">
            <CyberFiction />
          </section>

          <section id="projects">
  <Projects />
</section>

<section id= "skills">
   <CinematicHoverEffect />
</section>
         

          <section id="experience">
            <Experience />
          </section>
<section id="contact"
         >
          <ContactUs />
          </section> 

          <TextPressure />

          <div style={{ position: "relative", height: "300px" }}>
            <FallingText
              text={`React, JavaScript (ES6+), TypeScript, Redux, Context API, React Hooks, HTML5, CSS3, Tailwind CSS, Styled Components, Bootstrap, Node.js, Express.js, MySQL, MongoDB, RESTful APIs, Axios, Git, GitHub, Vite, Webpack, Babel, Three.js, GSAP, Framer Motion, Firebase`}
              highlightWords={["React", "Bits", "animated", "components", "simplify"]}
              highlightClass="highlighted"
              trigger="hover"
              backgroundColor="transparent"
              wireframes={false}
              gravity={0.56}
              fontSize="2rem"
              mouseConstraintStiffness={0.9}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
