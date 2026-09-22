import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";

const customStyles = `
  /* Global CSS for full width marquee */
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  .marquee-container {
    overflow: hidden;
    white-space: nowrap;
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }

  .marquee-content {
    display: inline-block;
    animation: marquee 15s linear infinite;
    /* Duplicate content for seamless loop */
    padding-right: 200px;
  }

  /* Custom Form Styles */
  .form-input-style {
    appearance: none;
    background: transparent;
    border: none;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    color: white;
    width: 100%;
    padding: 0.75rem 0;
    font-size: 1rem;
    transition: border-bottom-color 0.3s ease;
  }

  .form-input-style:focus {
    outline: none;
    border-bottom-color: white;
  }

  .form-input-label {
    display: block;
    margin-bottom: 0.5rem;
    color: #a0aec0;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

// Moved outside to prevent re-creation on every parent render
const MarqueeText = ({ text }) => (
  <div className="marquee-container  bg-black">
    <div className="marquee-content">
      <span
        className="text-5xl sm:text-7xl lg:text-[120px] xl:text-[150px] font-extrabold tracking-tight text-white uppercase"
        style={{ letterSpacing: "-0.04em" }}
      >
        {text}
      </span>
      <span
        className="text-5xl sm:text-7xl lg:text-[120px] xl:text-[150px] font-extrabold tracking-tight text-white uppercase"
        style={{ letterSpacing: "-0.04em" }}
      >
        &nbsp;&nbsp;&nbsp;&nbsp;{text}
      </span>
    </div>
  </div>
);

// MOVED OUTSIDE ContactForm - FIXES THE TYPING BUG
// This is now a stable, reusable component.
const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div className="py-4">
    <label htmlFor={name} className="form-input-label">
      {label}
    </label>
    {name === "message" ? (
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="form-input-style resize-none h-24" // Added h-24 for message
        required
      />
    ) : (
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="form-input-style"
        required
      />
    )}
  </div>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionMessage("");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/raheembaig825@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            company: formData.company,
            email: formData.email,
            message: formData.message,
            _subject: "New portfolio contact request",
          }),
        }
      );

      if (!response.ok) throw new Error("Request failed");

      setSubmissionMessage("Request sent! I'll get back to you soon.");
      setFormData({ name: "", company: "", email: "", message: "" });
    } catch (error) {
      setSubmissionMessage(
        "Something went wrong. Please email me directly instead."
      );
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmissionMessage(""), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 mt-12">
      {/* Submission Message Box */}
      {submissionMessage && (
        <div className="bg-green-600 text-white p-3 rounded-md text-center mb-4 transition-opacity duration-300 opacity-100">
          {submissionMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
        {/* Now using the external InputField and passing state/handler */}
        <InputField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        {/* Message field is now explicitly a textarea */}
        <InputField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full text-4xl sm:text-5xl font-extrabold text-white uppercase mt-20 flex justify-between items-center group border-b-4 border-white pb-1 hover:text-white hover:border-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "SENDING..." : "SEND REQUEST"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8 sm:w-10 transform translate-x-0 group-hover:translate-x-2 transition duration-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </button>
    </form>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Inject custom styles */}
      <style>{customStyles}</style>

      <MarqueeText text="CONTACT ME HERE / CONTACT ME HERE" />

      {/* Main Content Area */}
      <div className="p-4 lg:p-8 max-w-7xl mx-auto px-2">
        {/* Stacked on mobile/tablet, side-by-side from md up */}
        <div className="flex flex-col md:flex-row items-start pt-16 gap-10 md:gap-12">
          {/* LEFT SIDE - Info */}
          <div className="w-full md:w-1/2">
            <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight max-w-xl">
              Let’s build something impactful together. Reach out!
            </p>

            <div className="space-y-8 py-8">
              <div>
                <h4 className="text-gray-400 text-sm tracking-widest uppercase mb-5 font-medium">
                  Links
                </h4>
                <div className="flex space-x-6 text-2xl">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/raheem-baig-407574273/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors"
                  >
                    <i className="ri-linkedin-box-fill"></i>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/Raheem-Baig1210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400 transition-colors"
                  >
                    <i className="ri-github-fill"></i>
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div>
                  <h4 className="text-gray-400 text-sm tracking-widest uppercase mb-2 font-medium">
                    Get In Touch
                  </h4>
                  <a
                    href="mailto:raheembaig825@gmail.com"
                    className="text-lg font-bold break-all hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    raheembaig825@gmail.com
                  </a>
                </div>

                <div>
                  <h4 className="text-gray-400 text-sm tracking-widest uppercase mb-2 font-medium">
                    Location
                  </h4>
                  <p className="text-lg font-bold">
                    Hyderabad, Telangana, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Form */}
          <div className="w-full md:w-1/2 mt-4">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
