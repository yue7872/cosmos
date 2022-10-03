// nuxt.config.js
export default {
  modules: ['@unocss/nuxt'],
  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`
    attributify: true, // enabled `@unocss/preset-attributify`,

    // core options
    shortcuts: [],
    rules: [
      ['animate-blink', { animation: 'blink 1s linear infinite' }],
      ['font-system', { 'font-family': 'system-ui' }],
      ['bg-mask', { background: 'rgba(0,0,0,0.6);' }],
      [
        'nav',
        {
          'border-bottom': '1px solid #0000000d;',
          'background-color': 'rgba(255, 255, 255, 0.8);',
          'box-sizing': 'border-box;',
          'backdrop-filter': 'blur(1px);',
          'z-index': '100;',
        },
      ],
    ],
  },
};
