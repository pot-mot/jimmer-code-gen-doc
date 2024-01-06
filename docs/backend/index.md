# 后端

## 模型设计

以 `model` 为根，衍生出了 `table -> column, index, association`，`entity -> property` 两系实体。

Table 系列实体：

![table-series.png](/images/backend/table-series.png)

Entity 系列实体：

![entity-series.png](/images/backend/entity-series.png)

目前本项目后端的主要任务就是导入 table 系实体，并将它们转换为 entity 系实体。

## 核心代码索引

导入相关参见 [DataSourceLoad](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/src/main/kotlin/top/potmot/core/database/load/DataSourceLoad.kt) 和 [ModelLoad](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/src/main/kotlin/top/potmot/core/database/load/ModelLoad.kt)。

转换参见 [Convert](https://github.com/pot-mot/jimmer-code-gen-kotlin/tree/multi_columns_ref/src/main/kotlin/top/potmot/core/entity/convert)
