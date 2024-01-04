# 快速开始

## 项目克隆

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

> pnpm 大于等于 8.8.0


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

在后端项目启动成功后，在前端项目下执行 `vite` 启动前端项目。

:::warning
请务必在后端项目完全启动后再运行前端，因为前端项目启动需要从后端获取 gen config 、type mapping 等基础配置信息。
:::

### 端口配置

后端端口可以通过配置 `application.yml` 中的 `server.port` 从 8080 进行修改。

前端端口可以通过配置 `vite.config.ts` 中的 `server.port` 从 4000 进行修改。

## 模型创建

从首页进入模型列表页，点击左上角 【创建新模型】即可完成创建：

![create-model.png](/images/quick-start/create-model.png)
![empty-model.png](/images/quick-start/empty-model.png)

## 模型编辑

点击目录中的创建表或者双击画布空白位置就可以创建表。

![create-table.png](/images/quick-start/create-table.png)

在类别中可选择主键（Id）或业务键（Key），当选中主键后，default 配置和非空将禁用，业务键 checkbox 将变为自增 checkbox。

![table-edit.png](/images/project-preview/table-edit.png)

在类型配置中可进行详细配置，一般情况下类型名称将保持为 jdbc 类型或从数据源导入时元数据的类型，并在**生成 TableDefine 时被翻译为预设的基本类型**，具体参照后端项目的 ColumnTypeDefine 相关部分，但在有些情况比如 postgres 的数组或者 mysql 的 enum 和 set 时，可按照需要启用【生成 DDL 时以字面类型覆盖 jdbc 类型】。 此时需要在左下角【数据库类型映射】中补充映射到特定语言下的结果（比如数组 -> List）。

双击表节点的任意位置可对表再次打开对话框进行编辑。

拖曳表中列部分指向其他列即可创建关联。

点击关联中的类型标签的左右侧就可以切换关联对应侧的类型。

点击关联线条即可切换物理与逻辑/实线与虚线，物理关联将生成真实外键。

:::warning
关联创建时会默认生成一个名称，但是当列名改变后，这个名称不会发生改变，所以**务必及时变更关联名称**以保证外键名称符合预期。
:::

当然也支持从数据源导入或者从模型导入。

![load-datasource.png](/images/quick-start/load-datasource.png)

![select-schema.png](/images/quick-start/select-schema.png)

![load-from-schema.png](/images/quick-start/load-from-schema.png)

:::danger
本项目默认没有任何安全防御保证措施，所以连接数据源这一行为请务必不要在**不可信任的开发环境**中进行，否则若导致信息泄漏，本项目概不负责。
:::

## 预览生成

点击右上角的几个按钮即可预览和下载最终生成的代码。

![code-preview.png](/images/project-preview/code-preview.png)

具体数据源和语言种类可以通过点击左侧编辑模型的配置进行改变。

![model-config.png](/images/project-preview/model-config.png)

此时不能保证声明类型一定正确，所以如有必要请调整 json 内容。
