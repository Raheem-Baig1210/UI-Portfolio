"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "School Management System (CRM)",
    client: "Dan International Solutions",
    copy: "School CRM is a comprehensive platform designed to help institutions efficiently manage student information, staff records, academic activities, and administrative tasks. It enables school administrators to handle all data securely and streamline daily operations across their institution.",
    color: "bg-black text-white",
    images: [
      "/assets/Dan1.png", // CORRECTED PATH
      "/assets/Dan2.png", // CORRECTED PATH
      "/assets/Dan3.png", // CORRECTED PATH
    ],
    liveProjectUrl: "https://github.com/Raheem-Baig1210/Practice", // Add your live URL here
  },
  {
    title: "Quiz Application",
    client: "Quiz Application",
    copy: "QuizMaster is an interactive quiz application built as my first project, allowing users to answer multiple-choice questions with ease. It presents each question clearly, saves their responses, and displays the final score along with a complete results summary at the end.",
    color: "bg-black text-white",
    images: [
      "/assets/Resume1.png", // CORRECTED PATH
      "/assets/Resume2.png", // CORRECTED PATH
      "/assets/Resume3.png", // CORRECTED PATH
    ],
    liveProjectUrl: "https://raheem-baig1210.github.io/Quiz_Website/", //  live URL here
  },
  {
    title: "MohallaTuition Management Center",
    client: "Innovate Labs",
    copy: [
      "Developed the Muhalla Tuition Center platform using the MERN stack to solve a real-time community problem by digitizing student registration, batch management, and fee tracking. The system streamlines daily operations, improves communication, and provides a centralized dashboard for managing all tuition-related activities efficiently.",
    ],
    color: "bg-black text-white",
    images: [
      "/assets/day2day1.png", // CORRECTED PATH
      "/assets/day2day2.png", // CORRECTED PATH (I assumed you meant a different file name here)
      "/assets/day2day3.png", // CORRECTED PATH (I assumed you meant a different file name here)
    ],
    liveProjectUrl: "https://muhalla-tuition-center.netlify.app/", // Add your live URL here
  },
  {
    title: "Al Özhan Perfumes",
    client: "Al Özhan Perfumes",
    copy: [
      "A full-featured e-commerce storefront for Al Özhan Perfumes, an artisanal perfume and attar brand, with a rich product catalog, cart and checkout flow, and a direct WhatsApp channel for orders. Built with React, Vite, Tailwind CSS, and React Router, deployed on Vercel.",
    ],
    color: "bg-black text-white",
    images: [
      "/assets/Alozhan1.jpg",
      "/assets/Alozhan2.jpg",
      "/assets/Alozhan3.jpg",
    ],
    liveProjectUrl: "https://www.alozhanperfumes.com/",
  },
];

// Helper to get placeholder image - REMOVED: No longer used, but kept for structural integrity
function getImageUrl(title, colorClass) {
  const colorMap = {
    "bg-yellow-300": "FDE047",
    "bg-black": "171717",
    "bg-pink-300": "F9A8D4",
    "bg-green-300": "A7F3D0",
  };
  const primaryColorClass =
    colorClass.split(" ").find((cls) => cls.startsWith("bg-")) || "bg-black";
  let hex = colorMap[primaryColorClass] || "171717";
  const textColor = primaryColorClass === "bg-black" ? "F9A8D4" : "000000";
  return `https://placehold.co/300x500/${hex}/${textColor}/png?text=${title.toUpperCase()}`;
}

