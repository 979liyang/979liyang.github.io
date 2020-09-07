title: Nginx 前端配置
author: liyang
date: 2020-09-07 14:54:03
tags:
---
#### history与hash配置的区别

- history模式配置

```bash
location   /  {
      root    /usr/local/;
      index index.html index.htm;
      try_files $uri $uri/ /index.html;
}
```

- hash模式配置

```bash
location   /  {
      root    /usr/local/;
      index index.html index.htm;
}
```

#### root与alias的区别

- 同样请求 /test/index.html
- root匹配的路径比alias多一层`/test/`

```bash
## alias 找/static/index.html 文件
location   /test/  {
      alias    /static/;
}

## root 找/static/test/index.html 文件
location   /test/  {
      root    /static/;
}
```

#### 开启Gzip

- 纯文本(css、js、xml、html)来说可以压缩到原大小的30%甚至更多，可以节省大量的带宽。
- Gzip 所需的 HTTP 最低版本是 1.1。
- 视频图片不建议gzip压缩，本身图片视频就会压缩，如果要优化可以让客户端缓存的时间加长
- 大文件不建议gzip压缩，消耗cup并且效果不明显
- 提供更好的用户体验，但是消耗一定的cpu资源
- response header头信息中出现"Conten_Encoding: gzip" , 就说明Nginx已开启了压缩

#### 参数配置

```bash
gzip on;                 
#决定是否开启gzip模块，on表示开启，off表示关闭；

gzip_min_length 1k;      
#设置允许压缩的页面最小字节(从header头的Content-Length中获取) ，当返回内容大于此值时才会使用gzip进行压缩,以K为单位,当值为0时，所有页面都进行压缩。建议大于1k

gzip_buffers 4 16k;      
#设置gzip申请内存的大小,其作用是按块大小的倍数申请内存空间,param2:int(k) 后面单位是k。这里设置以16k为单位,按照原始数据大小以16k为单位的4倍申请内存

gzip_http_version 1.1;   
#识别http协议的版本,早起浏览器可能不支持gzip自解压,用户会看到乱码

gzip_comp_level 2;       
#设置gzip压缩等级，等级越底压缩速度越快文件压缩比越小，反之速度越慢文件压缩比越大；等级1-9，最小的压缩最快 但是消耗cpu

gzip_types text/plain application/x-javascript text/css application/xml;    
#设置需要压缩的MIME类型,非设置值不进行压缩，即匹配压缩类型

gzip_vary on;            
#启用应答头"Vary: Accept-Encoding"

gzip_proxied off;
# nginx做为反向代理时启用
## off(关闭所有代理结果的数据的压缩)
## expired(启用压缩,如果header头中包括"Expires"头信息)
## no-cache(启用压缩,header头中包含"Cache-Control:no-cache")
## no-store(启用压缩,header头中包含"Cache-Control:no-store")
## private(启用压缩,header头中包含"Cache-Control:private")
## no_last_modefied(启用压缩,header头中不包含"Last-Modified")
## no_etag(启用压缩,如果header头中不包含"Etag"头信息)
## auth(启用压缩,如果header头中包含"Authorization"头信息)
 
gzip_disable msie6;
# (IE5.5和IE6 SP1使用msie6参数来禁止gzip压缩 )指定哪些不需要gzip压缩的浏览器(将和User-Agents进行匹配),依赖于PCRE库
```

#### 常用配置
```bash
location ~ .*\. (jpg|png|gif)$ {
    gzip off;
    root /data/www/images;
}
location ~ .*\. (html|js|css)$ {
    gzip on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    gzip_http_version 1.1;
    gzip_comp_level 9;
    gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php application/javascript application/json;
    gzip_disable "MSIE [1-6]\.";
    #配置禁用gzip条件，支持正则。此处表示ie6及以下不启用gzip（因为ie低版本不支持）
    gzip_vary on;
    #选择支持vary header；改选项可以让前端的缓存服务器缓存经过gzip压缩的页面; 这个可以不写，表示在传送数据时，给客户端说明我使用了gzip压缩
    root /data/www/html;
}
```
