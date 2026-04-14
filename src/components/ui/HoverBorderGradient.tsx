'use client'
import React, { useState, useEffect } from 'react'

interface HoverBorderGradientProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  containerClassName?: string
  className?: string
  children: React.ReactNode
}

export function HoverBorderGradient({
  children,
  containerClassName = '',
  className = '',
  as: Element = 'button',
  ...props
}: HoverBorderGradientProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Element
      className={`relative inline-flex items-center justify-center px-6 py-3 font-bold rounded-lg transition-all duration-300 border-2 ${
        isHovered
          ? 'border-yellow-400 bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-950 shadow-lg shadow-yellow-500/50'
          : 'border-yellow-400/50 bg-black text-yellow-400 hover:border-yellow-400'
      } ${containerClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Element>
  )
}

export default HoverBorderGradient
