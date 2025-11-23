import React from 'react';
import { ParallaxBanner, ParallaxProvider } from 'react-scroll-parallax';

/**
 * Reusable Card Component
 * @param {object} props
 * @param {string} props.title - The title (e.g., "Trust & Co.")
 * @param {string} props.imageUrl - URL for the card's background image
 * @param {string} props.description - Short description text
 * @param {Array<object>} props.tags - Array of tag objects: [{ name: 'branding', color: 'bg-amber-300', text: 'text-amber-800' }, ...]
 * @param {string} props.iconBgColor - Tailwind class for the icon's background color (e.g., 'bg-[#d3b19a]')
 */
const Card = ({ title, imageUrl, description, tags, iconBgColor }) => {

  const CardIcon = () => (
    <div className={`absolute bottom-[-0.375rem] right-[-0.375rem] w-24 h-24 bg-white rounded-tl-full`}>
      {/* NOTE: Recreating the complex CSS corner shape perfectly with only Tailwind utilities 
        is very difficult. We'll use a simple rounded corner and rely on an absolute element 
        for the icon to give a similar effect. For a perfect match, you'd use a small amount 
        of custom CSS with the "before" and "after" pseudo-elements as in your original.
      */}
      <a href="#" className={`absolute inset-3 ${iconBgColor} rounded-full flex justify-center items-center transition-transform duration-300 hover:scale-110`}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
      </a>
    </div>
  );

  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow-lg transform hover:shadow-2xl transition duration-500 bg-white">
      {/* Card Image Area with Parallax */}
      <div className="relative h-72 rounded-t-xl overflow-hidden">
        <ParallaxBanner
          layers={[
            { image: imageUrl, speed: -15 }, // -15 gives a slight upward movement on scroll
          ]}
          className="aspect-[2/1] h-full"
        />
        <CardIcon />
      </div>
      
      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-2xl font-bold capitalize mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
        <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
          {tags.map((tag, index) => (
            <li
              key={index}
              className={`uppercase text-xs font-bold px-3 py-1 rounded-sm ${tag.color} ${tag.text}`}
            >
              {tag.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;