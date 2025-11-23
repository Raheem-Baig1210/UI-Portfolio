import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Utility for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

export const HamburgerMenuOverlay = ({
  items = [],
  buttonTop = "20px",
  buttonLeft = "40px",
  buttonSize = "md",
  buttonColor = "#000000ff",
  overlayBackground = "#000000ff",
  textColor = "#ffffff",
  fontSize = "md",
  fontFamily = '"Krona One", monospace',
  fontWeight = "bold",
  animationDuration = 1.2,
  staggerDelay = 0.1,
  menuAlignment = "center",
  className,
  buttonClassName,
  menuItemClassName,
  keepOpenOnItemClick = false,
  customButton,
  ariaLabel = "Navigation menu",
  onOpen,
  onClose,
  menuDirection = "vertical",
  enableBlur = false,
  zIndex = 50,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonSizes = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const fontSizes = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
    xl: "text-5xl md:text-6xl",
    "2xl": "text-6xl md:text-7xl",
  };

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) onOpen?.();
    else onClose?.();
  };

  const handleItemClick = (item) => {
    if (item.onClick) item.onClick();
    if (item.href && !item.onClick) window.location.href = item.href;
    if (!keepOpenOnItemClick) {
      setIsOpen(false);
      onClose?.();
    }
  };

  // Close menu with ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        onClose?.();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <div
      className={cn(
        "fixed top-5 left-0 w-full h-0 z-[9999]",
        className
      )}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Krona+One:wght@400&display=swap');
          .hamburger-overlay {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: ${overlayBackground};
            z-index: ${zIndex};
            clip-path: circle(0px at ${buttonLeft} ${buttonTop});
            transition: clip-path ${animationDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            ${enableBlur ? "backdrop-filter: blur(10px);" : ""}
          }
          .hamburger-overlay.open {
            clip-path: circle(150% at ${buttonLeft} ${buttonTop});
          }
        `}
      </style>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              "hamburger-overlay open flex flex-col items-center justify-center",
              enableBlur && "backdrop-blur-md"
            )}
            initial={{ clipPath: `circle(0px at ${buttonLeft} ${buttonTop})` }}
            animate={{ clipPath: `circle(150% at ${buttonLeft} ${buttonTop})` }}
            exit={{ clipPath: `circle(0px at ${buttonLeft} ${buttonTop})` }}
            transition={{ duration: animationDuration, ease: "easeInOut" }}
          >
            <motion.ul
              className={cn(
                "space-y-8",
                menuDirection === "horizontal" && "flex flex-wrap space-y-0 space-x-8",
                menuAlignment === "center" && "text-center",
                menuAlignment === "right" && "text-right"
              )}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: staggerDelay },
                },
              }}
            >
              {items.map((item, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "cursor-pointer transition-all duration-300",
                    fontSizes[fontSize],
                    menuItemClassName
                  )}
                  style={{
                    fontFamily,
                    fontWeight,
                    color: textColor,
                  }}
                  onClick={() => handleItemClick(item)}
                >
                  <span className="flex items-center gap-2 justify-center">
                    {item.icon}
                    {item.label}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Circular Button */}
      <button
        className={cn(
          "sticky top-5 left-2 rounded-full mt-5 flex items-center justify-center transition-all duration-300 shadow-md",
          buttonSizes[buttonSize],
          buttonClassName
        )}
        style={{
          background: buttonColor,
          marginLeft: buttonLeft,
          zIndex: zIndex + 1,
        }}
        onClick={toggleMenu}
        aria-label={ariaLabel}
      >
        {customButton ? (
          customButton
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <Menu
              className={cn(
                "absolute transition-all duration-300",
                isOpen
                  ? "opacity-0 rotate-45 scale-0"
                  : "opacity-100 rotate-0 scale-100"
              )}
              size={buttonSize === "sm" ? 16 : buttonSize === "md" ? 20 : 24}
              color={textColor}
            />
            <X
              className={cn(
                "absolute transition-all duration-300",
                isOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-45 scale-0"
              )}
              size={buttonSize === "sm" ? 16 : buttonSize === "md" ? 20 : 24}
              color={textColor}
            />
          </div>
        )}
      </button>
    </div>
  );
};

export default HamburgerMenuOverlay;
