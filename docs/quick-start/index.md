# 快速开始

> 项目结构本身并不复杂，直接基于[源码启动](/source-start/index.html)可以更自由的调整生成功能、更及时的排查问题。
> 作为项目开发者我更建议直接进行二次开发而不是单纯使用 jar 启动作为小工具。

## 直接基于 jar 启动

- [github](https://github.com/pot-mot/jimmer-code-gen-kotlin/releases)
- [gitee](https://gitee.com/run-around---whats-wrong/jimmer-code-gen-kotlin/releases)

前往 git 仓库 release 获取发行版 jar，使用  `java -jar <JAR>` 启动即可，之后从浏览器访问 `localhost:port` 即可，默认端口 8080。

jar 默认以 h2 启动，所以不需要配置任何数据源，但仅使用内存启动，因此请及时导出 model，如有需要请自行通过命令行进行参数配置 [数据源](/source-start/index.html#数据源配置)。

## 模型创建

从首页进入模型列表页，点击左上角 【创建新模型】即可完成创建：

![create-model.png](/images/quick-start/create-model.png)

默认新创建的模型为空，此时我们可以看到空白的编辑器界面：

![empty-model.png](/images/quick-start/empty-model.png)


## 模型编辑

### 表创建

双击画布空白位置就可以唤出表编辑会话框，其中可以编辑表本身、列、索引。

![create-table.png](/images/quick-start/create-table.png)

双击表节点的任意位置就可进行修改。

### 列编辑

在列类别中，可选择框选主键（Id）或业务键（Key），当选中主键后，default 配置和非空将禁用，业务键 checkbox 将变为自增 checkbox。

![table-edit.png](/images/project-preview/table-edit.png)

点击类型配置，可唤出列类型详细配置。
一般情况下类型名称将保持为 jdbc 类型或从数据源导入时元数据的类型，并在**生成 TableDefine 时被翻译为预设的基本类型**。

但在有些特殊情况，例如 postgres 的数组或者 mysql 的 enum 和 set 时，可按照需要启用【以字面类型覆盖 jdbc 类型】以覆盖默认翻译的类型。

![array-type-column.png](/images/quick-start/array-type-column.png)

如果需要统一覆盖某些类型翻译至实体属性类型的结果，例如上图中的 `int[]`，按照 jdbc 类型将翻译为 `Int`，但实际需要翻译为 `List<Int>`，可以点击左下角齿轮打开【类型映射配置】。

> 注意，此处的正则采用的是 java 语言的 Regex，例如 `[` `]` 均需要进行转译。所以请及时进行正则书写的校验。

![type-mapping-config.png](/images/quick-start/type-mapping-config.png)

此时就可以正确得到映射类型了。

![type-mapping-result.png](/images/quick-start/type-mapping-result.png)

> 关于 jdbc 类型默认的翻译结果与类型配置，具体参照后端项目的 ColumnTypeDefiner 接口相关部分：

![column-type-definer.png](/images/quick-start/column-type-definer.png)

### 关联编辑

拖曳表中列部分指向其他列即可创建关联。

![create-association.png](/images/quick-start/create-association.png)

点击关联中的类型标签的左右侧就可以切换关联对应侧的类型。

![change-association-type.png](/images/quick-start/change-association-type.png)

点击关联线条即可切换物理与逻辑/实线与虚线，物理关联将生成真实外键。

![change-association-fake.png](/images/quick-start/change-association-fake.png)

为实线时，关联将被翻译为真实外键，且关联类型默认不进行配置（默认为真）。

```sql
ALTER TABLE `SOURCE` ADD CONSTRAINT `FK_SOURCE_TARGET` 
    FOREIGN KEY (`TARGET_ID`)
  REFERENCES `TARGET` (`ID`)
   ON UPDATE RESTRICT;
```

```kotlin
@ManyToOne
@JoinColumn(
    name = "TARGET_ID",
    referencedColumnName = "ID"
)
val target: Target
```

为虚线时，关联在 DDL 中将只是一个占位注释，而 foreignKeyType 将被设置伪 Fake。

```sql
-- fake association FK_SOURCE_TARGET;
```

```kotlin{5}
@ManyToOne
@JoinColumn(
    name = "TARGET_ID",
    referencedColumnName = "ID"
    foreignKeyType = ForeignKeyType.FAKE
)
val target: Target
```

当然也可以在全局配置中设置默认启用伪外键，此时当关联为真时 foreignKeyType 将覆盖配置为 REAL。

```kotlin{5}
@ManyToOne
@JoinColumn(
    name = "TARGET_ID",
    referencedColumnName = "ID"
    foreignKeyType = ForeignKeyType.REAL
)
val target: Target
```

## 预览生成

点击右上角的几个按钮即可预览和下载最终生成的代码，以下依次是预览 sql，预览实体、下载 model.json（用于留档和导入）、下载全表。

![right-top-toolbar.png](/images/quick-start/right-top-toolbar.png)

具体数据源和语言种类可以通过点击左侧编辑模型的配置进行改变。

![left-top-toolbar.png](/images/quick-start/left-top-toolbar.png)

![model-config.png](/images/project-preview/model-config.png)

此时不能保证声明类型一定正确，所以如有必要请调整 json 内容，json 内容具体的校验请参考前端的 `src/shape/GraphData.ts` 中的 json schema。

## 外源导入

模型支持从数据源导入、从已持久化的模型导入。

### 从数据源导入

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

### 从模型导入

![load-from-model.png](/images/quick-start/load-from-model.png)

从模型导入可以选择任何已经被持久化的模型，包括当前模型。
