import React from 'react'

interface HoverBorderGradientProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  containerClassName?: string
  className?: string
  children: React.ReactNode
  rounded?: 'sm' | 'full'
}

export function HoverBorderGradient({
  children,
  containerClassName = '',
  className = 'px-8 py-3 text-sm font-medium',
  as: Element = 'button',
  rounded = 'sm',
  ...props
}: HoverBorderGradientProps) {
  const roundedClass = rounded === 'full' ? 'rounded-full' : 'rounded-sm'
  const innerRoundedClass = rounded === 'full' ? 'rounded-full' : 'rounded-xs'

  return (
    <Element
      className={`group inline-block bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 p-0.5 hover:text-white transition-all ${roundedClass} ${containerClassName}`}
      {...props}
    >
      <span className={`block bg-slate-950 text-yellow-400 group-hover:bg-transparent group-hover:text-white transition-all duration-300 ${className} ${innerRoundedClass}`}>
        {children}
      </span>
    </Element>
  )
}

export default HoverBorderGradient
