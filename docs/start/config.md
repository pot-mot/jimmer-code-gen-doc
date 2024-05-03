# 生成配置

## 全局配置

![gen-config-dialog.png](/images/gen-config/gen-config-dialog.png)

目前全局配置支持以上配置项，将在模型新建时进行赋值。

> 移除前后缀仅影响 table convert entity 中的名称转换以及外键和索引名称的默认生成。

配置相关主要有以下部分，均为基于 GenModel 衍生出的 DTO：

- GenConfig

基础生成配置，会在请求的当前线程中作为上下文被使用。

- GenConfigProperties

全属性可残缺的 input，用于与配置进行 merge。

- GlobalGenConfig

全局配置，为 ContextGenConfig 提供基础。上面的全局配置表单即是在修改它。

## 类型映射

![type-mapping-dialog.png](/images/gen-config/type-mapping-dialog.png)

列到实体属性的类型映射默认将基于 JDBC 类型进行翻译。

若配置了 TypeMapping，则将优先根据数据源类型与正则表达式进行映射。

:::info
具体可参考以下源码：

[列到属性的类型转换](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/main/src/main/kotlin/top/potmot/core/entity/convert/ColumnPropertyTypeMapping.kt)
:::
