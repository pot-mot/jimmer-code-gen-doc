# 快速开始

## 直接基于 jar 启动

如果想快速体验本项目，可以选择直接通过 [jar 包](https://github.com/pot-mot/jimmer-code-gen-kotlin/tree/multi_columns_ref/jar) 启动本项目。

此时直接前往 jar 目录下使用  `java -jar <JAR>` 命令即可启动项目，之后可从浏览器访问 `localhost:8080` 。

jar 默认以 h2 启动，所以不需要配置任何数据源，如有需要请自行配置 [数据源](#数据源配置)。

> jar 包启动时前端 history 模式路由当页面刷新时无法保持，此时需要重新回到根路由。

使用 jar 请直接跳转至 [模型创建](#模型创建) 继续。

## 使用项目源码

克隆项目至本地：

- github
```
git clone https://github.com/pot-mot/jimmer-code-gen-vue3

git clone https://github.com/pot-mot/jimmer-code-gen-kotlin
```

- gitee
```
git clone https://gitee.com/run-around---whats-wrong/jimmer-code-gen-vue3

git clone https://gitee.com/run-around---whats-wrong/jimmer-code-gen-kotlin
```

## 依赖下载

进入前端项目根目录，运行 `pnpm install` 下载依赖。

> 项目的开发环境中 pnpm 版本为 8.8.0，node 版本为 20.8.0，可能相对较新，可以通过 nvm 进行 node 版本管理。


使用 idea 打开后端项目，进入根目录下的 `build.gradle.kts`，刷新 gradle 依赖。

> gradle 项目初次导入时 idea 将下载全新 gradle 和对应依赖，所以建议开启 build.gradle.kts 中的maven源镜像注释或自行配置其他镜像源。
>
> 这一步需要较长时间，请务必耐心等待。

```kts
repositories {
    maven { setUrl("https://maven.aliyun.com/repository/public/") }
    maven { setUrl("https://maven.aliyun.com/repository/spring/") }
}
```

## 数据源配置

目前后端项目支持的数据源有 [H2](https://h2database.com/html/main.html)、[MySQL](https://www.mysql.com/)、[PostgreSQL](https://www.postgresql.org/)，
可根据实际需要选择对应的数据源。

后端项目 resources 下有对应数据源的 sql 脚本和 profile，切换 `application.yml` 下的 `spring.profiles.active` 为对应 profile，并按照下方详细要求进行配置即可。

**因为本项目配置默认采用小写命名，所以请尽可能不要改变 sql 脚本的大小写**。

### H2

```yaml
spring:
  datasource:
    driver-class-name: org.h2.Driver
    url: jdbc:h2:mem:jimmer_code_gen
    username: root
    password: root

  h2:
    console:
      enabled: true
      path: /h2
```

默认以内存形式启动。此时后端项目可不进行任何配置就直接启动，**但不会持久化任何数据**。如需要持久化，可以将 url 配置为基于文件：`jdbc:h2:file:<FILE_PATH>`。

可以通过 host:port/h2（默认情况下是 localhost:8080/h2 ）访问 h2 web console，基于配置 datasource.url username password（默认情况下是 root，root）进行连接。

项目启动时将自动检测 url 是否以 `jdbc:h2` 开始，如果是，就将自动执行 `resources/sql/h2/jimmer_code_gen.sql`。 

### MySQL

创建名为 jimmer_code_gen 的 database。

```sql
CREATE DATABASE jimmer_code_gen;
```

在其中执行 `resources/sql/mysql/jimmer_code_gen.sql`。

之后修改 `application-mysql.yml` 中的连接配置。

### PostgreSQL

在默认 database postgres 下创建 schema jimmer_code_gen。

```sql
CREATE SCHEMA jimmer_code_gen;
```

在其中执行 `resources/sql/postgresql/jimmer_code_gen.sql`。

之后修改 `application-postgresql.yml` 中的连接配置。

## 项目启动

运行 `src/main/kotlin/top/potmot/JimmerCodeGenApplication.kt` 的 main 方法，启动后端项目。

在后端项目启动成功后，在前端项目根目录下执行 `vite` 命令启动前端项目。

:::warning
请务必在后端项目完全启动后再运行前端，因为前端项目启动需要从后端获取 gen config 、type mapping 等基础配置信息。
:::

### 端口配置

后端端口通过配置 [application.yml](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/src/main/resources/application.yml) 中的 `server.port` 进行修改，默认为 8080。

前端端口通过配置 [vite.config.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/vite.config.ts) 中的 `server.port` 进行修改，默认为 4000。

若变更后端接口且需要打包，就需要同步变更前端项目 [api](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/api/index.ts) 中的 BASE_URL。

## 模型创建

从首页进入模型列表页，点击左上角 【创建新模型】即可完成创建：

![create-model.png](/images/quick-start/create-model.png)

默认新创建的模型为空，此时我们可以看到空白的编辑器界面：

![empty-model.png](/images/quick-start/empty-model.png)


## 模型编辑

### 表创建

点击左侧菜单中的创建表或者双击画布空白位置就可以唤出表编辑会话框，其中可以编辑表本身、列、索引。

![create-table.png](/images/quick-start/create-table.png)

双击存在的表节点的任意位置或者点击左侧 Node 栏的编辑按钮就可进行修改。

### 列编辑

在列类别中，可选择框选主键（Id）或业务键（Key），当选中主键后，default 配置和非空将禁用，业务键 checkbox 将变为自增 checkbox。

![table-edit.png](/images/project-preview/table-edit.png)

点击类型配置，可唤出列类型详细配置。
一般情况下类型名称将保持为 jdbc 类型或从数据源导入时元数据的类型，并在**生成 TableDefine 时被翻译为预设的基本类型**。

但在有些特殊情况，例如 postgres 的数组或者 mysql 的 enum 和 set 时，可按照需要启用【生成 DDL 时以字面类型覆盖 jdbc 类型】以覆盖默认翻译的类型。

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

![real-association.png](/images/quick-start/real-association.png)
![real-association-entity.png](/images/quick-start/real-association-entity.png)


为虚线时，关联在 DDL 中将只是一个占位注释，而关联将变为 Fake。

![logical-association.png](/images/quick-start/logical-association.png)
![logical-association-entity.png](/images/quick-start/logical-association-entity.png)

:::warning
关联创建时会默认生成一个名称，但是当列名改变后，这个名称不会发生改变，所以**务必及时变更关联名称**以保证外键名称符合预期。
:::

## 预览生成

点击右上角的几个按钮即可预览和下载最终生成的代码，以下依次是预览 sql，预览实体、下载 model.json（用于留档和导入）、下载全表。

![right-top-toolbar.png](/images/quick-start/right-top-toolbar.png)

具体数据源和语言种类可以通过点击左侧编辑模型的配置进行改变。

![left-top-toolbar.png](/images/quick-start/left-top-toolbar.png)

![model-config.png](/images/project-preview/model-config.png)

此时不能保证声明类型一定正确，所以如有必要请调整 json 内容，json 内容具体的校验请参考前端的 `src/shape/GraphData.ts` 中的 json schema。

## 外源导入

模型支持从数据源导入、从模型导入以及从其他 model.json 导入（从其他 model.json 请请前往模型列表页左上角）。

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
