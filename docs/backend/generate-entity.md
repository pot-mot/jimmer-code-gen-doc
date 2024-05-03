# Entity 生成

## EntityPropertiesView

实体生成的基础是 EntityPropertiesView 这个 DTO。

以下为简化的形状表示：

```
GenEntityPropertiesView {
    #allScalars

    table {
        schema
    }

    properties {
        column

        typeTable {
            entity
        }

        enum {
            items
        }
    }
}
```

完整定义请参考 [DTO 文件](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/dto/top/potmot/core/GenEntity.dto)。

与 TableAssociationsView 一样，这里具有全部用于生成实体与枚举的信息。

## Convert Table to Entity

转换就是将已存在的 TableAssociationsView 转变为 GenEntityPropertiesView。

之所以选择这样一个方向进行转换而不是从实体提取，是因为关联注解中的信息完全依赖表的数据，而反向解析将困难许多。

具体实现思路如下：
- 转换 Table -> Entity，得到基本的实体。具体详见 [TableEntityConvert](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/entity/convert/TableEntityConvert.kt)。
- 转换一般的 Column -> Property，得到基本的属性。具体详见 [BasePropertyConvert](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/entity/convert/BasePropertyConvert.kt)。
- 基于 Association 等额外信息，将 BaseProperty 转换为 AssociationProperty、IdView。具体详见 [AssociationPropertyConvert](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/entity/convert/AssociationPropertyConvert.kt)。
