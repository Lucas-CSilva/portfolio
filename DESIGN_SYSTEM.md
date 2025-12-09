# Design System - Enterprise Portfolio

## 📐 Design Principles

### Professional & Executive
- **Minimalism:** Clean layouts with generous whitespace
- **Hierarchy:** Clear visual structure guiding user attention
- **Consistency:** Predictable patterns across all components
- **Restraint:** Conservative use of colors and animations
- **Precision:** Attention to detail in every element

---

## 🎨 Color System (Nord Theme)

### Usage Strategy
The Nord color palette is maintained but used **conservatively** to project professionalism.

#### Background Colors
```css
/* Light Theme */
--bg-app: #ECEFF4 (nord6)      /* Main background - pure, clean */
--bg-surface: #E5E9F0 (nord5)   /* Card/surface - subtle elevation */
--bg-elevated: #D8DEE9 (nord4)  /* Elevated elements */

/* Dark Theme */
--bg-app: #2E3440 (nord0)       /* Main background - deep, professional */
--bg-surface: #3B4252 (nord1)   /* Card/surface - subtle elevation */
--bg-elevated: #434C5E (nord2)  /* Elevated elements */
```

#### Text Colors
```css
/* Light Theme */
--text-primary: #2E3440 (nord0)    /* Headlines, important text */
--text-secondary: #4C566A (nord3)  /* Body text, descriptions */
--text-muted: #434C5E (nord2)      /* Less important text */

/* Dark Theme */
--text-primary: #ECEFF4 (nord6)    /* Headlines, important text */
--text-secondary: #D8DEE9 (nord4)  /* Body text, descriptions */
--text-muted: #E5E9F0 (nord5)      /* Less important text */
```

#### Accent Colors (Use Sparingly)
```css
/* Light Theme */
--accent-primary: #5E81AC (nord10) /* Frost blue - CTAs only */
--accent-hover: #81A1C1 (nord9)    /* Hover states */

/* Dark Theme */
--accent-primary: #88C0D0 (nord8)  /* Frost cyan - CTAs only */
--accent-hover: #8FBCBB (nord7)    /* Hover states */
```

#### Border & Dividers
```css
/* Subtle, professional borders */
border: 1px solid var(--border-default)
--border-default: #D8DEE9 (light) / #3B4252 (dark)
```

---

## 📝 Typography System

### Font Family
```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

**Why Inter?**
- Clean, professional sans-serif
- Excellent readability at all sizes
- Supports OpenType features for better text rendering

### Type Scale (Major Third - 1.25 Ratio)
```typescript
'xs':   '0.75rem'   // 12px - Small labels, captions
'sm':   '0.875rem'  // 14px - Secondary text, metadata
'base': '1rem'      // 16px - Body text (default)
'lg':   '1.125rem'  // 18px - Emphasized body text
'xl':   '1.25rem'   // 20px - Small headings
'2xl':  '1.563rem'  // 25px - Subheadings
'3xl':  '1.953rem'  // 31px - Section titles
'4xl':  '2.441rem'  // 39px - Page titles
'5xl':  '3.052rem'  // 49px - Large headings
'6xl':  '3.815rem'  // 61px - Hero headings
```

### Font Weights
```css
400 - Regular    /* Body text */
500 - Medium     /* Subtle emphasis */
600 - SemiBold   /* Headings, important elements */
700 - Bold       /* Use sparingly, only for strong emphasis */
```

### Line Heights
```css
Headings: 1.1 - 1.2  /* Tight, impactful */
Body:     1.6        /* Comfortable reading */
Small:    1.5        /* Compact but readable */
```

### Letter Spacing
```css
/* Optical corrections for better readability */
body:     -0.011em
headings: -0.02em
small:     0.01em
uppercase: 0.05em (tracking-wide)
```

---

## 📏 Spacing System

### Base Grid: 8px
```typescript
'0':   '0px'
'1':   '0.25rem'  // 4px
'2':   '0.5rem'   // 8px
'3':   '0.75rem'  // 12px
'4':   '1rem'     // 16px
'6':   '1.5rem'   // 24px
'8':   '2rem'     // 32px
'12':  '3rem'     // 48px
'16':  '4rem'     // 64px
'20':  '5rem'     // 80px
'24':  '6rem'     // 96px
'32':  '8rem'     // 128px
```

### Usage Guidelines
- **Component padding:** 24px-32px (6-8)
- **Section spacing:** 128px+ (32+)
- **Element gaps:** 16px-24px (4-6)
- **Whitespace:** Always generous, never cramped

---

## 🎭 Elevation System (Shadows)

### Professional Shadow Layers
```css
/* Subtle, diffused shadows - never harsh */
elevation-sm: 0 1px 2px rgba(0,0,0,0.05)
elevation-md: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)
elevation-lg: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)
elevation-xl: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)
```

**Dark Theme:** Increase opacity by ~2-3x for visibility

---

## 🔲 Border Radius

### Conservative Rounding
```css
'sm':      '4px'   /* Chips, small badges */
'DEFAULT': '6px'   /* Most UI elements */
'md':      '8px'   /* Cards, buttons */
'lg':      '10px'  /* Large containers */
'xl':      '12px'  /* Hero sections (use rarely) */
```

**Philosophy:** Subtle rounding for softness without appearing playful

---

## 🧩 Component Patterns

### Cards
```tsx
<Card 
  shadow="none"
  className="border border-divider bg-content1/50 backdrop-blur-sm"
