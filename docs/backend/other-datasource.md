# 支持其他数据源

目前项目支持数据源存在两个角度，一是元数据获取，二是生成 TableDefine，下面将从两个角度说明数据源支持的实现。

## 补充枚举值

首先补充 [DataSourceType](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/enumeration/DataSourceType.kt) 枚举值，并**重新生成前端项目的 api**（在前端根目录下执行 `pnpm run api`）。

## 元数据获取

不同数据源元数据结构差异较大，所以本项目并不选择直接获取元数据，而是基于 [SchemaCrawler](https://www.schemacrawler.com/) 实现。

目前从 SchemaCrawler 导入仅有 [DataSourceLoad](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/database/load/DataSourceLoad.kt) 是唯一一处入口，因此只要目标数据源可以被 SchemaCrawler 支持就可以被本项目使用。

此时只需要在 [build.gradle.kts](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/build.gradle.kts) 补充对应的 us.fatehi:schemacrawler-[ ] 依赖即可。

如果数据源不被 SchemaCrawler 支持则需要自行使用 JDBC 从目标数据源获取元数据并拼凑保存 Table、Association 等信息。

## 生成 TableDefine

这一块是与元数据获取是无关的，本质只是拼凑字符串，所以即使没有办法通过 SchemaCrawler 获取对应元数据，也可以生成对应的 TableDefine。

针对目标数据源，需要于 [impl](https://github.com/pot-mot/jimmer-code-gen-kotlin/tree/main/src/main/kotlin/top/potmot/core/database/generate/impl) 中进行实现，并补充对应入口文件：

- [ColumnTypeDefiner.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/database/generate/columnType/ColumnTypeDefiner.kt) 列类型定义器
    - [Index.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/database/generate/columnType/Index.kt) 入口文件
- [IdentifierFilter.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/database/generate/identifier/IdentifierFilter.kt) 标志符过滤器（过长标志符处理）
    - [Index.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/database/generate/identifier/Index.kt) 入口文件
- [TableDefineGenerator.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/database/generate/TableDefineGenerator.kt) 表定义生成器
    - [Index.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/database/generate/Index.kt) 入口文件
