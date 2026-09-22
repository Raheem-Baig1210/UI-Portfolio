import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- DATA ---
const timelineData = [
{
  title: "Software Developer",
  subtitle: "Namya IT · Hyderabad, Telangana, India",
  duration: "October 2025 - Present",
  description: [
    "Working as a Software Developer at Namya IT, based in Hyderabad, Telangana, India, building production web applications across the full stack.",
    "Developing responsive, high-performance user interfaces with React and Next.js, styled with Tailwind CSS and animated using GSAP and Framer Motion.",
    "Designing and consuming RESTful APIs, and building server-side logic with Node.js and Express.js backed by MySQL and MongoDB.",
    "Collaborating closely with designers, product owners, and fellow developers in an agile workflow to turn requirements into shipped features.",
    "Writing clean, modular, and reusable code, and participating in code reviews to maintain quality and consistency across the codebase.",
    "Debugging issues, optimizing application performance, and improving load times and overall user experience.",
    "Using Git and GitHub for version control and collaborative development within the team.",
  ],
},

{
  title: "Full Stack Developer",
  subtitle: "Career Guidance Council (CGC)",
  duration: "November 2024 - October 2025",
  description: [
    "Developed and deployed real-world web applications using the MERN stack (MySQL, Express.js, React, Node.js).",
    "Built 'Muhalla Tuition Center', Which solved the real problem,that is marking of attendance, tracking the tutors and many more . ",
    "Designed and implemented the Lead Management System (LMS) to streamline lead tracking and conversion workflows.",
    "Integrated RESTful APIs for seamless data exchange and automated website form submissions.",
    "Implemented cron jobs for background data updates, reducing redundant API calls and improving system performance.",
    "Ensured responsive UI, optimized database queries, and maintained clean, reusable code using Git for version control.",
    "Resolved bugs, optimized performance, and maintained application stability through continuous monitoring.",
  ],
},

// {
//   title: "Frontend Developer",
//   subtitle: "Aqib Softech - A Digital Marketing Agency",
//   duration: "Sep 2023 - Oct 2024",
//   description: [
//     "Developed high-performing, accessible UIs with React.js, Tailwind CSS, and GSAP for fluid motion experiences.",
//     "Built an AI-Powered Resume Builder using React, TypeScript, Tailwind CSS, and Supabase — integrated Google Gemini AI for smart resume generation with authentication and real-time editing.",
//   ],
// },

 {
  title: "Bachelor of Technology - Computer Science Engineering",
  subtitle: "Lord's Institute of Engineering and Technology",
  duration: "Jul 2021 - Jul 2025",
  description: [
    "Focused on core subjects including Data Structures, Algorithms, Database Management Systems, and Software Engineering.",
    "Gained hands-on experience in modern web technologies such as React, Node.js, and MySQL through academic and personal projects.",
    "Collaborated on team projects emphasizing clean code practices, scalable architecture, and UI/UX design principles.",
    "Participated in hackathons and coding challenges, strengthening problem-solving and full-stack development skills.",
    "Built and deployed multiple real-world applications as part of final-year and side projects.",
  ],
},

 {
  title: "Intermediate (MPC)",
  subtitle: "Narayana Junior College",
  duration: "Jun 2019 - Mar 2021",
  description: [
    "Excelled in Mathematics, Physics, and Chemistry with a focus on analytical and problem-solving skills.",
    "Developed a strong foundation in logical reasoning and quantitative aptitude, essential for computer science studies.",
    "Actively participated in academic competitions and group projects, enhancing teamwork and communication abilities.",
    "Consistently maintained top performance in mathematics and physics, demonstrating precision and critical thinking.",
  ],
},

];

// 💡 HELPER: Calculates the necessary end offset to stop the animation
const calculateEndOffset = (timelineDataLength, cardSpacingVh = 45, headerHeightVh = 5) => {
  const distanceVh = (timelineDataLength - 1) * cardSpacingVh;
  return `${headerHeightVh + distanceVh + 20}vh`; // e.g., 5vh + 135vh + 20vh = 160vh
};

