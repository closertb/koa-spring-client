## koa-spring-client
一个标准的中后台系统，一个NodeJs服务的试金石。

## 使用步骤
1. npm install // 安装依赖

2. npm start // 开启本地在线调试

3. 浏览器输入 http://localhost:8905/

4. 登陆页  
账号：dom  
密码：123456

5. 点击菜单规则列表，体会增删查改  

## 关于antd-doddle
详情请查看[README](doc.closertb.site)

## 关于doddle-build
详情请查看[README][1]

[1]: https://github.com/closertb/doddle/tree/master/packages/doddle-build


## 关于doddle-build externals 打包测试
 将react生态，moment, antd-doddle打包成为外部依赖，发现有以前特点：
  - antd对externals支持不是很好
  - 库下面的私有库不会被externals，需要单独设置；这里可以看antd-doddle/decorator的打包结果；
  - 关于@antd-design/icons 是有解决方案的；

 ![未设置externals](https://doddle.oss-cn-beijing.aliyuncs.com/oldNotes/20200401161432.png)

![设置externals](https://doddle.oss-cn-beijing.aliyuncs.com/oldNotes/20200401161330.png)