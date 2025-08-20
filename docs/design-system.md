# 🎨 FitnessApp Design System

A comprehensive, consistent UI/UX design system built with Tailwind CSS for the FitnessApp project.

## 📋 Table of Contents

- [Overview](#overview)
- [Color Palette](#color-palette)
- [Typography](#typography)
- [Components](#components)
- [Layout System](#layout-system)
- [Dark Mode](#dark-mode)
- [Usage Examples](#usage-examples)

## 🎯 Overview

The FitnessApp Design System provides a unified visual language and component library that ensures consistency across the entire application. Built on top of Tailwind CSS, it includes:

- **Consistent Color Palette** - Primary dark, accent orange, background light, and semantic colors
- **Typography Scale** - Responsive text sizes and weights
- **Reusable Components** - Buttons, cards, inputs, badges, and more
- **Layout Utilities** - Grid, container, and spacing systems
- **Dark Mode Support** - Seamless light/dark theme switching
- **Accessibility** - WCAG 2.1 AA compliant components

## 🎨 Color Palette

### Primary Colors (Dark Purple)
```css
primary-50:  #f8f5f8  /* Very light purple */
primary-100: #f0e8f0  /* Light purple */
primary-200: #e1d1e1  /* Lighter purple */
primary-300: #c8a8c8  /* Medium light purple */
primary-400: #a87aa8  /* Medium purple */
primary-500: #8a4c8a  /* Main purple */
primary-600: #7a3c7a  /* Dark purple */
primary-700: #6a2c6a  /* Darker purple */
primary-800: #5a1c5a  /* Very dark purple */
primary-900: #4A214C  /* Primary Dark - headers, footers, main backgrounds */
```

### Accent Colors (Orange)
```css
accent-50:   #fff5f0  /* Very light orange */
accent-100:  #ffe6d6  /* Light orange */
accent-200:  #ffccad  /* Lighter orange */
accent-300:  #ffad7a  /* Medium light orange */
accent-400:  #ff8a47  /* Medium orange */
accent-500:  #FF6B35  /* Accent Orange - buttons, progress bars, highlights */
accent-600:  #e55a2b  /* Dark orange */
accent-700:  #cc4921  /* Darker orange */
accent-800:  #b33817  /* Very dark orange */
accent-900:  #9a270d  /* Darkest orange */
```

### Background Colors (Light Cream)
```css
background-50:  #fefdfc  /* Very light cream */
background-100: #fdfbf9  /* Light cream */
background-200: #fbf7f3  /* Lighter cream */
background-300: #f8f3ed  /* Medium light cream */
background-400: #f5efe7  /* Medium cream */
background-500: #F8F1E9  /* Background Light - cards, content areas */
background-600: #e8d8c8  /* Dark cream */
background-700: #d8c0a8  /* Darker cream */
background-800: #c8a888  /* Very dark cream */
background-900: #b89068  /* Darkest cream */
```

### Text Colors
```css
text-dark:   #2C2C2C  /* Text Dark - general body text */
text-light:  #FFFFFF  /* Text Light - text on dark backgrounds */
text-stroke: #D4C4B5  /* Stroke Light - borders, separators, progress tracks */
```

### Semantic Colors
- **Success**: Green palette for positive actions
- **Warning**: Yellow/Orange palette for cautions
- **Error**: Red palette for errors and destructive actions

## 📝 Typography

### Heading Scale
```typescript
h1: 'text-3xl md:text-4xl font-bold text-text-dark dark:text-text-light'     // 30px/36px → 36px/40px
h2: 'text-2xl md:text-3xl font-bold text-text-dark dark:text-text-light'     // 24px/32px → 30px/36px
h3: 'text-xl md:text-2xl font-semibold text-text-dark dark:text-text-light'  // 20px/28px → 24px/32px
h4: 'text-lg md:text-xl font-semibold text-text-dark dark:text-text-light'   // 18px/28px → 20px/28px
h5: 'text-base md:text-lg font-medium text-text-dark dark:text-text-light'   // 16px/24px → 18px/28px
```

### Body Text
```typescript
body: 'text-sm md:text-base text-text-dark dark:text-text-light'             // 14px/20px → 16px/24px
caption: 'text-xs md:text-sm text-text-stroke dark:text-text-stroke'         // 12px/16px → 14px/20px
label: 'text-sm font-medium text-text-dark dark:text-text-light'             // 14px/20px
```

## 🧩 Components

### Button Component
```tsx
import Button from '@/components/ui/Button';

// Variants
<Button variant="primary">Primary Action</Button>    // Accent orange gradient
<Button variant="secondary">Secondary Action</Button> // Primary purple
<Button variant="success">Success Action</Button>    // Green gradient
<Button variant="warning">Warning Action</Button>    // Yellow gradient
<Button variant="danger">Danger Action</Button>      // Red gradient
<Button variant="ghost">Ghost Action</Button>        // Transparent with hover

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With icons
<Button leftIcon={<Icon />}>With Left Icon</Button>
<Button rightIcon={<Icon />}>With Right Icon</Button>

// Loading state
<Button isLoading>Loading...</Button>
```

### Card Component
```tsx
import Card from '@/components/ui/Card';

// Base card with background light color
<Card>
  <Card.Header>Card Title</Card.Header>
  <Card.Content>Card content goes here</Card.Content>
  <Card.Footer>Card footer</Card.Footer>
</Card>

// Interactive card with hover effects
<Card interactive>
  <Card.Content>Clickable card content</Card.Content>
</Card>
```

### Input Component
```tsx
import Input from '@/components/ui/Input';

// Base input with background light and stroke borders
<Input placeholder="Enter your text" />

// Input with validation states
<Input error="This field is required" />
<Input success="Great job!" />

// Input with icons
<Input leftIcon={<SearchIcon />} placeholder="Search..." />
<Input rightIcon={<EyeIcon />} type="password" />
```

### Badge Component
```tsx
import Badge from '@/components/ui/Badge';

// Badge variants
<Badge variant="primary">Primary</Badge>    // Primary purple
<Badge variant="accent">Accent</Badge>      // Accent orange
<Badge variant="success">Success</Badge>    // Green
<Badge variant="warning">Warning</Badge>    // Yellow
<Badge variant="error">Error</Badge>        // Red
<Badge variant="neutral">Neutral</Badge>    // Background cream
```

## 🎨 Usage Guidelines

### Color Application

1. **Primary Dark (#4A214C)**
   - Headers and navigation bars
   - Footer sections
   - Main background sections
   - Dark mode backgrounds

2. **Accent Orange (#FF6B35)**
   - Primary action buttons
   - Progress bars and indicators
   - Highlighted text and important elements
   - Call-to-action elements

3. **Background Light (#F8F1E9)**
   - Card backgrounds
   - Main content areas
   - Form input backgrounds
   - Secondary content sections

4. **Text Colors**
   - **Text Dark (#2C2C2C)**: General body text, headings
   - **Text Light (#FFFFFF)**: Text on dark backgrounds
   - **Stroke Light (#D4C4B5)**: Borders, separators, progress tracks

### Component Usage

- **Buttons**: Use accent orange for primary actions, primary purple for secondary
- **Cards**: Use background light color with stroke light borders
- **Inputs**: Background light with stroke light borders, accent orange focus
- **Badges**: Use semantic colors for status, accent for highlights
- **Progress**: Use accent orange for progress bars and indicators

### Accessibility

- All color combinations meet WCAG 2.1 AA contrast requirements
- Focus states use accent orange for visibility
- Dark mode support with appropriate color inversions
- High contrast mode support

## 🔧 Implementation

### Tailwind Classes

```css
/* Primary Colors */
.bg-primary-900 { background-color: #4A214C; }
.text-primary-900 { color: #4A214C; }

/* Accent Colors */
.bg-accent-500 { background-color: #FF6B35; }
.text-accent-500 { color: #FF6B35; }

/* Background Colors */
.bg-background-500 { background-color: #F8F1E9; }

/* Text Colors */
.text-text-dark { color: #2C2C2C; }
.text-text-light { color: #FFFFFF; }
.text-text-stroke { color: #D4C4B5; }
```

### CSS Custom Properties

```css
:root {
  --color-primary-dark: #4A214C;
  --color-accent-orange: #FF6B35;
  --color-background-light: #F8F1E9;
  --color-text-dark: #2C2C2C;
  --color-text-light: #FFFFFF;
  --color-stroke-light: #D4C4B5;
}
```

This design system ensures a consistent, accessible, and visually appealing user experience across the FitnessApp platform.
