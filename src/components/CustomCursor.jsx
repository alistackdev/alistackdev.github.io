import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [follower, setFollower] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer (desktop / mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let targetX = -100;
    let targetY = -100;
    let currX = -100;
    let currY = -100;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: targetX, y: targetY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let frameId;
    const updateFollower = () => {
      currX += (targetX - currX) * 0.18;
      currY += (targetY - currY) * 0.18;
      setFollower({ x: currX, y: currY });
      frameId = requestAnimationFrame(updateFollower);
    };
    frameId = requestAnimationFrame(updateFollower);

    // Hover detection for buttons & links
    const handleElementHover = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-interactive="true"]') ||
        target.closest('input') ||
        target.closest('textarea')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mouseover', handleElementHover);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', handleElementHover);
      cancelAnimationFrame(frameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner precise dot */}
      <div
        className="fixed pointer-events-none z-50 w-2 h-2 rounded-full bg-cyan-400 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 shadow-[0_0_10px_#00f2fe]"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />
      {/* Outer follower ring */}
      <div
        className={`fixed pointer-events-none z-50 rounded-full border border-cyan-400/60 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
          isHovering
            ? 'w-12 h-12 bg-cyan-500/10 scale-125 border-cyan-300'
            : 'w-8 h-8 opacity-70'
        }`}
        style={{ left: `${follower.x}px`, top: `${follower.y}px` }}
      />
    </>
  );
}
