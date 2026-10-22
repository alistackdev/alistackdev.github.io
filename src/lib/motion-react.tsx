import React, { useState, forwardRef } from "react";

interface MotionProps extends React.HTMLAttributes<HTMLDivElement> {
  whileTap?: { scaleX?: number; scaleY?: number; scale?: number };
  whileHover?: { scaleX?: number; scaleY?: number; scale?: number };
  transition?: {
    type?: string;
    duration?: number;
    ease?: number[] | string;
  };
}

const MotionDiv = forwardRef<HTMLDivElement, MotionProps>(
  ({ whileTap, whileHover, transition, style, onPointerDown, onPointerUp, onPointerLeave, onMouseEnter, onMouseLeave, children, ...rest }, ref) => {
    const [isTapped, setIsTapped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const duration = transition?.duration ?? 0.4;
    const easeArray = Array.isArray(transition?.ease) ? transition.ease : [0.34, 1.56, 0.64, 1];
    const easingCss = `cubic-bezier(${easeArray.join(",")})`;

    let transform = style?.transform || "";
    if (isTapped && whileTap) {
      const sx = whileTap.scaleX ?? whileTap.scale ?? 1;
      const sy = whileTap.scaleY ?? whileTap.scale ?? 1;
      transform = `${transform} scaleX(${sx}) scaleY(${sy})`.trim();
    } else if (isHovered && whileHover) {
      const sx = whileHover.scaleX ?? whileHover.scale ?? 1;
      const sy = whileHover.scaleY ?? whileHover.scale ?? 1;
      transform = `${transform} scaleX(${sx}) scaleY(${sy})`.trim();
    }

    return (
      <div
        ref={ref}
        style={{
          ...style,
          transform: transform || undefined,
          transition: `transform ${duration}s ${easingCss}, box-shadow 0.3s ease`,
        }}
        onPointerDown={(e) => {
          setIsTapped(true);
          onPointerDown?.(e);
        }}
        onPointerUp={(e) => {
          setIsTapped(false);
          onPointerUp?.(e);
        }}
        onPointerLeave={(e) => {
          setIsTapped(false);
          onPointerLeave?.(e);
        }}
        onMouseEnter={(e) => {
          setIsHovered(true);
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          setIsHovered(false);
          onMouseLeave?.(e);
        }}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

MotionDiv.displayName = "MotionDiv";

export const motion = {
  div: MotionDiv,
};
