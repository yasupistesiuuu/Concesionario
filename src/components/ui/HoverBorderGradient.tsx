import React from 'react'

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
  return (
    <Element
      className={`hover-gradient-button ${containerClassName}`}
      {...props}
    >
      {children}
    </Element>
  )
}

export default HoverBorderGradient
