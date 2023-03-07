import { useState, useEffect } from 'react';
import { ArrowCircleUpIcon } from '@heroicons/react/outline';

export default function BackToTop() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 200) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    });
  }, []);

  // This function will scroll the window to the top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // for smoothly scrolling
    });
  }

  return (
    <>
      {showBackToTop && (
        // <div className='fixed bottom-4 left-1/2 z-40 mx-4 -translate-x-1/2 transform rounded-full bg-gray-100 bg-opacity-20 backdrop-blur backdrop-filter dark:bg-neutral-800 dark:bg-opacity-40'>
        <div className='fixed bottom-4 right-4 z-40 rounded-full bg-gray-100 bg-opacity-20 backdrop-blur backdrop-filter dark:bg-neutral-800 dark:bg-opacity-40'>
          <button
            onClick={scrollToTop}
            className='flex items-center gap-1 rounded-full bg-transparent p-1 text-[13px] text-neutral-700 transition-all duration-300 ease-in hover:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-700'
          >
            <ArrowCircleUpIcon className='h-6 w-6' />
            <span className='pr-1'>Back to Top</span>
          </button>
        </div>
      )}
    </>
  );
}
