'use client'
//---------------testing page---------------------



import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Demo() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    gsap.to(container, {
      scrollTrigger: {
        trigger: container,
        start: 'top center', 
        end: 'bottom top', 
        scrub: true, 
        
      },
      x: 500, 
      rotation: 360,
      duration: 2
    });
  }, []);

  return (
    <div ref={containerRef} style={{ height: '200vh', background: 'lightblue' }}>
      <div style={{ margin: '0 auto', paddingTop: '100vh', width: '100px', height: '100px', background: 'red' }}>
        Scroll to animate me
      </div>
    </div>
  );
}

export default Demo;
