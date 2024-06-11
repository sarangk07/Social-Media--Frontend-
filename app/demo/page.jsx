'use client'
import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

function Demo() {
  const helloRef = useRef(null)
  const guysRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.from(helloRef.current, {
      x: -200,
      opacity: 0,
      rotation: -45,
      duration: 1,
      ease: 'power3.out',
    })
    .from(guysRef.current, {
      x: 200,
      opacity: 0,
      rotation: 45,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.5')
  }, [])

  return (
    <div className='flex flex-col justify-center items-center w-full h-screen'>
      <div className='flex justify-center items-center flex-col h-2/4'>
        <h1 ref={helloRef}>hello</h1>
        <h2 ref={guysRef}>guys</h2>
      </div>
      <div className='flex flex-col justify-center items-center h-2/4'>
        <p>
          img
        </p>
      </div>
    </div>
  )
}

export default Demo
