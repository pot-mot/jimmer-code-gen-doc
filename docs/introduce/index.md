<h1 style="font-size: 50px; padding-bottom: 20px;">Jimmer Code Gen</h1>

一款模型设计与代码生成器，旨在快捷创建 [Jimmer](https://github.com/babyfish-ct/jimmer) 下的实体与关联。

实现了可视化的设计数据库关联模型并转化成 jimmer 实体。

## 功能预览

### 模型设计
![model-edit](/images/project-preview/model-edit.png)

### 模型配置
![model-config.png](/images/project-preview/model-config.png)

### 表设计
![table-edit.png](/images/project-preview/table-edit.png)

### 枚举编辑
![enum-edit.png](/images/project-preview/enum-edit.png)

### 代码预览
![code-preview.png](/images/project-preview/code-preview.png)


## 依赖说明

前后端项目均完全基于 Jimmer ORM 的持久化与前后端免对接实现，更多关于 Jimmer 本身的信息请参阅 [Jimmer 官方文档](https://babyfish-ct.github.io/jimmer/zh/)。

除了 Jimmer 这一核心，本项目还使用了以下技术栈：

后端
- [SchemaCrawler](https://www.schemacrawler.com/)：数据库元数据的统一获取。
- （目前尚未正式使用）[Liquibase](https://www.liquibase.org/)：逆向模型为 sql。

前端
- [AntV/X6](https://x6.antv.antgroup.com/)：图可视化操作。
- [Element-Plus](https://element-plus.org/zh-CN/)：业务 UI 组件。
- [pinia](https://pinia.vuejs.org/zh/) 与 [mitt](https://www.npmjs.com/package/mitt): 状态关联与事件分发。
- [typescript-json-schema](https://www.npmjs.com/package/typescript-json-schema) 与 [ajv](https://www.npmjs.com/package/ajv)： 实现运行时校验。
- [jszip](https://www.npmjs.com/package/jszip) 和 [file-save](https://www.npmjs.com/package/file-saver)：完全在前端进行的 zip 压缩与文件下载。
- [splitpanes](https://antoniandre.github.io/splitpanes/)：伸缩布局。
- [vue3-draggable-resizable](https://www.npmjs.com/package/vue3-draggable-resizable)： 可拖曳变形的对话框。
