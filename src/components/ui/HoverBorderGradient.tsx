'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: any[]) { return twMerge(clsx(inputs)) }

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'

const movingMap: Record<Direction, string> = {
  TOP: 'radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
  LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
  BOTTOM:
    'radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
  RIGHT:
    'radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
}

const highlight =
  'radial-gradient(75% 181.15942028985506% at 50% 50%, #FBB040 0%, rgba(255, 255, 255, 0) 100%)'

interface HoverBorderGradientProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  containerClassName?: string
  className?: string
  duration?: number
  clockwise?: boolean
  children: React.ReactNode
}

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Element = 'button',
  duration = 1,
  clockwise = true,
  ...props
}: HoverBorderGradientProps) {
  const [hovered, setHovered] = useState<boolean>(false)
  const [direction, setDirection] = useState<Direction>('BOTTOM')
  const [mounted, setMounted] = useState(false)

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT']
    const currentIndex = directions.indexOf(currentDirection)
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length
    return directions[nextIndex]
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!hovered && mounted) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState))
      }, duration * 1000)
      return () => clearInterval(interval)
    }
  }, [hovered, mounted, duration, clockwise])

  if (!mounted) {
    return (
      <Element className={cn('relative inline-flex px-6 py-3 font-bold rounded-lg', className)}>
        {children}
      </Element>
    )
  }

  return (
    <Element
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex h-min w-fit flex-col flex-nowrap content-center items-center justify-center gap-10 overflow-visible rounded-lg border bg-black/40 box-decoration-clone p-px backdrop-blur-sm transition duration-500 hover:bg-black/60',
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          'z-10 w-auto rounded-[inherit] bg-black px-6 py-3 text-yellow-400 font-bold whitespace-nowrap',
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          'absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]'
        )}
        style={{
          filter: 'blur(2px)',
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: 'linear', duration: duration ?? 1 }}
      />
      <div className='absolute inset-0.5 z-1 flex-none rounded-lg bg-black' />
    </Element>
  )
}

export default HoverBorderGradient
