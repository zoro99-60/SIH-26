/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Coal Mining Industrial Palette
        charcoal: {
          950: "#0B111E",
          900: "#0F172A",
          850: "#172033",
          800: "#1E293B", // Primary: Deep Charcoal / Coal Grey
          700: "#334155",
          600: "#475569",
        },
        safety: {
          amber: "#F59E0B", // Accent: Safety Amber / Orange
          amberDark: "#D97706",
          amberLight: "#FEF3C7",
          green: "#10B981", // Success: Emerald Green
          greenDark: "#059669",
          greenLight: "#D1FAE5",
          danger: "#EF4444", // High Risk Danger Red
          dangerDark: "#DC2626",
          dangerLight: "#FEE2E2",
          surface: "#F8FAFC", // Background: Off-white / Light Grey
        },
        // shadcn compatible variable fallbacks
        border: "var(--border, #E2E8F0)",
        input: "var(--input, #CBD5E1)",
        ring: "var(--ring, #F59E0B)",
        background: "var(--background, #F8FAFC)",
        foreground: "var(--foreground, #0F172A)",
        primary: {
          DEFAULT: "#1E293B",
          foreground: "#F8FAFC",
        },
        accent: {
          DEFAULT: "#F59E0B",
          foreground: "#0F172A",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        'industrial': '0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.08)',
        'industrial-card': '0 2px 4px -1px rgba(15, 23, 42, 0.06), 0 4px 6px -1px rgba(15, 23, 42, 0.1)',
        'hud-glow': '0 0 15px rgba(245, 158, 11, 0.15)',
        'hazard-glow': '0 0 15px rgba(239, 68, 68, 0.2)',
      },
    },
  },
  plugins: [],
}
