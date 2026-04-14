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
      className={`
        relative inline-flex items-center justify-center px-6 py-3 font-bold rounded-lg
        border-2 border-yellow-400/50 bg-black text-yellow-400
        transition-all duration-300 ease-in-out
        hover:border-yellow-400 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-600
        hover:text-slate-950 hover:shadow-lg hover:shadow-yellow-500/50
        ${containerClassName}
      `}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Element>
  )
}

export default HoverBorderGradient
