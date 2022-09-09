---
title: zsh git快捷命令
date: 1/19/2022 10:54:38
tags: [git, zsh, 快捷命令]
categories: git
abbrlink: git
---
# zsh git快捷命令

- gaa

  ```bash
  git add --all
  ```

- gcmsg 'feat:xxx'

  ```bash
  git commit -m "feat:xxx"
  ```

- gp

  ```bash
  git push
  ```

- gl

  ```bash
  git push
  ```

- gccd xxx

  ```bash
  git clone xxx
  cd xxx
  ```

- gco xxx

  ```bash
  git checkout xxx
  ```

- gcb

  ```bash
  git checkout branch
  ```

- gba

  ``````bash
  git branch -a

## 其他常用快捷键

- 加粗常用

**⌃ + u：清空当前行**

**⌃ + a：移动到行首**

**⌃ + e：移动到行尾**

⌃ + f：向前移动

⌃ + b：向后移动

**⌃ + p：上一条命令**

**⌃ + n：下一条命令**

⌃ + r：搜索历史命令

⌃ + y：召回最近用命令删除的文字

⌃ + h：删除光标之前的字符	

⌃ + d：删除光标所指的字符

**⌃ + w：删除光标之前的单词**

**⌃ + k：删除从光标到行尾的内容**

⌃ + t：交换光标和之前的字符

## 别名配置

- 找到zsh的配置文件.zshrc（～.zshrc），添加别名配置
  例如 `alias yyz="cd ~/Desktop/yyz"`

  *注意等号左右没有空格，不然会报错  bad assignmen*

- 令上面修改的配置文件生效
  `source ~.zshrc`

- 查看现有别名 alias
