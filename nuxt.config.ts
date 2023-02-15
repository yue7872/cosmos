// nuxt.config.js
export default {
  modules: [
    '@unocss/nuxt',
    '@nuxt/devtools',
  ],
  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`
    attributify: true, // enabled `@unocss/preset-attributify`,

    // core options
    shortcuts: [
      {
        'sort-item':
          'border-none font-400 opacity-20 hover:opacity-50 cursor-pointer select-none',
      },
      { 'sort-active': 'opacity-100 text-cosGreen !hover:opacity-100' },
    ],
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
      ['text-cosGreen', { color: '#009966' }],
    ],
    theme: {
      // animation: {
      //   keyframes: {
      //     haha: '{0%, 100% {opacity:1} 50% {opacity:.5}}',
      //   },
      //   durations: { haha: '3s' },
      // },
    },
  },
};
