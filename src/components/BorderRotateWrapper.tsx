import { BorderRotate } from './ui/animated-gradient-border';
import type { ReactNode, CSSProperties } from 'react';

interface BorderRotateWrapperProps {
  children: ReactNode;
  className?: string;
  animationMode?: 'auto-rotate' | 'rotate-on-hover' | 'stop-rotate-on-hover';
  animationSpeed?: number;
  gradientColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  backgroundColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  style?: CSSProperties;
}

export default function BorderRotateWrapper({
  children,
  className = '',
  animationMode = 'auto-rotate',
  animationSpeed = 5,
  gradientColors = {
    primary: '#d4af37',
    secondary: '#f9de90',
    accent: '#fbbf24'
  },
  backgroundColor = '#1e1b4b',
  borderWidth = 2,
  borderRadius = 12,
  style = {},
}: BorderRotateWrapperProps) {
  return (
    <BorderRotate
      className={className}
      animationMode={animationMode}
      animationSpeed={animationSpeed}
      gradientColors={gradientColors}
      backgroundColor={backgroundColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      style={style}
    >
      {children}
    </BorderRotate>
  );
}