// --- TIMELINE CARD COMPONENT ---
const TimelineCard = ({ item, i }) => {
  // Since you requested centered cards, we don't need the isLeft logic for justification,
  // but we'll use a placeholder for potential future alternating styles.
  const isLeft = i % 2 === 0;

  return (
    <motion.div
      key={i}
      // 1. Centered layout
      className="timeline-card relative flex justify-center w-full"
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }} // Simplified scale/rotation since the card is centered
        transition={{ duration: 0.6 }}
        // 2. Card Styling: Wider card (60%) and removed padding
        className="w-[90%] md:w-[60%] min-h-[420px] rounded-3xl
          bg-gradient-to-br from-[#141414]/80 to-[#1c1c1c]/90 backdrop-blur-xl 
          shadow-[0_0_30px_rgba(255,255,255,0.2)] relative overflow-hidden transition-all duration-700
          hover:shadow-[0_0_60px_rgba(255,255,255,0.35)]"
      >
        {/* Accent gradient ring - position adjusted for centered card aesthetic */}
        <div
          className={`absolute w-48 h-48 bg-lime-400/10 rounded-full blur-3xl ${
            isLeft ? "-left-16 -top-10" : "-right-16 -bottom-10"
          }`}
        ></div>

        {/* 3. Inner Content Block: Uses 'm-4' for the thick black border look, and 'text-center' */}
        <div
          className="relative z-10 m-4 p-7 md:p-10  bg-transparent space-y-5
          text-center" // <-- Centers metadata
        >
          <h3 className="text-3xl font-bold  mb-3 bg-white bg-clip-text text-transparent leading-snug">
            {item.title}
          </h3>

          <p className="text-lg font-semibold text-gray-300 mb-2">
            {item.subtitle}
          </p>

          <p className="text-sm text-gray-500 mb-4">{item.duration}</p>

          {/* 4. Description Paragraph: Uses 'text-justify' and 'mx-auto' to keep it centered within the box */}
          <p className="text-gray-400 leading-relaxed text-lg text-justify mx-auto max-w-4xl">
            {item.description}
          </p>
        </div>

        {/* Accent underline */}
        <span
          className={`absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-lime-400 to-emerald-400 transition-all duration-700 hover:w-full`}
        ></span>
      </motion.div>
    </motion.div>
  );
};

// --- MAIN EXPERIENCE COMPONENT ---
const Experience = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", calculateEndOffset(timelineData.length)],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      id="experience"
      className="relative flex flex-col items-center justify-start w-full min-h-[420vh] bg-black text-white overflow-hidden"
    >
      
      {/* 📌 STICKY TITLE CONTAINER */}
      <div className="sticky top-0 h-40 w-full flex flex-col items-center justify-center pointer-events-none z-20 bg-black/80 backdrop-blur-sm">
        
        {/* 🌟 Title */}
        <motion.h2
          className="text-6xl md:text-7xl font-extrabold text-center tracking-tight 
              bg-white to-emerald-300 bg-clip-text text-transparent pointer-events-auto mt-0"
        >
          My Journey
        </motion.h2>
      </div>

      {/* 🌊 Flowing Line */}
      <LinePath
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        pathLength={pathLength}
      />

      {/* ✨ Floating Particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(30)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute block w-2 h-2 bg-white rounded-full blur-[2px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 🌐 Timeline Cards */}
      <div className="relative flex flex-col gap-[45vh] w-full max-w-7xl px-6 py-4 z-10 mt-[5vh] mb-[50vh]">
        {timelineData.map((item, i) => (
          <TimelineCard key={i} item={item} i={i} />
        ))}
      </div>

    </section>
  );
};

export default Experience;

// 🌀 Flowing gradient SVG line (Lusion-style)
const LinePath = ({ className, pathLength }) => {
  return (
    <svg
      viewBox="0 0 1600 2000" 
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="limeFlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffffff" />
          <stop offset="50%" stopColor="#e1e1e1ff" />
          <stop offset="100%" stopColor="#f0f0f0ff" />
        </linearGradient>
      </defs>

      <motion.path
        d="
          M150 150 
          C500 250, 1000 350, 1200 500 
          C1300 600, 800 800, 400 1050 
          C200 1200, 900 1350, 1200 1500 
          C1400 1650, 600 1700, 300 1850
        "
        stroke="url(#limeFlow)"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength }}
      />
    </svg>
  );
};