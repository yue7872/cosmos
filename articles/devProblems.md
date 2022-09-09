---
title: dev报错
date: 4/17/2022 16:34:42
tags: [npm,报错]
categories: npm
abbrlink: npm
---

## npm run dev 报错

```bash
UnhandledPromiseRejectionWarning: Error: getaddrinfo ENOTFOUND localhost
    at GetAddrInfoReqWrap.onlookup [as oncomplete]
(node:5316) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
```



这个报错是因为本地没有配host

新增host   127.0.0.1 localhost

