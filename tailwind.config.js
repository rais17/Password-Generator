/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      screens: {
        in: "0px",
        atF8: "480px",
      },
      fontFamily: {
        Spartan: ["League Spartan", "sans-serif"],
      },
      backgroundImage: {
        gradLinear: [
          "linear-gradient(231deg, rgba(22, 6, 40, 1) 0%, rgba(52, 28, 79, 1) 50%, rgba(88, 7, 125, 1) 100%)",
        ],
      },
      colors: {
        dkViolet: ["hsl(268, 75%, 9%)"],
        ltViolet: ["hsl(268, 47%, 21%)"],
        ltViolet2: ["hsl(281, 89%, 26%)"],
        vbViolet: ["hsl(285, 91%, 52%)"],
        vbViolet2: ["hsl(290, 70%, 36%)"],
        vbYellow: ["hsl(52, 100%, 62%)"],
        plWhite: ["hsl(0, 0%, 100%)"],
        vbCyan: ["hsl(176, 100%, 44%)"],
        vbCyan2: ["hsl(177, 92%, 70%)"],
        dkText: ["hsl(198, 20%, 13%)"],
      },
    },
  },
  plugins: [],
};