>
```
- Border-based design over heavy shadows
- Subtle transparency for layering
- Hover: `border-accent-primary/30` (subtle accent)

### Buttons
```tsx
// Primary CTA (use sparingly)
<Button variant="bordered" size="md" className="font-medium">

// Secondary action
<Button variant="light" size="md">
```
- Prefer `bordered` over `solid` for restraint
- Icon + text for clarity
- Medium size as default

### Badges/Chips
```tsx
<Chip 
  variant="flat" 
  size="sm"
  classNames={{
    base: "border border-divider/50 bg-default-50",
    content: "text-xs font-medium text-default-700"
  }}
>
```
- Monochromatic, subtle
- Border-based for definition
- No vibrant colors

### Links
```tsx
<Link 
  href="#" 
  className="text-default-500 hover:text-accent-primary transition-colors"
  underline="none"
>
```
- Text color transitions only
- No underlines by default
- Hover shows intent clearly

---

## 🎬 Animation Principles

### Transitions
```css
duration: 200ms (default)
timing: cubic-bezier(0.4, 0, 0.2, 1)
```

### What to Animate
- **Do:** Color changes, opacity, subtle transforms
- **Don't:** Excessive motion, bouncing, spinning (unless purposeful)

### Guidelines
- Keep animations subtle and purposeful
- Prefer fade-ins over slides
- Respect `prefers-reduced-motion`

---

## 📱 Responsive Breakpoints

```css
sm:  640px   /* Small tablets */
md:  768px   /* Tablets */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Extra large */
```

### Layout Strategy
- **Mobile first:** Base styles for mobile
- **Progressive enhancement:** Add complexity at larger sizes
- **Max-width containers:** 7xl (1280px) for readable line lengths

---

## ♿ Accessibility

### Focus Indicators
```css
*:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 3px;
  border-radius: 4px;
}
```

### Color Contrast
- **WCAG AAA:** Aim for 7:1 for body text
- **WCAG AA:** Minimum 4.5:1 for all text
- Nord palette naturally provides excellent contrast

### Semantic HTML
- Use proper heading hierarchy (h1 → h6)
- ARIA labels for interactive elements
- Keyboard navigation support

---

## 🎯 Component Inventory

### Updated Components

#### ✅ Header/Navbar
- **Style:** Minimal, fixed height (5rem)
- **Background:** Transparent → Blur on scroll
- **Links:** Text-based, no heavy buttons

#### ✅ Hero/About Section
- **Layout:** Asymmetric grid (1.2fr / 0.8fr)
- **Typography:** Large but controlled
- **CTA:** Bordered buttons, no solid fills

#### ✅ Project Cards
- **Visual:** Border-based, no shadows
- **Hover:** Subtle border color shift
- **Content:** Compact, limited tech badges (4 max visible)

#### ✅ Tech Badges
- **Style:** Monochromatic, border-defined
- **Variants:** Flat only, no colors
- **Active state:** Accent border

#### ✅ Featured Carousel
- **Cards:** Spacious padding (8-12)
- **Navigation:** Minimal dots
- **Transitions:** Slow, dignified (6s)

#### ✅ Footer
- **Design:** Single line, minimal
- **Links:** Icon + text, subtle colors
- **Border:** Top divider only

---

## 📦 HeroUI Configuration

### Theme Customization
```typescript
heroui({
  layout: {
    fontSize: { small: '0.875rem', medium: '1rem', large: '1.125rem' },
    lineHeight: { small: '1.5', medium: '1.6', large: '1.6' },
    radius: { small: '0.25rem', medium: '0.375rem', large: '0.5rem' },
    borderWidth: { small: '1px', medium: '1px', large: '2px' },
  },
})
```

### Preferred Variants
- **Cards:** `shadow="none"` + border
- **Buttons:** `variant="bordered"` or `variant="light"`
- **Chips:** `variant="flat"` with custom classes
- **Links:** `underline="none"` with color transitions

---

## 📐 Design Tokens Reference

### CSS Variables (Full List)
```css
/* Backgrounds */
--bg-app, --bg-surface, --bg-elevated