export default function ScrollStack() {
  const bgRef = useRef(null);

  useEffect(() => {
    // === Circular Reveal Transition (white → black) ===
    gsap.set(bgRef.current, {
      clipPath: "circle(0% at 50% 50%)",
      backgroundColor: "#000",
    });

    gsap.to(bgRef.current, {
      clipPath: "circle(150% at 50% 50%)",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#scroll-container-wrapper",
        start: "top 80%",
        end: "top 10%",
        scrub: true,
      },
    }); // === Scroll Animation for Cards ===

    const sections = gsap.utils.toArray(".card").reverse();
    const scrollContainer = document.getElementById("scroll-container-wrapper"); // Increased duration slightly for the larger gap
    const stackingScrollDuration = cards.length * 120 + 100;

    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer,
        pin: true,
        start: "top top",
        end: `+=${stackingScrollDuration}vh`,
        scrub: 0.8,
      },
    });

    sections.forEach((card, i) => {
      const zIndex = 100 + i * 5;
      const scaleFactor = 1 - (sections.length - 1 - i) * 0.05; // *** MODIFIED: Increased the yOffset multiplier from 30 to 50 for a bigger gap ***
      const yOffset = (sections.length - 1 - i) * 50;
      const cardIndex = sections.length - 1 - i;
      const startLabel = `cardStart-${cardIndex}`; // Card entrance

      masterTl.fromTo(
        card,
        {
          y: "100%",
          scale: 1.2,
          opacity: 0,
          zIndex: zIndex,
        },
        {
          y: "0%",
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          duration: 1.5,
        },
        i === 0 ? "start" : startLabel
      ); // Stacking

      if (i < sections.length - 1) {
        const stackLabel = `cardStack-${cardIndex}`;
        masterTl.addLabel(stackLabel, startLabel + "+=1.2");
        masterTl.to(
          card,
          {
            y: `${-yOffset}px`,
            scale: scaleFactor,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
            ease: "power1.inOut",
            duration: 1.3,
          },
          stackLabel
        );
        masterTl.addLabel(`cardStart-${cardIndex - 1}`, stackLabel + "+=0.8");
      }
    }); // Cleanup

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative overflow-hidden font-[Inter]">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-white z-0"></div>
      <div
        ref={bgRef}
        className="absolute inset-0 z-10 transition-all duration-1000 ease-in-out"
      ></div>
      {/* Scroll Content */}
      <div
        id="scroll-container-wrapper"
        className="relative z-20 w-full px-4 md:px-8"
      >
        <div className="card-viewport h-screen w-full flex items-center justify-center relative">
          {cards
            .slice()
            .reverse()
            .map((card, index) => {
              // const imageUrl = getImageUrl(card.title, card.color); // Removed
              // const imageUrl2 = getImageUrl(card.title + " Alt 1", card.color); // Removed
              // const imageUrl3 = getImageUrl(card.title + " Alt 2", card.color); // Removed
              
              const cardDisplayNumber = String(cards.length - index).padStart(
                2,
                "0"
              );
              const cardIndex = cards.length - 1 - index;
              const baseZIndex = 10 + index;
              
              // Ensure copy is an array for consistent rendering
              const cardCopy = Array.isArray(card.copy) ? card.copy : [card.copy];


              return (
                <div
                  key={cardIndex}
                  id={`card-${cardIndex + 1}`}
                  style={{ zIndex: baseZIndex }}
                  className={`card absolute top-1/2 left-1/2 transform
                    -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl
                    h-[92vh] md:h-[80vh] rounded-3xl border-2 border-white p-6 md:p-20
                    origin-center ${card.color} overflow-hidden shadow-xl`}
                >
                  {/* Top Bar */}
                  <div className="flex justify-between items-center h-18">
                    <div className="text-white flex items-center">
                      <span
                        className="text-5xl md:text-6xl font-extrabold tracking-tighter"
                        style={{ marginRight: "1rem" }} // 👈 manual space between number and text
                      >
                        {cardDisplayNumber}
                      </span>

                      <div
                        className="flex flex-col justify-center"
                        style={{ marginLeft: "0.5rem" }}
                      >
                        <span className="text-xs font-semibold tracking-wider uppercase opacity-70 text-gray-400">
                          PROJECT
                        </span>
                        <span className="text-sm md:text-base font-bold tracking-wide uppercase text-white">
                          {card.client || card.title}
                        </span>
                      </div>
                    </div>

                    {/* LIVE PROJECT Button - Updated to 'a' tag */}
                    <a 
                      href={card.liveProjectUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs w-30 h-7 font-bold tracking-wider uppercase rounded-full px-6 py-2  hover:bg-white hover:text-black transition-colors flex items-center justify-center" // Added border and flex for style consistency
                    >
                      LIVE PROJECT
                    </a>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col md:flex-row items-center justify-between h-[calc(100%-4rem)] gap-4 md:gap-8 pt-2 overflow-hidden">
                    <div className="flex-1 min-h-0 overflow-y-auto text-center md:text-left space-y-4">
                      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter">
                        {card.title}
                      </h1>
                      {/* Handle array copy for cleaner display */}
                      {cardCopy.map((copy, idx) => (
                        <p key={idx} className="max-w-lg text-sm leading-relaxed opacity-90 text-justify">
                          {copy}
                        </p>
                      ))}
                    </div>

                    {/* Images - Mapped to use the new card.images array */}
                    <div className="flex-shrink-0 flex gap-3 md:gap-4 overflow-x-auto p-2 h-32 sm:h-44 md:h-90 w-full md:w-[80vw] justify-center items-center">
                      {card.images && card.images.map((imageSrc, imgIdx) => (
                        <img
                          key={imgIdx}
                          src={imageSrc}
                          alt={`${card.title} Screenshot ${imgIdx + 1}`}
                          className="rounded-2xl shadow-xl h-full w-auto max-w-[70vw] sm:max-w-xs md:max-w-none md:w-80 md:h-80 object-contain bg-black/40 border border-gray-700 flex-shrink-0"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}