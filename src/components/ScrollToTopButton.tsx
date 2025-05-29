import React, { useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    setVisible(scrolled > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow-lg transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      aria-label="맨 위로"
    >
      <IoIosArrowUp size={24} />
    </button>
  );
};

export default ScrollToTopButton;
