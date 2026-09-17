import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the element is 10% visible in the screen, trigger animation
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Unobserve if you only want it to animate once
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Triggers when 10% of the element is visible
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1200 ease-out cubic-bezier(0.16, 1, 0.3, 1) transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-16'
      }`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
