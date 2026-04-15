import React from 'react'

interface HoverBorderGradientProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  containerClassName?: string
  className?: string
  children: React.ReactNode
  fillFrom?: 'left' | 'right' | 'top' | 'bottom'
}

export function HoverBorderGradient({
  children,
  containerClassName = '',
  className = 'px-8 py-3',
  as: Element = 'button',
  fillFrom = 'top',
  ...props
}: HoverBorderGradientProps) {
  let fillSpanClass = ''

  switch (fillFrom) {
    case 'left':
      fillSpanClass = 'inset-y-0 left-0 w-0.5 group-hover:w-full'
      break
    case 'right':
      fillSpanClass = 'inset-y-0 right-0 w-0.5 group-hover:w-full'
      break
    case 'top':
      fillSpanClass = 'inset-x-0 top-0 h-0.5 group-hover:h-full'
      break
    case 'bottom':
      fillSpanClass = 'inset-x-0 bottom-0 h-0.5 group-hover:h-full'
      break
  }

  return (
    <Element
      className={`group relative inline-block overflow-hidden border border-yellow-400 text-sm font-medium text-yellow-400 transition-colors ${containerClassName}`}
      {...props}
    >
      <span className={`absolute bg-yellow-400 transition-all ${fillSpanClass}`}></span>
      <span className={`relative block group-hover:text-slate-950 transition-colors ${className}`}>
        {children}
      </span>
    </Element>
  )
}

export default HoverBorderGradient
