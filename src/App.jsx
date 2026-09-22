import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isSiteEntered, setIsSiteEntered] = useState(false);
  // The WebGL fluid cursor runs a continuous render loop forever and is a
  // mouse-hover effect, so it's both pointless and a battery/GPU drain on
  // touch devices — skip mounting it there entirely.
  const [isTouchDevice] = useState(
    () =>
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );

  const handleEnterSite = () => setIsSiteEntered(true);

  // Single, site-wide smooth-scroll instance driven by GSAP's ticker so it
  // stays in sync with every ScrollTrigger animation across the page.
  useEffect(() => {
    if (!isSiteEntered) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [isSiteEntered]);

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
          {!isTouchDevice && <SplashCursor />}

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
            href="https://wa.me/919959014994?text=Hello,%20I'm%20interested%20in%20your%20portfolio%20projects."
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
              text={`React, Next.js, JavaScript (ES6+), TypeScript, Redux, Context API, React Hooks, HTML5, CSS3, Tailwind CSS, Styled Components, Bootstrap, Node.js, Express.js, MySQL, MongoDB, RESTful APIs, Axios, Git, GitHub, Vite, Webpack, Babel, Three.js, GSAP, Framer Motion, Firebase`}
              highlightWords={["React", "Bits", "animated", "components", "simplify"]}
              highlightClass="highlighted"
              trigger="scroll"
              backgroundColor="transparent"
              wireframes={false}
              gravity={0.56}
              fontSize="clamp(1.1rem, 3vw, 2rem)"
              mouseConstraintStiffness={0.9}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
