# TechxServe Global Design & Animation Guidelines

## Theme Consistency

### Page Themes
- **Contact Us Page**: Light theme (clean, modern, professional)
- **All Other Pages**: Keep their intended theme, but ensure animations are consistent
- **Media Page**: Dark futuristic theme with neon effects (special case)

### Background Animations (Throughout All Pages)

#### Implementation Requirements
- Use `<EnhancedBackgroundAnimation intensity="subtle" theme="mixed" />` throughout entire pages
- Must appear in ALL sections, not just hero sections
- Animations should be subtle, premium, and consistent across all pages:
  - Services Page ✓
  - Products Page ✓ 
  - Blog Page ✓
  - Careers Page ✓
  - Contact Us Page ✓ (light theme)

#### Background Animation Pattern
```jsx
<section className="py-20 relative overflow-hidden">
  <EnhancedBackgroundAnimation intensity="subtle" theme="mixed" />
  <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/95 to-gray-50/90" />
  
  {/* Content */}
</section>
```

### Hero Sections (All Pages)
- Each hero should include background animations for consistency
- Use `EnhancedBackgroundAnimation` component with appropriate settings
- Maintain smooth, professional animations that don't distract from content
- Include floating geometric shapes with subtle animations

## Animation Guidelines

### Card Hover Effects (Universal)
- **Subtle glow/color change** around card borders on hover
- **Clean edge glow** instead of heavy color fills
- **Smooth transitions** (duration: 300-500ms)
- **Gentle lift effect** (-translate-y-2 to -translate-y-4)

#### Correct Card Hover Pattern
```jsx
<div className="group relative">
  {/* Subtle border glow - appears only on hover */}
  <motion.div
    className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[var(--brand-primary)] to-red-600 opacity-0 group-hover:opacity-20 blur-sm transition-all duration-500"
  />
  
  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/50 group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
    {/* Content */}
  </div>
</div>
```

### Icon Animation Guidelines

#### Static Icons (Careers Page Fix Applied)
- Icons in content sections should remain **static** by default
- Only subtle hover effects allowed:
  - Gentle scale (1.05x max)
  - Soft glow on hover
  - Color transitions
- **NO continuous rotating/moving animations** in content sections

#### Acceptable Icon Animations
```jsx
// ✅ GOOD - Subtle hover only
<div className="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-red-600 p-3 group-hover:shadow-xl transition-all duration-300">
  <Target className="w-full h-full text-white" />
</div>

// ❌ AVOID - Continuous motion
<motion.div
  animate={{
    rotate: [0, 360],
    scale: [1, 1.2, 1],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
  }}
>
  <Icon />
</motion.div>
```

## Component Standards

### Button Animations
- Multiple shimmer layers for premium buttons
- Subtle scale transforms (1.05x max)
- Gradient background shifts
- Smooth hover transitions (300-500ms)

### Text Animations
- `animate-text-glow` for brand text
- Gradient text effects for headings
- Subtle pulsing for accent elements

### Background Elements
- Geometric shapes with gentle movement
- Floating bubbles with physics-like motion
- Gradient waves for ambient atmosphere
- All elements should be subtle and not distract

## CSS Animation Classes

### Available Custom Animations
- `animate-text-glow` - Glowing text effect
- `animate-float` - Gentle floating motion
- `animate-shimmer` - Shimmer overlay effect
- `animate-pulse-glow` - Pulsing glow effect
- `animate-gradient-shift` - Background gradient animation

### Performance Guidelines
- Use `transform` and `opacity` for animations
- Apply `will-change` sparingly
- Use `backface-visibility: hidden` for smooth 3D transforms
- Prefer CSS animations over JavaScript for simple effects

## Color Palette Usage

### Brand Colors
- Primary: `var(--brand-primary)` (#820507)
- Primary Light: `var(--brand-primary-light)` (#a31e22)  
- Primary Dark: `var(--brand-primary-dark)` (#5c0304)

### Gradient Patterns
- Brand gradient: `from-[var(--brand-primary)] via-red-500 to-red-600`
- Multi-color: `from-[var(--brand-primary)] via-purple-500 to-blue-500`
- Subtle background: `from-gray-50/90 via-white/95 to-gray-50/90`

## Responsive Design

### Animation Considerations
- Reduce animation intensity on mobile devices
- Disable complex animations for users with `prefers-reduced-motion`
- Ensure touch interactions work smoothly
- Test performance on lower-end devices

## Quality Standards

### Animation Principles
1. **Subtle and Professional** - Never overwhelming
2. **Consistent** - Same patterns across all pages
3. **Performance-First** - Smooth 60fps animations
4. **Accessible** - Respect user preferences
5. **Brand-Aligned** - Reinforce TechxServe premium positioning

### Testing Checklist
- [ ] Animations work on all screen sizes
- [ ] No janky or stuttering motion
- [ ] Hover effects are consistent
- [ ] Background animations don't interfere with content
- [ ] Performance remains smooth with multiple animations

## File Organization

### Component Structure
- Individual page components in `/components/`
- Shared animation component: `EnhancedBackgroundAnimation.tsx`
- Global styles in `/styles/globals.css`
- UI components in `/components/ui/`

### Animation Component Usage
```jsx
import EnhancedBackgroundAnimation from "./EnhancedBackgroundAnimation";

// Use in every section for consistency
<EnhancedBackgroundAnimation intensity="subtle" theme="mixed" />
```

## Implementation Notes

### Recently Applied Changes
1. ✅ Contact Us page converted to light theme
2. ✅ Careers page icons made static (removed continuous animations)  
3. ✅ All pages now have consistent background animations
4. ✅ Card hover effects refined to use subtle edge glows
5. ✅ Hero sections enhanced with background animations

### Maintenance
- Review animations quarterly for performance
- Update guidelines as design system evolves  
- Test new components against these standards
- Document any exceptions with clear reasoning