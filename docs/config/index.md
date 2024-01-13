# 生成配置

:::warning
这一块具体区分近期会有调整，目前仅供参考
:::

## 全局配置

![gen-config-dialog.png](/images/gen-config/gen-config-dialog.png)

目前全局配置支持以上配置项，其中数据源类型、语言、默认包路径会影响新建模型，移除前后缀仅会发生在 table convert entity 这个过程中。

配置相关主要有以下部分：

### [GenConfig.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/src/main/kotlin/top/potmot/context/GenConfig.kt)

基础生成配置，会在请求的当前线程中持续被获取。

> 目前的实现就是一个基于当前线程 id 存储的 Map，具体请查看 [GenConfigContext.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/src/main/kotlin/top/potmot/context/GenConfigContext.kt)。  
> 如果这种实现存在问题请及时告知风险所在。

### [GenConfigProperties.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/src/main/kotlin/top/potmot/context/GenConfigProperties.kt)

属性入参，可残缺版的前者，用于进行 merge。

> 为了避免维护大量属性的 set 操作，项目使用了反射进行属性装填，具体请查看 [Properties.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/src/main/kotlin/top/potmot/utils/bean/Properties.kt)）

### [GlobalGenConfig.kt](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/src/main/kotlin/top/potmot/config/GlobalGenConfig.kt)

全局配置，为 ContextGenConfig 提供基础。上面的全局配置即是在修改它。

## 类型映射

![type-mapping-dialog.png](/images/gen-config/type-mapping-dialog.png)

[GenTypeMapping 实体](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/src/main/kotlin/top/potmot/model/GenTypeMapping.kt)

[列到属性的基本类型转换实现](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/src/main/kotlin/top/potmot/core/entity/convert/ColumnPropertyTypeMapping.kt)

基础类型的映射将基于 TypeMapping 进行搜寻，若没有找到则基于 JDBC 类型根据 Map 映射基本类型，最后都没有找到则直接返回字面类型。

[关联属性转换](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/src/main/kotlin/top/potmot/core/entity/convert/AssociationPropertyConvert.kt)

关联属性则会基于 typeTable.name 转换出对应的类名。

> 此时更合适的做法是直接基于 entity，但是因为在批量转换时无法保证 typeTable 已经转换出 entity，所以没有办法根据 entity name 和 packagePath 转换出类型。

## 列默认

![column-default-dialog.png](/images/gen-config/column-default-dialog.png)

[GenColumnDefault 实体](https://github.com/pot-mot/jimmer-code-gen-kotlin/blob/multi_columns_ref/src/main/kotlin/top/potmot/model/GenColumnDefault.kt)

[前端 Editor 和 Store](https://github.com/pot-mot/jimmer-code-gen-vue3/tree/multi_column_ref/src/components/business/columnDefault)

[列类型配置 Form，ColumnDefault 填充的位置](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/components/business/table/ColumnTypeForm.vue)

建表时配置属性总是个体力活，比如固定的订单号、金额等等，所以补充了这个实体用于设置一些默认值。

将会基于数据源类型和JDBC类型在列编辑中自动填充其余属性。

未来会在这个实体的基础上扩充列模版和表模版功能。



