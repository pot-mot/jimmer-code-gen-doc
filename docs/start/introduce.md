<h1 style="font-size: 50px; padding-bottom: 20px;display: inline;">Jimmer Code Gen</h1>
<span style="border-radius: 5px; background-color:#efefef;padding: 5px 10px;margin: 0 10px;font-size: 20px;">V 0.1.1</span>
<br>

一款实体模型设计与代码生成工具，旨在快捷创建 [Jimmer](https://github.com/babyfish-ct/jimmer) 下的实体与关联。

实现了：
- 可视化的设计数据库关联模型
- 转化关联模型为 jimmer 实体

本项目不预设任何使用环境，因此如需要结合真实项目调整实体类、生成业务类和 UI，欢迎 fork 本项目进行二次开发。

## 项目地址

| 后端                                                                         | 前端                                                                       |
|----------------------------------------------------------------------------|--------------------------------------------------------------------------|
| [Github](https://github.com/pot-mot/jimmer-code-gen-kotlin)                | [Github](https://github.com/pot-mot/jimmer-code-gen-vue3)                |
| [Gitee](https://gitee.com/run-around---whats-wrong/jimmer-code-gen-kotlin) | [Gitee](https://gitee.com/run-around---whats-wrong/jimmer-code-gen-vue3) |

## 功能预览

### 模型设计
![model-edit](/images/project-preview/model-edit.png)

### 表设计
![table-edit.png](/images/project-preview/table-edit.png)

### 枚举编辑
![enum-edit.png](/images/project-preview/enum-edit.png)

### 预览下载
![code-preview.png](/images/project-preview/code-preview.png)

## 依赖说明

前后端项目均完全基于 Jimmer ORM 的持久化与前后端免对接实现，更多关于 Jimmer 本身的信息请参阅 [Jimmer 官方文档](https://babyfish-ct.github.io/jimmer-doc/zh/)。

除了 Jimmer 这一核心，本项目还使用了以下技术栈：

后端
- [SchemaCrawler](https://www.schemacrawler.com/)：数据库元数据的统一获取。

前端
- [AntV/X6](https://x6.antv.antgroup.com/)：图可视化操作。
- [Element-Plus](https://element-plus.org/zh-CN/)：业务 UI 组件。
- [pinia](https://pinia.vuejs.org/zh/) 与 [mitt](https://www.npmjs.com/package/mitt): 状态关联与事件分发。
- [typescript-json-schema](https://www.npmjs.com/package/typescript-json-schema) 与 [ajv](https://www.npmjs.com/package/ajv)： 实现运行时校验。
- [jszip](https://www.npmjs.com/package/jszip) 和 [file-save](https://www.npmjs.com/package/file-saver)：完全在前端进行的 zip 压缩与文件下载。
- [splitpanes](https://antoniandre.github.io/splitpanes/)：伸缩布局。
- [vue3-draggable-resizable](https://www.npmjs.com/package/vue3-draggable-resizable)： 可拖曳变形的对话框。
