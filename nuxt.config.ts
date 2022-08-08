// nuxt.config.js
export default {
  modules: ["@unocss/nuxt"],
  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`
    attributify: true, // enabled `@unocss/preset-attributify`,

    // core options
    shortcuts: [],
    rules: [
      ["animate-blink", { animation: "blink 1s linear infinite" }],
      ["font-system", { "font-family": "system-ui" }],
      ["bg-mask", { background: "rgba(0,0,0,0.6);" }],
    ],
  },
};
