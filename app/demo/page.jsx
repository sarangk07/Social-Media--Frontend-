'use client'

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
        start: 'top center', // when the top of the trigger hits the center of the viewport
        end: 'bottom top', // when the bottom of the trigger hits the top of the viewport
        scrub: true, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        // enable markers (requires plugin file)
      },
      x: 500, // move the element 500px to the right
      rotation: 360, // rotate the element 360 degrees
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
