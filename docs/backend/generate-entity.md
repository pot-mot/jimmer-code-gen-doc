# Entity 生成

## EntityPropertiesView

实体生成的基础就是 EntityPropertiesView 这个超级聚合根。

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

与 TableAssociationsView 一样，这里具有了全部生成实体与枚举的信息。

## Convert Table to Entity

转换就是将已存在的 TableAssociationsView 转变为 GenEntityPropertiesView。

之所以选择这样一个方向进行转换而不是从实体提取，是因为关联注解中的信息完全依赖表的数据，而反向解析将困难许多。

具体实现思路如下：
- 转换 Table -> Entity，得到基本的实体。具体详见 [TableEntityConvert](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/entity/convert/TableEntityConvert.kt)。
- 转换一般的 Column -> Property，得到基本的属性。具体详见 [BasePropertyConvert](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/entity/convert/BasePropertyConvert.kt)。
- 基于 Association 等额外信息，将 BaseProperty 转换为 AssociationProperty、IdView。具体详见 [AssociationPropertyConvert](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/entity/convert/AssociationPropertyConvert.kt)。

## Service 和 Controller

目前项目里 Service 和 Controller 还没有提供，且短期内（Jimmer 下 web 项目结构最佳实践出现之前）应该都不会去实现。

因为强业务相关的这些部分在不同项目基础和需求下会有很大的差异性，由模型设计器提供相对鸡肋，使用价值不高。

并且，在 Jimmer 强大的持久化和前后端免对接功能的加持下，其实仅保留一层业务层可能会是更明确的做法，包括本项目也采用了这样的实现方式。

所以这一块如有生成的需要，请按照项目实际需要自行补充。
