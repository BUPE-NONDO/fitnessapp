// Design System Configuration for Fitness App
// Consistent UI/UX patterns using Tailwind CSS

export const designSystem = {
  // Color Palette - Fitness App Theme
  colors: {
    primary: {
      // Primary Dark: #4A214C - Used for headers, footers, and main background sections
      50: 'bg-primary-50',
      100: 'bg-primary-100',
      200: 'bg-primary-200',
      300: 'bg-primary-300',
      400: 'bg-primary-400',
      500: 'bg-primary-500',
      600: 'bg-primary-600',
      700: 'bg-primary-700',
      800: 'bg-primary-800',
      900: 'bg-primary-900',
    },
    accent: {
      // Accent Orange: #FF6B35 - Used for interactive elements like buttons, progress bars, and highlighted text
      50: 'bg-accent-50',
      100: 'bg-accent-100',
      200: 'bg-accent-200',
      300: 'bg-accent-300',
      400: 'bg-accent-400',
      500: 'bg-accent-500',
      600: 'bg-accent-600',
      700: 'bg-accent-700',
      800: 'bg-accent-800',
      900: 'bg-accent-900',
    },
    background: {
      // Background Light: #F8F1E9 - Used for card backgrounds and main content areas
      50: 'bg-background-50',
      100: 'bg-background-100',
      200: 'bg-background-200',
      300: 'bg-background-300',
      400: 'bg-background-400',
      500: 'bg-background-500',
      600: 'bg-background-600',
      700: 'bg-background-700',
      800: 'bg-background-800',
      900: 'bg-background-900',
    },
    text: {
      // Text Dark: #2C2C2C - Used for general body text
      dark: 'text-text-dark',
      // Text Light: #FFFFFF - Used for text on dark backgrounds
      light: 'text-text-light',
      // Stroke Light: #D4C4B5 - Used for subtle borders, separators, or progress bar tracks
      stroke: 'text-text-stroke',
    },
    success: {
      50: 'bg-green-50',
      100: 'bg-green-100',
      500: 'bg-green-500',
      600: 'bg-green-600',
      700: 'bg-green-700',
    },
    warning: {
      50: 'bg-yellow-50',
      100: 'bg-yellow-100',
      500: 'bg-yellow-500',
      600: 'bg-yellow-600',
    },
    error: {
      50: 'bg-red-50',
      100: 'bg-red-100',
      500: 'bg-red-500',
      600: 'bg-red-600',
    },
  },

  // Typography - Updated with new color scheme
  typography: {
    h1: 'text-3xl md:text-4xl font-bold text-text-dark dark:text-text-light',
    h2: 'text-2xl md:text-3xl font-bold text-text-dark dark:text-text-light',
    h3: 'text-xl md:text-2xl font-semibold text-text-dark dark:text-text-light',
    h4: 'text-lg md:text-xl font-semibold text-text-dark dark:text-text-light',
    h5: 'text-base md:text-lg font-medium text-text-dark dark:text-text-light',
    body: 'text-sm md:text-base text-text-dark dark:text-text-light',
    caption: 'text-xs md:text-sm text-text-stroke dark:text-text-stroke',
    label: 'text-sm font-medium text-text-dark dark:text-text-light',
  },

  // Spacing
  spacing: {
    xs: 'p-2',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
    '2xl': 'p-12',
  },

  // Borders & Radius (Circle-focused)
  borders: {
    none: 'border-0',
    thin: 'border border-text-stroke dark:border-text-stroke',
    thick: 'border-2 border-text-stroke dark:border-text-stroke',
    radius: {
      sm: 'rounded-xl',
      md: 'rounded-2xl',
      lg: 'rounded-3xl',
      full: 'rounded-full',
      circle: 'rounded-full',
    },
  },

  // Shadows - Updated with new color scheme
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    inner: 'shadow-inner',
    accent: 'shadow-lg shadow-accent-500/20',
    primary: 'shadow-lg shadow-primary-500/20',
  },

  // Component Variants - Updated with new color scheme
  components: {
    card: {
      base: 'bg-background-500 dark:bg-primary-900 rounded-2xl shadow-circle border border-text-stroke dark:border-text-stroke',
      hover: 'hover:shadow-circle-lg transition-all duration-200',
      interactive: 'cursor-pointer hover:shadow-circle-lg hover:scale-[1.02] transition-all duration-200',
    },
    button: {
      primary: 'bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-text-light font-medium px-6 py-3 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 shadow-accent hover:shadow-accent-lg transform hover:scale-105',
      secondary: 'bg-primary-100 hover:bg-primary-200 dark:bg-primary-800 dark:hover:bg-primary-700 text-text-dark dark:text-text-light font-medium px-6 py-3 rounded-2xl transition-all duration-200 shadow-circle',
      success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-text-light font-medium px-6 py-3 rounded-2xl transition-all duration-200 shadow-circle hover:shadow-circle-lg transform hover:scale-105',
      warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-text-light font-medium px-6 py-3 rounded-2xl transition-all duration-200 shadow-circle hover:shadow-circle-lg transform hover:scale-105',
      danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-text-light font-medium px-6 py-3 rounded-2xl transition-all duration-200 shadow-circle hover:shadow-circle-lg transform hover:scale-105',
      ghost: 'text-text-dark dark:text-text-light hover:bg-background-100 dark:hover:bg-primary-800 font-medium px-6 py-3 rounded-2xl transition-all duration-200 shadow-circle',
    },
    input: {
      base: 'w-full px-4 py-3 border border-text-stroke dark:border-text-stroke rounded-2xl bg-background-500 dark:bg-primary-900 text-text-dark dark:text-text-light placeholder-text-stroke dark:placeholder-text-stroke focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 shadow-circle',
      error: 'border-red-500 focus:ring-red-500',
      success: 'border-green-500 focus:ring-green-500',
    },
    badge: {
      primary: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-900 dark:bg-primary-800 dark:text-primary-100',
      accent: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-900 dark:bg-accent-800 dark:text-accent-100',
      success: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      warning: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      error: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      neutral: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-background-200 text-text-dark dark:bg-primary-700 dark:text-text-light',
    },
  },

  // Layout
  layout: {
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    section: 'py-8 md:py-12',
    grid: {
      cols1: 'grid grid-cols-1 gap-6',
      cols2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
      cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
      cols4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
    },
    flex: {
      center: 'flex items-center justify-center',
      between: 'flex items-center justify-between',
      start: 'flex items-center justify-start',
      end: 'flex items-center justify-end',
      col: 'flex flex-col',
      colCenter: 'flex flex-col items-center justify-center',
    },
  },

  // Animations
  animations: {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    bounce: 'animate-bounce',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
  },

  // States
  states: {
    loading: 'opacity-50 pointer-events-none',
    disabled: 'opacity-50 cursor-not-allowed',
    active: 'ring-2 ring-blue-500 ring-offset-2',
    focus: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  },
};

// Utility functions for consistent styling
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const getVariant = (component: keyof typeof designSystem.components, variant: string) => {
  return designSystem.components[component]?.[variant as keyof typeof designSystem.components[typeof component]] || '';
};

export const getTypography = (variant: keyof typeof designSystem.typography) => {
  return designSystem.typography[variant];
};

export const getSpacing = (size: keyof typeof designSystem.spacing) => {
  return designSystem.spacing[size];
};

export const getColor = (color: keyof typeof designSystem.colors, shade: string) => {
  const colorObj = designSystem.colors[color];
  if (!colorObj || typeof colorObj !== 'object') return '';
  return (colorObj as any)[shade] || '';
};
