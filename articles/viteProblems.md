---
title: vite配置
date: 4/24/2022 16:28:26
tags: [vite,打包]
categories: vite
abbrlink: vite
---

## 默认配置

```js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

const projectRoot = process.cwd();

export default defineConfig({
  root: './',
  mode: 'development',
  css: {
    devSourcemap: true,
  },
  server: {
    port: 3000,
  },
  plugins: [viteCommonjs(), react()],
  optimizeDeps: {
    esbuildOptions: {},
  },
  resolve: {
    alias: {
      BaseCom: resolve(projectRoot, './src/base/components/index.jsx'),
      Com: resolve(projectRoot, './src/components/index.jsx'),
      DemandCom: resolve(projectRoot, './src/components'),
    },
  },
});
```

- root: 根节点，如过要引入base，则root不能设定在src/projects里，因为base在projects外。

-   ```js
      css: {
        devSourcemap: true,
      },
    ```

  这个配置用来开启css的sourceMap，否则所有的css都会被写进style标签引入。

- plugins：插件配置，这里用了两个插件：

  - react()：用来react热更新，Vite 内置了 HMR 到 [Vue 单文件组件（SFC）](https://github.com/vitejs/vite/tree/main/packages/plugin-vue) 和 [React Fast Refresh](https://github.com/vitejs/vite/tree/main/packages/plugin-react) 中。如果不引入，则每次更新都重刷页面。

  - viteCommonjs()：处理node_modules里的require引入方式，可以解决如下bug：

    ```js
    Uncaught Error: Dynamic require of "xxx/lib/style/index.scss" is not supported
    ```

    同时， esbuildOptions这里也可以配置一个解决此bug的选项，但是我的项目下设置后会有问题，只用viteCommonjs()，便可解决，这里也记录一下

    ```js
    import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
      // ...
      optimizeDeps: {
        esbuildOptions: {
          plugins: [esbuildCommonjs(['XXX'])],
        },
      },
      // ...
    ```

    这里的功能是引入你需要单独处理的npm包，就是之前用require的那个包，不用这个esbuild的选项也可正常工作，删掉就可。

    ```js
    set-to-string-tag.js:12 Uncaught TypeError: defineProperty3 is not a function
    ```

其他都是正常配置，没有特殊之处。

## Resolve-url的问题

https://github.com/vitejs/vite/issues/7651
