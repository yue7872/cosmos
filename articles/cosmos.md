---
title: 博客问题记录
date: 9/09/2022 17:40:53
tags: [vue,blog,nuxt3]
categories: vue
abbrlink: vue
---

# 问题记录

## 1. vue nextTick
> 官方链接：https://vuejs.org/api/general.html#nexttick

简单来讲，就是将回调延迟到下次 DOM 更新循环之后执行，如：搜索框显示时需要自动聚焦，如果直接获取ref，会报错，因为此时dom还没渲染出来，如果用?.(可选链操作符)，虽然ts不报错，但渲染出来后，不会再次执行watch。因此，需要将获取ref的操作放在nextTick中，等待dom渲染完成后，再执行。

