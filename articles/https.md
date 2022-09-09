---
title: https
date: 3/31/2022 17:13:16
tags: [文章标签,文章标签]
categories: 文章分类
abbrlink: 链接前缀
---

# 模板

##

网页有时访问https网站，由于网站中一些资源是http的，网页执行会报错“This request has been blocked;  the content must be served over HTTPS.

<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

可以在相应的页面的<head>里加上这句代码，意思是自动将http的不安全请求升级为https