/* Text */
--text-primary, --text-secondary, --text-muted

/* Accents */
--accent-primary, --accent-hover

/* Borders */
--border-default

/* Radius */
--radius (0.625rem / 10px)

/* Nord Colors */
--nord0 through --nord15 (full palette available)
```

---

## 🚀 Implementation Checklist

### ✅ Completed
- [x] Global typography system (Inter font, proper scales)
- [x] Professional spacing (8px grid, generous whitespace)
- [x] Conservative color usage (monochromatic, accent sparingly)
- [x] Subtle elevation (border-based design)
- [x] Header/Navbar refactor
- [x] Hero/About section refactor
- [x] Project cards refactor
- [x] Tech badges refactor
- [x] Featured carousel refactor
- [x] Gallery section refactor
- [x] Footer refactor

### Design Philosophy Applied
✓ **Minimalism:** Clean, uncluttered interfaces
✓ **Professionalism:** Conservative aesthetics
✓ **Hierarchy:** Clear visual structure
✓ **Consistency:** Unified component patterns
✓ **Accessibility:** WCAG compliant, keyboard-friendly

---

## 📚 Resources

### Design References
- **Typography:** [Inter Font Documentation](https://rsms.me/inter/)
- **Colors:** [Nord Theme](https://www.nordtheme.com/)
- **UI Library:** [HeroUI Documentation](https://www.heroui.com/)

### External Inspiration
- Apple Developer Website
- Stripe Dashboard
- Linear App
- GitHub Enterprise

---

## 🎨 Visual Examples

### Color Usage
```
🔵 Accent (nord8/nord10) - Use only for:
  • Primary CTAs
  • Active states
  • Interactive highlights

⚪ Default (grays) - Use for:
  • All text content
  • Borders and dividers
  • Backgrounds and surfaces
  • Tech badges and chips
```

### Typography Hierarchy
```
Hero Title:     text-5xl font-semibold (48-61px)
Section Title:  text-4xl font-semibold (39px)
Card Title:     text-lg font-semibold (18px)
Body:           text-base font-normal (16px)
Metadata:       text-sm text-default-500 (14px)
Labels:         text-xs uppercase tracking-wider (12px)
```

---

**Last Updated:** December 2025  
**Version:** 2.0.0 (Enterprise Rebranding)  
**Designer:** Lucas C. Silva
