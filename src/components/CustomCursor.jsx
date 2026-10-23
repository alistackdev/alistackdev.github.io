import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer (desktop / mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let targetX = -100;
    let targetY = -100;
    let currX = -100;
    let currY = -100;
    let frameId;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }
      setIsVisible(true);
    };

    const updateFollower = () => {
      currX += (targetX - currX) * 0.18;
      currY += (targetY - currY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currX}px, ${currY}px, 0) translate(-50%, -50%)`;
      }
      frameId = requestAnimationFrame(updateFollower);
    };
    frameId = requestAnimationFrame(updateFollower);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const handleHover = (e) => {
      const target = e.target;
      setIsHovering(
        !!(target && (
          target.closest('a') ||
          target.closest('button') ||
          target.closest('[data-interactive="true"]') ||
          target.closest('input') ||
          target.closest('textarea')
        ))
      );
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', handleHover, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleHover);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className={`transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Inner precise dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-50 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f2fe]"
      />
      {/* Outer follower ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-cyan-400/60 transition-[width,height,background-color,border-color] duration-200 ${
          isHovering
            ? 'w-12 h-12 bg-cyan-500/10 border-cyan-300'
            : 'w-8 h-8 opacity-70'
        }`}
      />
    </div>
  );
}
