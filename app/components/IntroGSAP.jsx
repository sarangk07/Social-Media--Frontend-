'use client';

import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import Link from 'next/link';

function IntroGSAP() {
    const welcomeRef = useRef(null)
    const toRef = useRef(null)
    const vmRef = useRef(null)
    const buttonRef = useRef(null)

    useGSAP(() => {
        const tl = gsap.timeline()

        tl.from(welcomeRef.current, {
            x: -150,
            opacity: 0,
            rotation: -45,
            duration: 2,
            ease: 'power3.out',
        })
        .from(toRef.current, {
            y: -200,
            opacity: 0,
            duration: 1,
            ease: 'bounce.out',
        })
        .from(vmRef.current, {
            x: 150,
            opacity: 0,
            rotation: 45,
            duration: 1,
            ease: 'power3.out',
        }, '-=0.5')
        .to(buttonRef.current, {
            boxShadow: '0px 0px 5px 5px rgba(0, 255, 127, 0.3)',
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
        }, '+=0.5')
    }, [])

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-black'>
            <div className='font-mono text-gray-600 flex flex-col items-center justify-center md:w-2/4'>
                <h1 ref={welcomeRef}>WE<span className='text-emerald-400'>L</span>COME</h1>
                <div ref={toRef}>TO</div>
                <div className='text-2xl w-2/4 items-center flex justify-center font-normal' ref={vmRef}>
                    <span className='text-emerald-400'>V</span>irtual <span className='text-emerald-400 pl-2'> M</span>ingle
                </div>
                <br />
                <Link className='rounded-xl text-center bg-emerald-500 p-2 text-gray-800 no-underline' href="./login" ref={buttonRef}>
                    Get Start!
                </Link>
                <br />
            </div>
        </div>
    )
}

export default IntroGSAP
