import React, { useState } from 'react';
// Import Framer Motion, as requested for the Preloader
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

//=================================================================
// Preloader Component (Rebuilt using your Framer Motion version)
//=================================================================

/**
 * The loading screen with animations.
 */
const LoadingScreen = ({ onAnimationComplete }) => {
    const [animationFinished, setAnimationFinished] = useState(false);
    
    const numBars = 10;
    const staggerDelay = 0.09;
    const blindsDuration = 0.8;
    const blindsTotalTime = staggerDelay * numBars + blindsDuration; // Approx time for bars to rise

    // Stagger the animation of the bars
    const blindsContainerVariants = {
        // Initial state is the screen being the off-white background
        initial: {
            backgroundColor: "var(--foreground-color)",
        },
        // 'animate' state runs the blinds up to reveal the black background
        animate: {
            // Immediately transition the container to the final black background 
            // after the bars have started their animation.
            backgroundColor: "var(--background-color)",
            transition: {
                duration: 0.7, 
                delay: blindsDuration * 0.5, // Change bg color halfway through the bar animation
                staggerChildren: staggerDelay,
            },
        },
        // Fade out the whole container on exit (triggered by button click)
        exit: {
            opacity: 0,
            transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1] }
        }
    };

    // Animation for each bar: rising from the bottom
    const barVariants = {
        initial: {
            scaleY: 0, // Start scaled to 0 (invisible)
            transformOrigin: 'bottom',
        },
        animate: {
            scaleY: 1, // Animate to full height (rising effect)
            transformOrigin: 'bottom',
            transition: { 
                duration: blindsDuration, 
                ease: [0.83, 0, 0.17, 1]
            },
        },
    };
    
    // Variants for the text content container
    const contentVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { 
                duration: 0.5, // Quick fade-in for the container
                delay: blindsDuration, // Start after the blinds have finished rising
                when: "beforeChildren", // Wait for children's staggered animation to start
                staggerChildren: 0.15, // Stagger text elements
            } 
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    // FIX: Variants for the text elements (h1 and p) to slide from downwards
    const textVariants = {
        initial: { y: '100%', opacity: 0 }, // Start off-screen below
        animate: { 
            y: 0, // Slide up to final position
            opacity: 1,
            transition: { 
                duration: 0.6, 
                ease: [0.6, -0.05, 0.01, 0.9] // Custom springy ease
            }
        },
    };
    
    // Variants for the Enter button (slightly later fade-in)
    const buttonVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.00, 
                delay: 0.00 // Delay button after text has appeared
            } 
        },
        exit: { opacity: 0 }
    };

    return (
        <motion.div
            className="preloader-container"
            variants={blindsContainerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onAnimationComplete={() => setAnimationFinished(true)} // Fires after 'animate' completes
        >
            {/* The animated bars */}
            <motion.div
                className="blinds"
                // No variants needed here as they are on the children (bar)
            >
                {Array.from({ length: numBars }).map((_, i) => (
                    <motion.div key={i} className="bar" variants={barVariants} />
                ))}
            </motion.div>

            {/* Content that slides/fades in on top */}
            <motion.div
                className="final-logo-container"
                variants={contentVariants}
            >
                {/* H1 Text Animation (Slides Up) */}
                <motion.h1 variants={textVariants}>
                    Raheem Baig
                </motion.h1>
                
                {/* P Text Animation (Slides Up) */}
                <motion.p variants={textVariants}>
                    FULL STACK DEVELOPER
                </motion.p>
                
                <AnimatePresence>
                    {animationFinished && (
                        <motion.button
                            className="enter-button"
                            onClick={onAnimationComplete} // Triggers the final exit
                            variants={buttonVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            ENTER <span className="arrow">→</span>
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>

        </motion.div>
    );
};

/**
 * The Preloader component that manages the loading state.
 */
const Preloader = ({ onEnter }) => {
    const [isLoading, setIsLoading] = useState(true);

    // This function will be triggered by the button click
    const handleEnter = () => {
        setIsLoading(false); // This triggers the exit animation
        
        // We wait for the exit animation (0.8s) to complete
        // before calling onEnter to unmount it.
        setTimeout(() => {
            if (onEnter) {
                onEnter();
            }
        }, 800); 
    };

    return (
        // AnimatePresence handles the 'exit' animation
        <AnimatePresence>
            {isLoading && <LoadingScreen onAnimationComplete={handleEnter} />}
        </AnimatePresence>
    );
};

export default Preloader;