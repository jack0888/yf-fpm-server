## Roadmap Of yf-fpm-server

#### v3.0

- 全局
  - 自定义异常的处理
  - log4js
  
- 核心
  - 去除Hook, Biz的export, 通过 createHook, createBiz 来创建
  - 修改 auth 为 permision
  - 添加后台页面
    - 菜单

- 插件
  - 实现热部署
  - MockServer
  - UnitTest

- 弃用
  - 文件上传的部分

#### v2.3

- 插件
  - 升级插件逻辑，使用注入的方式引用其他插件
  - 可快速编辑和更新接口文档的插件
  - 常用插件的实现

- 上传模块将文件保存到七牛

#### v2.2

- 权限验证
- 文件上传
- 钩子机制
- 标准输出

