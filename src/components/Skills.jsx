// import React, { useEffect, useRef } from 'react';
// import './Skills.css'; // Make sure to create this CSS file

// // --- Configuration Data ---
// const TEAM_MEMBERS = [
//     { name: 'THE SQUAD', isDefault: true, id: 0 },
//     { name: 'ALEXANDER', imgSrc: 'image1.jpg', id: 1 },
//     { name: 'BERTRAND', imgSrc: 'image2.jpg', id: 2 },
//     { name: 'CHLOE', imgSrc: 'image3.jpg', id: 3 },
//     { name: 'DAVID', imgSrc: 'image4.jpg', id: 4 },
//     { name: 'EMMA', imgSrc: 'image5.jpg', id: 5 },
//     { name: 'FINN', imgSrc: 'image6.jpg', id: 6 },
//     { name: 'GRACE', imgSrc: 'image7.jpg', id: 7 },
//     { name: 'HENRY', imgSrc: 'image8.jpg', id: 8 },
//     { name: 'ISABELLA', imgSrc: 'image9.jpg', id: 9 },
// ];

// const imageMembers = TEAM_MEMBERS.filter(m => !m.isDefault);
// const nameMembers = TEAM_MEMBERS;

// // --- Load GSAP and SplitText globally (for simple example) ---
// // In a real project, you'd use npm/yarn to install and import.
// if (typeof window !== 'undefined') {
//     const gsapScript = document.createElement('script');
//     gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
//     document.head.appendChild(gsapScript);

//     const splitTextScript = document.createElement('script');
//     splitTextScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js';
//     document.head.appendChild(splitTextScript);
// }


// const TeamDock = () => {
//     // Refs to connect to the DOM elements
//     const teamRef = useRef(null);
//     const imagesContainerRef = useRef(null);
//     const namesRef = useRef([]);

//     // We only initialize GSAP once after the component mounts
//     useEffect(() => {
//         // Wait for GSAP and SplitText to be loaded
//         if (window.gsap && window.SplitText) {
//             window.gsap.registerPlugin(window.SplitText);
//             initializeGSAP();
//         } else {
//             // Fallback for slower load (simple retry)
//             const checkGSAP = setTimeout(() => {
//                 if (window.gsap && window.SplitText) {
//                     window.gsap.registerPlugin(window.SplitText);
//                     initializeGSAP();
//                 }
//             }, 500);
//             return () => clearTimeout(checkGSAP);
//         }
//     }, []);

//     const initializeGSAP = () => {
//         const { gsap, SplitText } = window;
//         if (!gsap || !SplitText) return;

//         const nameHeadings = namesRef.current;
//         let splitTexts = [];

//         // 1. Split All Names into Characters
//         nameHeadings.forEach(h1 => {
//             if (h1) {
//                 let splitResult = new SplitText(h1, { type: 'chars' });
//                 splitTexts.push(splitResult);
//             }
//         });

//         const defaultSplitText = splitTexts[0];
        
//         // 2. Set Initial State for Default Text Letters
//         if (defaultSplitText) {
//             gsap.set(defaultSplitText.chars, { y: '100%' });
//         }


//         // --- 3. Image and Name Hover Interactions ---
//         // Get all image elements directly from the container
//         const imageElements = imagesContainerRef.current.querySelectorAll('.image');
        
//         imageElements.forEach((image, index) => {
//             const targetChars = splitTexts[index + 1]?.chars;

//             // Mouse Enter Logic
//             image.onmouseenter = () => {
//                 // A. Image Scale Up
//                 gsap.to(image, { 
//                     scale: 2, 
//                     duration: 0.5, 
//                     ease: 'power2.out' 
//                 });

//                 // B. Name Text Stagger In
//                 if (targetChars) {
//                     gsap.to(targetChars, {
//                         y: '0%', 
//                         duration: 0.75,
//                         ease: 'power4.out',
//                         stagger: { amount: 0.25, from: 'center' } 
//                     });
//                 }
//             };

//             // Mouse Leave Logic
//             image.onmouseleave = () => {
//                 // A. Image Scale Down (Reverse)
//                 gsap.to(image, { 
//                     scale: 1, 
//                     duration: 0.5, 
//                     ease: 'power2.out' 
//                 });

//                 // B. Name Text Stagger Out (Reverse)
//                 if (targetChars) {
//                     gsap.to(targetChars, {
//                         y: '100%', 
//                         duration: 0.75,
//                         ease: 'power4.out',
//                         stagger: { amount: 0.25, from: 'center' }
//                     });
//                 }
//             };
//         });

//         // --- 4. Container Hover for Default Text ---
//         const container = imagesContainerRef.current;
//         const defaultChars = defaultSplitText.chars;

//         container.onmouseenter = () => {
//             // Default Text Stagger In (The Squad)
//             gsap.to(defaultChars, {
//                 y: '0%', 
//                 duration: 0.75,
//                 ease: 'power4.out',
//                 stagger: { amount: 0.25, from: 'center' }
//             });
//         };

//         container.onmouseleave = () => {
//             // Default Text Stagger Out
//             gsap.to(defaultChars, {
//                 y: '100%', 
//                 duration: 0.75,
//                 ease: 'power4.out',
//                 stagger: { amount: 0.25, from: 'center' }
//             });
//         };
//     };


//     return (
//         <section className="team" ref={teamRef}>
//             {/* Image Dock Container */}
//             <div className="profile-images" ref={imagesContainerRef}>
//                 {imageMembers.map((member, index) => (
//                     <div className="image" key={member.id} style={{ '--index': index }}>
//                         <img src={member.imgSrc || 'placeholder.jpg'} alt={member.name} />
//                     </div>
//                 ))}
//             </div>

//             {/* Name Display Container */}
//             <div className="profile-names">
//                 {nameMembers.map((member, index) => (
//                     <div className="name" key={member.id}>
//                         <h1 
//                             className={member.isDefault ? 'default' : ''}
//                             ref={el => namesRef.current[index] = el} // Ref array for GSAP targeting
//                         >
//                             {member.name}
//                         </h1>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default TeamDock;