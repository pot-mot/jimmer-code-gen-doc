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

转换就是将已存在的 [TableAssociationsView](/backend/generate-table-define.html#TableAssociationsView) 转变为目标 GenEntityPropertiesView。

之所以选择这样一个方向进行转换而不是从实体提取，是因为关联注解中的信息完全依赖表的数据，而反向解析将困难许多。

具体实现请参考 [Convert](https://github.com/pot-mot/jimmer-code-gen-kotlin/tree/multi_columns_ref/src/main/kotlin/top/potmot/core/entity/convert)。具体思路是一层层进行的，先转换 Table -> Entity，再转换一般的 Column -> Property，再基于 Association 等额外信息将 BaseProperty -> AssociationProperty、IdView。

目前关联属性的转换目前只能表达为一个巨大的 produceProperty 方法，未来将在函数声明保持不变的情况下持续拆解调整这个部分。

## Service 和 Controller

目前项目里 Service 和 Controller 都还没有提供，原因是这二者在不同项目基础下会有很大不同。 甚至部分 Jimmer 的项目实践下，仅保留 Service 一层也已完全足够，所以我仅个人决定这一块还是用户自己实现为好。


