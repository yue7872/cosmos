---
title: docker学习
date: 7/22/2021 18:57:18
tags: [docker]
categories: docker
abbrlink: docker
---

# docker学习

主要参照阮一峰的 [Docker入门教程](https://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)，以及过程中的问题记录。

## 1、环境配置

开发时环境配置很麻烦，有时候在自己机器上能运行的代码到别人机器上就不行了。

> 环境配置如此麻烦，换一台机器，就要重来一次，旷日费时。很多人想到，能不能从根本上解决问题，***软件可以带环境安装？***也就是说，安装的时候，把原始环境一模一样地复制过来。

## 2、虚拟机

*它可以在一种操作系统里面运行另一种操作系统，比如在 Windows 系统里面运行 Linux 系统。*

用户可以通过虚拟机还原环境，但他也有缺点：

- **资源占用多**
- **冗余步骤多**
- **启动慢**

## 3、linux容器

**Linux 容器（Linux Containers，缩写为 LXC）不是模拟一个完整的操作系统，而是对进程进行隔离。**或者说，在正常进程的外面套了一个**保护层**。对于容器里面的进程来说，它接触到的各种资源都是虚拟的，从而实现与底层系统的隔离。

容器是进程级别的，与虚拟机相对，LXC优势：

- 启动快
- 资源占用少
- 体积小

**总之，容器有点像轻量级的虚拟机，能够提供虚拟化的环境，但是成本开销小得多。**

## 4、Docker

**Docker 属于 Linux 容器的一种封装，提供简单易用的容器使用接口。**它是目前最流行的 Linux 容器解决方案。

Docker 将应用程序与该程序的依赖，打包在一个文件里面。运行这个文件，就会生成一个虚拟容器。程序在这个虚拟容器里运行，就好像在真实的物理机上运行一样。有了 Docker，就不用担心环境问题。

总体来说，Docker 的接口相当简单，用户可以方便地创建和使用容器，把自己的应用放入容器。容器还可以进行版本管理、复制、分享、修改，就像管理普通的代码一样。

*它可以用来：*

**（1）提供一次性的环境。**比如，本地测试他人的软件、持续集成的时候提供单元测试和构建的环境。

**（2）提供弹性的云服务。**因为 Docker 容器可以随开随关，很适合动态扩容和缩容。

**（3）组建微服务架构。**通过多个容器，一台机器可以跑多个服务，因此在本机就可以模拟出微服务架构。

## 5、Docker使用

### 1. 安装

[官网](https://www.docker.com/products/docker-desktop)下载即可

安装完成后，打开docker.app，运行下面的命令，验证是否安装成功。

```bash
docker version
# 或者
docker info
```

安装成功的话，就会提示版本信息等。

### 2. image文件

**Docker 把应用程序及其依赖，打包在 image 文件里面。**只有通过这个文件，才能生成 Docker 容器。image 文件可以看作是***容器的模板***。Docker 根据 image 文件生成容器的实例。同一个 image 文件，可以生成多个同时运行的容器实例。

image 是二进制文件。image文件可以在别人的image基础上修改。举例来说，你可以在 Ubuntu 的 image 基础上，往里面加入 Apache 服务器，形成你的 image。

```bash
# 列出本机的所有 image 文件。
docker image ls

# 删除 image 文件
docker image rm [imageName]
```

image文件是通用的，为了节省时间，尽量避免自己制作。

Docker 的官方仓库 [Docker Hub](https://hub.docker.com/) 这里可以找到别人做好的image。

## 6、实例：hello world

抓取image文件 `library`是`image`文件所在的组，官方提供的`image`都在`library`里，是默认组，可以省略不写。

```bash
docker image pull library/hello-world
```

查看本机image列表

```bash
docker image ls
```

运行image文件

```bash
docker container run hello-world
```

`docker container run`命令会从 image 文件，生成一个正在运行的容器实例。

这个命令具有自动抓取功能。如果本地没有指定的 image ，就会从仓库自动抓取。

运行成功会有以下输出：

```bash
docker container run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.

... ...
```

> 输出这段提示以后，`hello world`就会停止运行，容器自动终止。

> 有些容器不会自动终止，因为提供的是服务。比如，安装运行 Ubuntu 的 image，就可以在命令行体验 Ubuntu 系统。

## 7、实例：制作自己的Docker容器

> ***Dockerfile 文件***是一个用来配置image的文本文件，docker根据该文件生成image。

下面我以 [koa-demos](https://www.ruanyifeng.com/blog/2017/08/koa.html) 项目为例，介绍怎么写 Dockerfile 文件，实现让用户在 Docker 容器里面运行 Koa 框架。

### 1. 准备工作

```bash
git clone https://github.com/ruanyf/koa-demos.git
cd koa-demos
```

`.dockerignore`文件，类似`.gitignore`，打包进image时会忽略里面的内容。

`.Dockerfile`文件，内容如下：

```js
FROM node:8.4
COPY . /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3000
```

每行的含义：

- `FROM node:8.4`：该 image 文件继承官方的 node image，冒号表示标签，这里标签是`8.4`，即8.4版本的 node。
- `COPY . /app`：将当前目录下的所有文件（除了`.dockerignore`排除的路径），都拷贝进入 image 文件的`/app`目录。
- `WORKDIR /app`：指定接下来的工作路径为`/app`。
- `RUN npm install`：在`/app`目录下，运行`npm install`命令安装依赖。注意，安装后所有的依赖，都将打包进入 image 文件。
- `EXPOSE 3000`：将容器 3000 端口暴露出来， 允许外部连接这个端口。

### 2. 创建 image 文件

```bash
docker image build -t koa-demo .
# 或者
docker image build -t koa-demo:0.0.1 .
```



> 这里可能会报错`docker build" requires exactly 1 argument(s).`
>
>  注意后面的 .  
>
> docker build有三种方式，PATH（路径）、URL（链接）和-，"." 就属于PATH，指的是当前路径

```bash
docker build [OPTIONS] PATH | URL | -
```



> 加上. 之后，可能还会报一个错误 
>
>  `error:140770FC:SSL routines:SSL23_GET_SERVER_HELLO:unknown protocol`
>
> 原因：没有配置ssh版本，解决方案：

```bash
git config --global http.sslVersion tlsv1.2 
```



运行成功后，输入以下命令，就可以查看生成的image了。

```bash
docker image ls
```

### 3. 生成容器

```bash
docker container run -p 8000:3000 -it koa-demo /bin/bash
# 或者
docker container run -p 8000:3000 -it koa-demo:0.0.1 /bin/bash
```

- `-p`参数：容器的 3000 端口映射到本机的 8000 端口。
- `-it`参数：容器的 Shell 映射到当前的 Shell，然后你在本机窗口输入的命令，就会传入容器。
- `koa-demo:0.0.1`：image 文件的名字（如果有标签，还需要提供标签，默认是 latest 标签）。
- `/bin/bash`：容器启动以后，内部第一个执行的命令。这里是启动 Bash，保证用户可以使用 Shell

如果一切正常，运行上面的命令以后，就会返回一个命令行提示符。

```bash
root@66d80f4aaf1e:/app#
```

这表示你已经在容器里面了，返回的提示符就是容器内部的 Shell 提示符。执行下面的命令。

```bash
root@66d80f4aaf1e:/app# node demos/01.js
```

这时，Koa 框架已经运行起来了。打开本机的浏览器，访问 http://127.0.0.1:8000，网页显示"Not Found"，这是因为这个 [demo](https://github.com/ruanyf/koa-demos/blob/master/demos/01.js) 没有写路由。

这个例子中，Node 进程运行在 Docker 容器的虚拟环境里面，进程接触到的文件系统和网络接口都是虚拟的，与本机的文件系统和网络接口是隔离的，因此需要定义容器与物理机的端口映射（map）。

现在，在容器的命令行，按下 Ctrl + c 停止 Node 进程，然后按下 Ctrl + d （或者输入 exit）退出容器。此外，也可以用`docker container kill`终止容器运行。

```bash
# 在本机的另一个终端窗口，查出容器的 ID
docker container ls

# 停止指定的容器运行
docker container kill [containerID]
```

容器停止运行之后，并不会消失，用下面的命令删除容器文件。

```bash
# 删除指定的容器文件
docker container rm [containerID]
```

也可以使用`docker container run`命令的`--rm`参数，在容器终止运行后自动删除容器文件。

```bash
docker container run --rm -p 8000:3000 -it koa-demo /bin/bash
```

### 4. CMD命令

容器启动后，需要手动输入node demos/01.js，可以把这个命令写在Dockerfile里，这样容器启动后这个命令就会自动执行，不需要再输入。

```bash
FROM node:8.4
COPY . /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3000
CMD node demos/01.js
```

上面的 Dockerfile 里面，多了最后一行`CMD node demos/01.js`，它表示容器启动后自动执行`node demos/01.js`。

你可能会问，`RUN`命令与`CMD`命令的区别在哪里？简单说，`RUN`命令在 image 文件的构建阶段执行，执行结果都会打包进入 image 文件；`CMD`命令则是在容器启动后执行。另外，一个 Dockerfile 可以包含多个`RUN`命令，但是只能有一个`CMD`命令。

注意，指定了`CMD`命令以后，`docker container run`命令就不能附加命令了（比如前面的`/bin/bash`），否则它会覆盖`CMD`命令。现在，启动容器可以使用下面的命令。

```bash
docker container run --rm -p 8000:3000 -it koa-demo:0.0.1
```

### 5. 发布 image 文件

容器运行成功后，就确认了 image 文件的有效性。这时，我们就可以考虑把 image 文件分享到网上，让其他人使用。

首先，去 [hub.docker.com](https://hub.docker.com/) 或 [cloud.docker.com](https://cloud.docker.com/) 注册一个账户。然后，用下面的命令登录。

```bash
docker login
```

接着，为本地的 image 标注用户名和版本。

```bash
docker image tag [imageName] [username]/[repository]:[tag]
# 实例
docker image tag koa-demos:0.0.1 ruanyf/koa-demos:0.0.1
```

也可以不标注用户名，重新构建一下 image 文件。

```bash
docker image build -t [username]/[repository]:[tag] .
```

最后，发布 image 文件。

```bash
docker image push [username]/[repository]:[tag]
```

发布成功以后，登录 hub.docker.com，就可以看到已经发布的 image 文件。

## 8、其他有用的命令

docker 的主要用法就是上面这些，此外还有几个命令，也非常有用。

**（1）docker container start**

前面的`docker container run`命令是新建容器，每运行一次，就会新建一个容器。同样的命令运行两次，就会生成两个一模一样的容器文件。如果希望重复使用容器，就要使用`docker container start`命令，它用来启动已经生成、已经停止运行的容器文件。

```bash
docker container start [containerID]
```

**（2）docker container stop**

前面的`docker container kill`命令终止容器运行，相当于向容器里面的主进程发出 SIGKILL 信号。而`docker container stop`命令也是用来终止容器运行，相当于向容器里面的主进程发出 SIGTERM 信号，然后过一段时间再发出 SIGKILL 信号。

```bash
docker container stop [containerID]
```

这两个信号的差别是，应用程序收到 SIGTERM 信号以后，可以自行进行收尾清理工作，但也可以不理会这个信号。如果收到 SIGKILL 信号，就会强行立即终止，那些正在进行中的操作会全部丢失。

**（3）docker container logs**

`docker container logs`命令用来查看 docker 容器的输出，即容器里面 Shell 的标准输出。如果`docker run`命令运行容器的时候，没有使用`-it`参数，就要用这个命令查看输出。

```bash
docker container logs [containerID]
```

**（4）docker container exec**

`docker container exec`命令用于进入一个正在运行的 docker 容器。如果`docker run`命令运行容器的时候，没有使用`-it`参数，就要用这个命令进入容器。一旦进入了容器，就可以在容器的 Shell 执行命令了。

```bash
docker container exec -it [containerID] /bin/bash
```

**（5）docker container cp**

`docker container cp`命令用于从正在运行的 Docker 容器里面，将文件拷贝到本机。下面是拷贝到当前目录的写法。

```bash
docker container cp [containID]:[/path/to/file] .
```

## 9、docker设置时区

```dockerfile
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
```
