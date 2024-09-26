const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            strong: {
              color: theme("colors.black"), // default strong tag color in light mode
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.white"), // text color for all text elements
            strong: {
              color: theme("colors.white"), // strong tag color in dark mode
            },
            // Add more element-specific dark mode styles if needed
          },
        },
      }),
      boxShadow: {
        innerBoxShadow: "2px 2px 4px 0px rgba(0, 0, 0, 0.30) inset",
        custom: "0 50px 25px -24px rgb(0 0 0 / 0.3)",
        boxShadow: "0px 0px 10px 0px rgba(255, 255, 255, 0.25)",
        menuBoxShadow:
          "rgba(0, 0, 0, 0.12) 0px 0px 2px 0px, rgba(0, 0, 0, 0.14) 0px 2px 4px 0px",
        activeMenuShadow: "-4px 4px 10px 0px rgba(244, 178, 62, 0.3)",
        logoBoxShadow:
          "-9px -9px 16px 0px rgba(53, 53, 53, 0.35), 9px 9px 16px 0px rgba(0, 0, 0, 0.30)",
      },
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        text: "var(--text)",
        background: "var(--background)",
        foreground: "var(--foreground)",

        borderOutline: "var(--border-outline)",

        success: "var(--success)",
        destructive: {
          DEFAULT: "var(--destructive)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        loader: {
          to: {
            opacity: "0.1",
            transform: "translate3d(0, -1rem, 0)",
          },
        },
      },
      animation: {
        loader: "loader 0.6s infinite alternate",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
  darkMode: ["class", '[data-mantine-color-scheme="dark"]'],
};

export default config;
