# 快速开始

下面将介绍直接基于 jar 包启动和模型设计的基本功能。

## 项目启动

- [github](https://github.com/pot-mot/jimmer-code-gen-kotlin/releases)
- [gitee](https://gitee.com/run-around---whats-wrong/jimmer-code-gen-kotlin/releases)

前往 git 仓库 Releases 获取发行版 jar，使用  `java -jar <JAR>` 启动即可，之后从浏览器访问 `localhost:port` 即可，默认端口 8080。

jar 默认以 H2 启动，所以不需要配置任何数据源。H2 默认为**内存模式**，因此请记得及时导出模型。如有需要请自行通过命令行参数进行配置 [数据源](/source-start/index.html#数据源配置)。

## 模型创建

从首页进入【模型设计】，点击左上角 【创建新模型】：

![create-model.png](/images/quick-start/create-model.png)

## 数据源导入

连接数据源。

:::danger
本项目默认没有任何安全防御保证措施，所以连接数据源这一行为请务必不要在**不可信任的开发环境**中进行，否则若导致信息泄漏，本项目概不负责。
:::

![connect-datasource.png](/images/quick-start/connect-datasource.png)

选择 schema 进行导入。

![choose-schema.png](/images/quick-start/choose-schema.png)

![load-schema.png](/images/quick-start/load-schema.png)

点击单表可仅导入表，点击 schema 将导入整个 schema：

![load-from-schema.png](/images/quick-start/load-from-schema.png)

## 模型编辑

### 表创建与编辑

进入模型编辑页，双击画布空白位置或点击菜单栏【创建表】：

![create-table.png](/images/quick-start/create-table.png)

双击表节点或者点击菜单栏【编辑】即可对表进行编辑。

### 列编辑

![table-edit.png](/images/project-preview/table-edit.png)

在列类别中，可设置主键（Id）、自增、业务键（Key）等功能。

点击类型配置，可唤出列类型详细配置，进行长度精度设置和绑定枚举等操作。

![column-type-edit.png](/images/quick-start/column-type-edit.png)

:::info
未选择【以字面类型覆盖】时，建表语句中的类型将根据参考自数据库官方文档的 `ColumnTypeDefiner` 映射基本类型，而不是直接采用字面类型。

具体可参考以下源码：

- [H2 ColumnTypeDefiner](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/database/generate/impl/h2/H2ColumnTypeDefiner.kt)

- [MySQL ColumnTypeDefiner](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/database/generate/impl/mysql/MysqlColumnTypeDefiner.kt)

- [PostgreSQL ColumnTypeDefiner](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/database/generate/impl/postgres/PostgresColumnTypeDefiner.kt)
:::

### 关联编辑

拖曳表中列部分指向其他列即可创建关联。

![create-association.png](/images/quick-start/create-association.png)

点击关联类型按钮可以切换单侧的类型（One 或 Many）。

![change-association-type.png](/images/quick-start/change-association-type.png)

点击关联线条即可切换物理（实线）与逻辑（虚线）。

![change-association-fake.png](/images/quick-start/change-association-fake.png)

## 生成预览与下载

点击右上角的几个按钮即可预览和下载最终生成的代码，以下依次是【预览 sql】，【预览实体】、【下载 model.json】、【下载全部】。

![right-top-toolbar.png](/images/quick-start/right-top-toolbar.png)
