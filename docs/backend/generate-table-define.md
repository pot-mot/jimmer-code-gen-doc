# Table Define 生成

:::warning
考虑到实现成本，本项目暂时放弃对非多对多中间表、复合主外键、非结构化映射等特性的支持。
:::

## TableAssociationsView

表生成的基础是 TableAssociationsView 这个 DTO。

以下为简化的形状表示：

```
GenTableAssociationsView {
    schema {
        dataSource
    }

    columns

    indexes

    inAssociations {
        sourceTable

        columnReferences {
            sourceColumn
            targetColumnId
        }
    }

    outAssociations {
        targetTable

        columnReferences {
            sourceColumnId
            targetColumn
        }
    }
}
```

完整定义请参考 [DTO 文件](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/dto/top/potmot/core/GenTable.dto)。

此处具有全部用于生成表定义的信息。

## 表定义

[TableDefineGenerator.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/database/generate/TableDefineGenerator.kt)

生成 TableDefine 本质即将 Table 信息翻译成 DDL 字符串。

[TableDefineBuilder](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/database/generate/builder/TableDefineBuilder.kt)

Builder 内置了各种字符串化方法，在此基础上进行扩展相对容易。

## 列类型

[ColumnTypeDefiner.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/database/generate/columnType/ColumnTypeDefiner.kt)

每种数据库在类型设计上或多或少都有相当程度的差异，本项目的类型系统标准采用 `JdbcType`。

通过精确控制 `JdbcType` 在该数据源中对参数的要求可以满足一些简单的类型翻译，而更详细的处理需要结合以下三个层级一同完成。

- `GenTypeMapping`：类型映射实体。将表转换为实体时，将特定数据源下特定类型翻译为特定属性类型。
- `GenColumnDefault`：列默认实体。在模型设计时，特定数据源下列的默认模板。
- `GenColumn.overwriteByRaw`：列本身的属性，以字面类型覆盖基于 Code 转换的默认类型。

## 标识符长度

数据源对标识符往往带有长度约束，为了避免超出长度限制，项目通过 [IdentifierProcessor.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/database/generate/identifier/IdentifierProcessor.kt) 这一长度限制器进行规避。

> Postgres 和 MySQL 长度限制均默认为 63，所以一般无需担心。

经过 IdentifierFilter 处理，过长的标识符将被修改为 `<base name part> <md5 digest part>`，即将过长标识符的一定长度后的部分截去，替换为长度限制内的 MD5 加密后缀。

这个过程并不发生在导入阶段，而是发生在代码生成过程中，所以模型中的相关信息不会丢失。
