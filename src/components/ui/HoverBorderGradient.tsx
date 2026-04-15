import React from 'react'

interface HoverBorderGradientProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  containerClassName?: string
  className?: string
  children: React.ReactNode
  variant?: 'filled' | 'outline'
}

export function HoverBorderGradient({
  children,
  containerClassName = '',
  className = 'px-12 py-3',
  as: Element = 'button',
  variant = 'filled',
  ...props
}: HoverBorderGradientProps) {
  if (variant === 'outline') {
    return (
      <Element
        className={`group relative inline-block text-sm font-medium text-yellow-400 ${containerClassName}`}
        {...props}
      >
        <span className="absolute inset-0 border border-current"></span>
        <span className={`block border border-current bg-slate-950 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 ${className}`}>
          {children}
        </span>
      </Element>
    )
  }

  return (
    <Element
      className={`group relative inline-block text-sm font-medium text-white ${containerClassName}`}
      {...props}
    >
      <span className="absolute inset-0 border border-yellow-400"></span>
      <span className={`block border border-yellow-400 bg-yellow-500 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 ${className}`}>
        {children}
      </span>
    </Element>
  )
}

export default HoverBorderGradient
