---
title: git学习：问题记录
date: 7/05/2021 14:00:00
tags: [git,记录]
categories: git
abbrlink: git
---

# git问题记录

## 1、git clone/push时文件过大的问题

当仓库文件过大时，git会报一个突然终止的错误，没办法正确提交和下载：

`fatal: The remote end hung up unexpectedly`

解决方法为设置postBuffer属性：

```bash
git config --global http.postBuffer 524288000
```

或者可以尝试再增大一倍：

```bash
git config --global http.postBuffer 1048576000
```

重新push或clone即可。

## 2、error:140770FC:SSL

git使用pull命令/clone命令等都会出现错误，原因：没有配置ssh版本

#### 解决：

```bash
git config --global http.sslVersion tlsv1.2 
```

## 3、git删除本地除了master所有分支

```bash
git checkout master
git branch | grep -v 'master' | xargs git branch -D
```

## 4、拉取代码报错

```bash
kex_exchange_identification: read: Connection reset by peer
Connection reset by 14.22.4.190 port 22
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

系统偏好设置-> 共享 -> 远程登录 打开即可
