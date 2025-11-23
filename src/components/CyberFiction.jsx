import React, { useEffect, useRef } from "react";
import "./CyberFiction.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const CyberFiction = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const frameCount = 143;

    // ✅ Images MUST be inside: public/Images/
    const currentFrame = (index) =>
      `/Images/male${String(index + 1).padStart(4, "0")}.png`;

    const images = [];
    const imageSeq = { frame: 0 };

    // preload
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    function render() {
      const img = images[Math.floor(imageSeq.frame)];
      if (!img || !img.complete) return;

      const { width, height } = canvas;
      const hRatio = width / img.width;
      const vRatio = height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShiftX = (width - img.width * ratio) / 2;
      const centerShiftY = (height - img.height * ratio) / 2;

      context.clearRect(0, 0, width, height);
      context.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShiftX,
        centerShiftY,
        img.width * ratio,
        img.height * ratio
      );
    }

    images[0].onload = render;

    // ✅ Canvas scroll animation
    gsap.to(imageSeq, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: canvas,
        start: "top top",
        end: "600% top",
        scrub: 0.2,
        pin: true,
        onUpdate: render,
      },
    });

    // ✅ Pin next pages
    ["#page1", "#page2", "#page3"].forEach((id) => {
      ScrollTrigger.create({
        trigger: id,
        start: "top top",
        end: "bottom top",
        pin: true,
        scrub: true,
      });
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ScrollTrigger.killAll();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} id="main">
      <div id="page">
        <div id="loop">
          {[...Array(3)].map((_, i) => (
            <h1 key={i}>
              <b>FULL</b>STACK{" "}
              <b>
                <i>DEVELOPER</i>
              </b>{" "}
              <span>FULL</span> STACK{" "}
              <span>
                <i>DEVELOPER.</i>
              </span>
            </h1>
          ))}
        </div>

        <h3>
Results-driven developer with 2 years of experience in <br />full-stack and frontend development. Skilled in React, Node.js, and <br /> MySQL,  with a strong foundation in building scalable, <br /> user-focused web apps and collaborating effectively to deliver <br /> impactful solutions.
         
        </h3>
        <h4 className="mt-4">..SCROLL TO READ</h4>

        <canvas ref={canvasRef}></canvas>
      </div>

      {/* SECTION 1 */}
      <div id="page1">
        <div id="right-text" className="text-2xl">
          <h3>REACT</h3>
          <h1>
            NODE.JS
            <br />
            EXPRESS.JS
            <br />
            JAVA SCRIPT
          </h1>
        </div>
        <div id="left-text" className="text-2xl">
          <h1>
            HTML5
            <br />
            CSS3
            <br />
            TAILWIND CSS
          </h1>
          <h3> BOOT STRAP </h3>
        </div>
      </div>

      {/* SECTION 2 */}
      <div id="page2">
        <div id="text1" className="text-2xl">
          <h3>MONGO DB</h3>
          <h1>
            MY SQL
            {/* <br />
            Graph QL
            <br /> */}
          </h1>
        </div>
      </div>

      {/* SECTION 3 */}
      <div id="page3">
        <div id="text3" className="text-2xl">
          <h3>GSAP</h3>
          <h1>
            MATERIAL UI (MUI)
            <br />
            ANT DESIGN
            <br />
            REDUX
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CyberFiction;
