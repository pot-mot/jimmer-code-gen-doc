# 源码启动

项目是标准的 web 项目，所以一切按照常规流程即可。

## 克隆项目

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
> 这一步需要**较长**时间，如果是初次接触 gradle，请务必耐心等待。

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

在后端项目启动成功后，在前端项目根目录下执行 `pnpm run dev` 命令启动前端项目。

:::warning
请务必在后端项目完全启动后再运行前端，因为前端项目启动需要从后端获取 gen config 、type mapping 等基础配置信息。
:::

### 端口配置

后端端口通过配置 [application.yml](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/src/main/resources/application.yml) 中的 `server.port` 进行修改，默认为 8080。

前端端口通过配置 [vite.config.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/vite.config.ts) 中的 `server.port` 进行修改，默认为 4000。

## 项目打包

如果需要打包，在前端根目录下使用 `pnpm run build` 打包为 dist，放置于后端 resources 下，之后使用 bootJar 打包，最终产物将位于 `/build/libs` 下。

默认静态资源路径已在 [application.yml](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/src/main/resources/application.yml) 中通过配置覆盖至 classpath:/dist，如有需要自行调整。
```yaml
spring:
  web:
    resources:
      static-locations: classpath:/dist
```
