// components/GsapDemo.jsx

'use client'



import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const GsapDemo = () => {
  const containerRef = useRef();
  const topDivRef = useRef();
  const bottomDivRef = useRef();

  useGSAP(() => {
    gsap.from(topDivRef.current, { y: -200, duration: 2 }); // Animate from the top
    gsap.from(bottomDivRef.current, { y: 200, duration: 2 }); // Animate from the bottom
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col items-center space-y-4">
      <div
        ref={topDivRef}
        className='h-28 w-28 bg-blue-600'
      >
        Top Div
      </div>
      <div
        ref={bottomDivRef}
        className='h-28 w-28 bg-green-600'
      >
        Bottom Div
      </div>
    </div>
  );
};

export default GsapDemo;