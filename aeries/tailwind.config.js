/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* gray-200 */
        input: "var(--color-input)", /* gray-100 with blue undertones */
        ring: "var(--color-ring)", /* teal-600 */
        background: "var(--color-background)", /* gray-50 with blue undertones */
        foreground: "var(--color-foreground)", /* gray-800 */
        primary: {
          DEFAULT: "var(--color-primary)", /* teal-600 */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* sage-green-500 */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* red-300 */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* gray-100 with blue undertones */
          foreground: "var(--color-muted-foreground)", /* gray-500 */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* yellow-300 */
          foreground: "var(--color-accent-foreground)", /* gray-800 */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* white */
          foreground: "var(--color-popover-foreground)", /* gray-800 */
        },
        card: {
          DEFAULT: "var(--color-card)", /* white */
          foreground: "var(--color-card-foreground)", /* gray-800 */
        },
        success: {
          DEFAULT: "var(--color-success)", /* green-300 */
          foreground: "var(--color-success-foreground)", /* gray-900 */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* orange-300 */
          foreground: "var(--color-warning-foreground)", /* gray-900 */
        },
        error: {
          DEFAULT: "var(--color-error)", /* red-300 */
          foreground: "var(--color-error-foreground)", /* white */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans 3', 'sans-serif'],
        'caption': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(0.98)' },
          '50%': { transform: 'scale(1.0)' },
        },
        gentlePulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "breathe": "breathe 4s ease-in-out infinite",
        "gentle-pulse": "gentlePulse 2s ease-in-out infinite",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      transitionTimingFunction: {
        'therapeutic': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '300': '300ms',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}