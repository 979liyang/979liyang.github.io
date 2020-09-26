title: Nginx 安装、常用命令、特点
author: liyang
date: 2018-04-10 22:07:30
tags: Nginx
---
#### 安装方法（一）**Openresty 推荐**
 
 ```bash
 *** 
 $ sudo yum install yum-utils
 $ sudo yum-config-manager --add-repo https://openresty.org/package/centos/openresty.repo
 $ sudo yum install openresty
 ```
 
>安装完成查看版本
 
 ```bash
 $ openresty -V
 ```
 
>创建`nginx`软连接
 
 ```bash
 $ sudo ln -sf /usr/local/openresty/nginx/sbin/nginx /usr/bin/nginx
 ```
 
 ---
 
#### 安装方法（二）Nginx 压缩包安装

>>在安装nginx前首先要确认系统中安装 **`gcc、pcre-devel、zlib-devel、openssl-devel`**。

```bash
$ yum -y install gcc pcre-devel zlib-devel openssl openssl-devel
```

>>下载Nginx, 下载地址： [http://nginx.org/download/nginx-1.6.2.tar.gz](http://nginx.org/download/nginx-1.6.2.tar.gz)

```bash
## 下载
$ cd /usr/local/
$ wget http://nginx.org/download/nginx-1.6.2.tar.gz

## 解压
$ tar zxvf nginx-1.6.2.tar.gz

## 进入安装包目录
$ cd nginx-1.6.2

## 配置
$ ./configure --prefix=/usr/local/nginx

## 安装
$ make
$ make install 
```

>>检测安装是否成功

```bash
$ cd /usr/loca/nginx/
$ ./sbin/nginx -t

## 成功提示
nginx: the configuration file /usr/local/nginx/conf/nginx.conf syntax is ok
nginx: configuration file /usr/local/nginx/conf/nginx.conf test is successful

## 错误提示
nginx: [alert] could not open error log file: open() "/usr/local/nginx/logs/error.log" failed (2: No such file or directory)
2016/09/13 19:08:56 [emerg] 6996#0: open() "/usr/local/nginx/logs/access.log" failed (2: No such file or directory)

## 解决方案，原因分析：nginx/目录下没有logs文件夹

$ mkdir logs
$ chmod 700 logs
```

>创建`nginx`软连接
 
 ```bash
 $ sudo ln -sf /usr/local/nginx/sbin/nginx /usr/bin/nginx
 ```
 
---

#### Nginx常用命令

```bash
## 帮助命令
$ nginx -h

## 启动Nginx服务器
$ nginx

## 查看进程
$ ps aux | grep nginx

## 配置文件路径
$ /usr/local/nginx/conf/nginx.conf

## 检查配置文件
$ nginx -t

## 指定启动配置文件
$ nginx -c /usr/local/nginx/conf/nginx.conf

## 暴力停止服务
$ nginx -s stop

## 优雅停止服务
$ nginx -s quit

## 重新加载配置文件
$ nginx -s reload
```

#### Nginx 的优势
 
 * 高并发高性能
 * 可扩展性高
 * 可靠性高
 * 热部署
 * 开源许可证
 
#### Nginx 主要的应用场景
 
 * 静态资源服务，通过本地文件系统提供服务
 * 反向代理服务、负载均衡
 * API服务、权限控制，减少应用服务器压力