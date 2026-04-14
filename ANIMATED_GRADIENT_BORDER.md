# Animated Gradient Border Component

## Overview

A premium React component with auto-rotating conic gradient borders. Perfect for creating eye-catching UI elements with customizable animations and colors.

## Installation

The component is already integrated into the project. No additional installation needed.

### Dependencies Added
- `lucide-react` - Icon library for examples

## File Structure

```
src/
├── components/
│   ├── ui/
│   │   └── animated-gradient-border.tsx  (Component)
│   └── BorderRotateDemo.tsx               (Demo component)
└── pages/
    └── gradient-border-demo.astro         (Demo page)
```

## Quick Start

### Basic Usage

```tsx
import { BorderRotate } from '@/components/ui/animated-gradient-border';

export default function MyComponent() {
  return (
    <BorderRotate className="p-6 w-96">
      <div>Your content here</div>
    </BorderRotate>
  );
}
```

### In Astro Components

```astro
---
import BorderRotateComponent from '@/components/BorderRotateComponent.tsx';
---

<BorderRotateComponent client:load />
```

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Content inside the border |
| `className` | `string` | `''` | Additional CSS classes |
| `animationMode` | `'auto-rotate' \| 'rotate-on-hover' \| 'stop-rotate-on-hover'` | `'auto-rotate'` | Animation behavior |
| `animationSpeed` | `number` | `5` | Duration in seconds |
| `gradientColors` | `{ primary, secondary, accent }` | See defaults | Color configuration |
| `backgroundColor` | `string` | `'#2d230f'` | Background color |
| `borderWidth` | `number` | `2` | Border width in pixels |
| `borderRadius` | `number` | `20` | Border radius in pixels |
| `style` | `CSSProperties` | `{}` | Custom inline styles |

## Animation Modes

### 1. Auto-Rotate (Default)
Gradient continuously rotates.
```tsx
<BorderRotate animationMode="auto-rotate" animationSpeed={5} />
```

### 2. Rotate-on-Hover
Animation starts when hovering.
```tsx
<BorderRotate animationMode="rotate-on-hover" />
```

### 3. Stop-Rotate-on-Hover
Animation stops when hovering.
```tsx
<BorderRotate animationMode="stop-rotate-on-hover" />
```

## Color Customization

### Example: Blue Theme
```tsx
<BorderRotate
  gradientColors={{
    primary: '#0f172a',
    secondary: '#1e40af',
    accent: '#60a5fa'
  }}
  backgroundColor="#1e1b4b"
/>
```

### Example: Red Theme
```tsx
<BorderRotate
  gradientColors={{
    primary: '#7f1d1d',
    secondary: '#dc2626',
    accent: '#f87171'
  }}
  backgroundColor="#7f1d1d"
/>
```

## Border Customization

```tsx
<BorderRotate
  borderWidth={4}        // 4px border
  borderRadius={8}       // 8px radius
  animationSpeed={10}    // 10 second rotation
/>
```

## Demo Page

View all examples at: `/gradient-border-demo`

The demo showcases:
1. Default style
2. Custom colors (Blue theme)
3. Fast animation (0.5s rotation)
4. Rotate on hover
5. Stop on hover
6. Custom border sizing
7. Feature showcase

## CSS Animations

The component uses CSS keyframes defined in `src/styles/global.css`:

```css
@keyframes gradient-rotate {
  from {
    --gradient-angle: 0deg;
  }
  to {
    --gradient-angle: 360deg;
  }
}
```

## Using in Different Components

### Card Component
```tsx
<BorderRotate className="p-6" gradientColors={customColors}>
  <div className="text-white">
    <h3>Card Title</h3>
    <p>Card content</p>
  </div>
</BorderRotate>
```

### Feature Showcase
```tsx
<BorderRotate 
  className="p-8"
  animationMode="rotate-on-hover"
>
  <div className="grid grid-cols-3 gap-6">
    {/* Feature items */}
  </div>
</BorderRotate>
```

### Call-to-Action
```tsx
<BorderRotate 
  borderWidth={3}
  borderRadius={12}
  animationSpeed={3}
>
  <div className="text-center py-8">
    <h2>Premium Offer</h2>
    <button>Learn More</button>
  </div>
</BorderRotate>
```

## Performance Notes

- Uses CSS animations (GPU accelerated)
- No JavaScript animation loops
- Lightweight (~2KB minified)
- Compatible with Tailwind CSS
- Works with React 19+
- Astro compatible with `client:load`

## Browser Support

- Chrome/Edge 88+
- Firefox 89+
- Safari 14.1+
- Modern browsers with CSS support

## Troubleshooting

### Animation not visible
- Ensure `animationMode` is set correctly
- Check CSS is loaded in global.css
- Verify component has proper `client:load` in Astro

### Colors not applying
- Check gradient color hex values are valid
- Ensure backgroundColor contrasts with gradientColors
- Verify `style` prop doesn't override colors

### Component not showing
- Add `client:load` directive in Astro component
- Ensure component is imported correctly
- Check for TypeScript errors

## Examples in Use

The component is ready to be used in:
- Product showcase cards
- Feature highlights
- Premium service boxes
- Call-to-action sections
- Gallery containers
- Testimonial cards

## Future Enhancements

- Additional animation patterns
- Gradient presets
- Animation easing functions
- Size presets
- Accessibility improvements

## Support

For issues or questions about the component, refer to:
- Demo page: `/gradient-border-demo`
- Component file: `src/components/ui/animated-gradient-border.tsx`
- Demo component: `src/components/BorderRotateDemo.tsx`
