---
title: git配置ssh
date: 3/29/2022 15:40:24
tags: [git,记录]
categories: git
abbrlink: git
---

 

## https 和 SSH 的区别：

1、前者可以随意克隆github上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。

2、https url 在push的时候是需要验证用户名和密码的；而 SSH 在push的时候，是不需要输入用户名的，如果配置SSH key的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。

 

## 在 github 上添加 SSH key 的步骤：

### 1、首先需要检查你电脑是否已经有 SSH key 

运行命令行，输入如下代码：

```
$ cd ~/.ssh
$ ls
```

这两个命令就是检查是否已经存在 id_rsa.pub 或 id_dsa.pub 文件，如果文件已经存在，那么你可以跳过步骤2，直接进入步骤3。

 

### 2、创建一个 SSH key 

```
$ ssh-keygen -t rsa -C "your_email@example.com"
```

代码参数含义：

-t 指定密钥类型，默认是 rsa ，可以省略。
-C 设置注释文字，比如邮箱。
-f 指定密钥文件存储文件名。

以上代码省略了 -f 参数，因此，运行上面那条命令后会让你输入一个文件名，用于保存刚才生成的 SSH key 代码，如：

```
Generating public/private rsa key pair.
# Enter file in which to save the key (/c/Users/you/.ssh/id_rsa): [Press enter]
```

当然，你也可以不输入文件名，使用默认文件名（推荐），那么就会生成 id_rsa 和 id_rsa.pub 两个秘钥文件。

接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码），

当然，你也可以不输入密码，直接按回车。那么push的时候就不需要输入密码，直接提交到github上了，如：

```
Enter passphrase (empty for no passphrase): 
# Enter same passphrase again:
```

接下来，就会显示如下代码提示，如：

```
Your identification has been saved in /c/Users/you/.ssh/id_rsa.
# Your public key has been saved in /c/Users/you/.ssh/id_rsa.pub.
# The key fingerprint is:
# 01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db your_email@example.com
```

当你看到上面这段代码的时候，那就说明，你的 SSH key 已经创建成功，你只需要添加到github的SSH key上就可以了。

 

### 3、添加你的 SSH key 到 github上面去

**a、**首先你需要拷贝 id_rsa.pub 文件的内容，你可以用编辑器打开文件复制，也可以用git命令复制该文件的内容，如：

```
$ clip < ~/.ssh/id_rsa.pub
```

　　Window 使用 clip 命令复制，Mac 则使用 pbcopy 命令

**b、**登录你的github账号，从右上角的设置（ [Account Settings](https://github.com/settings) ）进入，然后点击菜单栏的 SSH key 进入页面添加 SSH key。

**c、**点击 Add SSH key 按钮添加一个 SSH key 。把你复制的 SSH key 代码粘贴到 key 所对应的输入框中，记得 SSH key 代码的前后不要留有空格或者回车。当然，上面的 Title 所对应的输入框你也可以输入一个该 SSH key 显示在 github 上的一个别名。默认的会使用你的邮件名称。

**d、**这样就创建成功了

 

### 4、同时有两个git账号，个人的和公司的

步骤同上，生成SSH key 的时候注意不要覆盖原来的，用一个新的id，如id_rsa_new，复制到git账号配置中。

*注意：*git默认只读取id_rsa，需要将新的密钥添加到ssh_agent中：

```bash
ssh-add ~/.ssh/id_rsa_new
```



#### 这里ssh-add后，每次重启电脑都会失效（Mac），都需要重新执行一次。

解决方案：可以设置成开机自动执行，找到自动操作.app，新建文稿，选择应用程序，搜索shell，输入上面的添加命令后保存。

右上角小苹果-系统偏好设置-用户与群组-登陆项-点击加号，添加刚刚的脚本app，选择隐藏。

这样就完成了每次开机自动执行且无感知。

更多参考：https://www.someget.cn/linux/2021/10/12/linux_ssh04.html

