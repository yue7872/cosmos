---
title: eslint报错
date: 9/20/2022 16:48:26
tags: [eslint]
categories: eslint
abbrlink: eslint
---

## 报错

ESLint couldn't determine the plugin uniquely.

```
$ eslint src/**.ts*

Oops! Something went wrong! :(

ESLint: 7.0.0

ESLint couldn't determine the plugin "prettier" uniquely.

- /myproject/packages/app/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js (loaded in ".eslintrc » ../../.eslintrc")
- /myproject/node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js (loaded in "../../.eslintrc")

Please remove the "plugins" setting from either config or remove either plugin installation.
```

## Fix:
@MaximeBernard ESLint loads all config files from the ancestor directories of lint target files. Then, ESLint 7.x loads plugins from the location of each config file which has the plugins field. (On the other hand, ESLint 6.x loads all plugins from the current working directory.)

In your case, I guess it's solved if you add root: true into your config file. It stops ESLint loading other config files from ancestor directories than the config file.

(currently, it loads .eslintrc twice because packages/*/.eslintrc extends it and ESLint loads config files from ancestor directories. It looks extra a bit, and root:true will improve it.)

在eslint配置里添加root: true，这样就不会去加载父级目录的配置文件了。
详见： https://github.com/eslint/eslint/issues/13385#issuecomment-641252879
