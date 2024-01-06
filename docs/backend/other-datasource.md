# 支持其他数据源

首先自然是需要补充 [DataSourceType](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/src/main/kotlin/top/potmot/enumeration/DataSourceType.kt) 枚举值，并**重新生成前端项目的 api**（在前端根目录下执行 `pnpm run api`）。

## 元数据获取

目前项目的元数据是基于 SchemaCrawler 实现的，所以只要是这个库可以支持的数据源就可以被本项目支持。

只需要在 [build.gradle.kts](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/build.gradle.kts) 补充对应的 us.fatehi:schemacrawler-[ ] 依赖即可。

目前获取元数据的思路就是从数据源获取 SchemaCrawler 下的各种 Metadata，并翻译为本项目下的数据模型并持久化。具体实现参考 [DataSourceLoad.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/src%2Fmain%2Fkotlin%2Ftop%2Fpotmot%2Fcore%2Fdatabase%2Fload%2FDataSourceLoad.kt)。

## 生成 TableDefine

这一块是与元数据获取是无关的，所以即使没有办法通过 SchemaCrawler 获取对应元数据也可以生成对应的 TableDefine。

针对目标数据源实现以下两个类，并补充对应入口文件，就可以生成对应的 TableDefine 了：

- [ColumnTypeDefiner.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/src/main/kotlin/top/potmot/core/database/generate/ColumnTypeDefiner.kt)
    - [ColumnTypeDefine.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/src/main/kotlin/top/potmot/core/database/generate/ColumnTypeDefine.kt) 入口文件
- [TableDefineGenerator.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/src/main/kotlin/top/potmot/core/database/generate/TableDefineGenerator.kt)
    - [TableDefineGenerate.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/src/main/kotlin/top/potmot/core/database/generate/TableDefineGenerate.kt) 入口文件
