---
title: blog搭建：问题记录
date: 7/05/2021 15:01:11
tags: [blog,hexo,记录]
categories: hexo
abbrlink: hexo
---

# 博客搭建问题记录

## 1、评论系统

更换github里的Custom domain绑定自定义域名后，发现twikoo评论无法正常访问，原因是腾讯云的***云开发会校验网页应用请求的来源域名，您需要将来源域名加入到WEB安全域名列表中。***

因此需要添加域名，将网站域名加进去即可正常获取评论。

