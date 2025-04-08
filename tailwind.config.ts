import { lightningCssTransform } from "next/dist/build/swc/generated-native";
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        agroke: {
          black: {
            light: "#375734",
            DEFAULT: "#2b4529",
            dark: "#233821",
          },
          green: {
            light: "#e1fae8", // Softer green for a fresh look
            DEFAULT: "#4CAF50", // Vibrant green for growth
            dark: "#2E7D32", // Deep green for stability
          },
          brown: {
            light: "#E0C3A1", // Light soil tone
            DEFAULT: "#8B5E3C", // Rich soil color
            dark: "#5A3A1E", // Dark earthy tone
          },
          blue: {
            light: "#B3E5FC", // Light sky blue
            DEFAULT: "#0288D1", // Vibrant blue for water and tech
            dark: "#01579B", // Deep blue for trust and reliability
          },
          yellow: {
            light: "#FFF9C4", // Soft sunlight
            DEFAULT: "#FFEB3B", // Bright yellow for energy
            dark: "#FBC02D", // Golden yellow for warmth
          },
          gray: {
            light: "#E0E0E0", // Neutral light gray
            DEFAULT: "#9E9E9E", // Medium gray for balance
            dark: "#616161", // Dark gray for precision
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
