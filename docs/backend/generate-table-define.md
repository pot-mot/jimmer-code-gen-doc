# Table Define 生成

一对多中间表、复合主外键、非结构化映射等均不符合关系型数据库范式，同时也因为开发实现成本， 本项目放弃支持这些特性。
并且，强烈建议若非为了兼容过去的数据库设计，统一将数据库设计成符合关系型数据库范式。

下面再次罗列三个范式：
- 第一范式：数据表中的每一列(字段)，必须是不可拆分的最小单元，确保每一列的原子性。
- 第二范式：满足第一范式后，要求表中的所有列都依赖于主键，而不能有任何一列与主键没有关系，遵循唯一性。
- 第三范式：满足第二范式后，要求表中的每一列只能依赖于主键，而不依赖于其他非主属性，消除传递依赖。

我由衷希望诸位能基于范式设计模型。

## TableAssociationsView

表生成的基础就是 TableAssociationsView 这个超级聚合根。

正如名称一样，聚合了生成 TableDefine 所需要的一切信息的根形状。

以下的简化的形状表示：

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

完整定义请参考 [DTO 文件](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/dto/top/potmot/model/GenTable.dto#L55)。

通过在表基本信息的基础上结合 in 与 out 两个方向的 association ，可以轻松获取 Table 所需要的全部信息。

## 表定义

[TableDefineGenerator.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/database/generate/TableDefineGenerator.kt)

生成 TableDefine 本质就是将 Table 内的信息翻译成 DDL 字符串，是个相对纯粹的体力活。

因为不同数据库的 DDL 或多或少有些差异，所以需要这样一个抽象类作为入口，而令特定数据源去实现。

[TableDefineBuilder](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/database/generate/builder/TableDefineBuilder.kt)

减少额外体力活的工具就是 Builder 这个字符串拼接工具。

Builder 内置了各种字符串化方法，在这个基础上进行扩展会相对容易。

## 列类型

[ColumnTypeDefiner.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/database/generate/columnType/ColumnTypeDefiner.kt)

类型系统并不简单，每种数据库在类型设计上或多或少都有相当程度的差异。本项目的类型系统标准选择了 jdbc type。

通过精确控制 jdbc type 在该数据源中对参数的要求可以满足一些简单的类型翻译，而更多的部分就需要结合以下三个层级去一同完成了。

- GenColumn.overwriteByRaw（属性级别，以字面类型覆盖 jdbc type）
- GenColumnDefault（模型设计时，特定数据源类型下特定 jdbc type 列的默认值配置）
- GenTypeMapping（转换实体时，特定数据源类型下特定 jdbc type 翻译为特定属性的映射配置）

## 标识符长度

数据源对标识符往往带有长度约束，为了避免超出长度限制，项目通过 [IdentifierFilter.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/database/generate/identifier/IdentifierFilter.kt) 这一长度限制器进行规避。

> Postgres 和 MySQL 长度限制均默认为 63，所以一般无需担心。

经过 IdentifierFilter 处理，过长的标识符将被修改为 `<base name part> <md5 digest part>`，将过长标识符的一定长度后的部分截去，替换为长度限制内的加密后缀。

这个过程并不发生在导入阶段，而是发生在代码生成过程中，所以模型中相关信息不会丢失。
