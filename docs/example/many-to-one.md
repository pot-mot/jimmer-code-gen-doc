# 一对多 / 多对一

> 以下以 Kotlin、MySQL 为演示标准

一对多几乎称得上是最普遍的关联模式，只要存在一般性的“从属关系”，基本就可以视为一条一对多关联。

在数据模型层面，这条关联会表现为由**子实体的外键列**指向**主实体的主键列**的外键约束。而在模型层面，这条关联自然可以反向存在。

下面就对多对一和一对多这对反转的关联进行简单的建模演示。

> 可直接复制 copy-data.json 至模型设计器中。

## 订单与订单明细（多对一，子指向主）

![detail-to-order.png](/images/many-to-one/detail-to-order.png)

<details>
    <summary>copy-data.json</summary>

```json
{
    "tables": [
        {
            "name": "order_detail",
            "comment": "订单明细",
            "remark": "",
            "type": "TABLE",
            "superTables": [],
            "columns": [
                {
                    "orderKey": 1,
                    "name": "id",
                    "comment": "ID",
                    "typeCode": -5,
                    "overwriteByRaw": false,
                    "rawType": "BIGINT",
                    "typeNotNull": true,
                    "dataSize": 0,
                    "numericPrecision": 0,
                    "partOfPk": true,
                    "autoIncrement": true,
                    "remark": "",
                    "logicalDelete": false,
                    "businessKey": false
                },
                {
                    "orderKey": 2,
                    "name": "order_id",
                    "comment": "订单 ID",
                    "typeCode": -5,
                    "overwriteByRaw": false,
                    "rawType": "BIGINT",
                    "typeNotNull": true,
                    "dataSize": 0,
                    "numericPrecision": 0,
                    "partOfPk": false,
                    "autoIncrement": false,
                    "remark": "",
                    "logicalDelete": false,
                    "businessKey": false
                },
                {
                    "orderKey": 3,
                    "name": "commodity_name",
                    "comment": "商品名",
                    "typeCode": 12,
                    "overwriteByRaw": false,
                    "rawType": "VARCHAR",
                    "typeNotNull": true,
                    "dataSize": 0,
                    "numericPrecision": 0,
                    "partOfPk": false,
                    "autoIncrement": false,
                    "remark": "",
                    "logicalDelete": false,
                    "businessKey": false
                },
                {
                    "orderKey": 4,
                    "name": "commodity_quantity",
                    "comment": "商品数量",
                    "typeCode": 4,
                    "overwriteByRaw": false,
                    "rawType": "INTEGER",
                    "typeNotNull": true,
                    "dataSize": 0,
                    "numericPrecision": 0,
                    "partOfPk": false,
                    "autoIncrement": false,
                    "remark": "",
                    "logicalDelete": false,
                    "businessKey": false
                }
            ],
            "indexes": []
        },
        {
            "name": "sale_order",
            "comment": "订单",
            "remark": "",
            "type": "TABLE",
            "superTables": [],
            "columns": [
                {
                    "orderKey": 1,
                    "name": "id",
                    "comment": "ID",
                    "typeCode": -5,
                    "overwriteByRaw": false,
                    "rawType": "BIGINT",
                    "typeNotNull": true,
                    "dataSize": 0,
                    "numericPrecision": 0,
                    "partOfPk": true,
                    "autoIncrement": true,
                    "remark": "",
                    "logicalDelete": false,
                    "businessKey": false
                },
                {
                    "orderKey": 2,
                    "name": "serial_no",
                    "comment": "流水号",
                    "typeCode": 12,
                    "overwriteByRaw": false,
                    "rawType": "VARCHAR",
                    "typeNotNull": true,
                    "dataSize": 0,
                    "numericPrecision": 0,
                    "partOfPk": false,
                    "autoIncrement": false,
                    "remark": "",
                    "logicalDelete": false,
                    "businessKey": false
                },
                {
                    "orderKey": 3,
                    "name": "create_time",
                    "comment": "创建时间",
                    "typeCode": 93,
                    "overwriteByRaw": false,
                    "rawType": "TIMESTAMP",
                    "typeNotNull": true,
                    "dataSize": 0,
                    "numericPrecision": 0,
                    "partOfPk": false,
                    "autoIncrement": false,
                    "remark": "",
                    "logicalDelete": false,
                    "businessKey": false
                }
            ],
            "indexes": []
        }
    ],
    "associations": [
        {
            "type": "MANY_TO_ONE",
            "fake": false,
            "name": "fk_detail_to_order",
            "updateAction": "",
            "deleteAction": "",
            "sourceTableName": "order_detail",
            "targetTableName": "sale_order",
            "columnReferences": [
                {
                    "sourceColumnName": "order_id",
                    "targetColumnName": "id"
                }
            ],
            "dissociateAction": "DELETE"
        }
    ],
    "enums": [],
    "optionsList": [
        {
            "x": 482,
            "y": 0
        },
        {
            "x": 0,
            "y": 0
        }
    ]
}
```
</details>

以下就是关联属性的映射结果，就是一对 @ManyToOne 和 @OneToMany 属性：

```kotlin
/**
 * 订单
 */
@ManyToOne
@JoinColumn(
    name = "order_id",
    referencedColumnName = "id"
)
@OnDissociate(DissociateAction.DELETE)
val saleOrder: SaleOrder
```
```kotlin
/**
 * 订单明细
 */
@OneToMany(mappedBy = "saleOrder")
val orderDetails: List<OrderDetail>
```

而生成的外键即与模型一致，由 detail 指向 order：
```sql
ALTER TABLE `order_detail`
    ADD CONSTRAINT `fk_detail_to_order`
        FOREIGN KEY (`order_id`)
            REFERENCES `sale_order` (`id`);
```

## 班级和学生（一对多，主指向子）

![class-to-student.png](/images/many-to-one/class-to-student.png)

<details>
    <summary>copy-data.json</summary>
    
```json
{
    "tables": [
        {
            "name": "edu_class",
            "comment": "班级",
            "remark": "",
            "type": "TABLE",
            "superTables": [],
            "columns": [
                {
                    "orderKey": 1,
                    "name": "id",
                    "comment": "ID",
                    "typeCode": -5,
                    "overwriteByRaw": false,
                    "rawType": "BIGINT",
                    "typeNotNull": true,
                    "dataSize": 19,
                    "numericPrecision": 0,
                    "partOfPk": true,
                    "autoIncrement": true,
                    "remark": "",
                    "logicalDelete": false,
                    "businessKey": false
                },
                {
                    "orderKey": 2,
                    "name": "class_code",
                    "comment": "班号",
                    "typeCode": 12,
                    "overwriteByRaw": false,
                    "rawType": "VARCHAR",
                    "typeNotNull": true,
                    "dataSize": 500,
                    "numericPrecision": 0,
                    "partOfPk": false,
                    "autoIncrement": false,
                    "remark": "",
                    "logicalDelete": false,
                    "businessKey": false
                },
                {
                    "orderKey": 3,
                    "name": "name",
                    "comment": "名称",
                    "typeCode": 12,
                    "overwriteByRaw": false,
                    "rawType": "VARCHAR",
                    "typeNotNull": true,
                    "dataSize": 500,
                    "numericPrecision": 0,
                    "partOfPk": false,
                    "autoIncrement": false,
                    "remark": "",
                    "logicalDelete": false,
                    "businessKey": false
                }
            ],
            "indexes": []
        },
        {
            "name": "edu_student",
            "comment": "学生",
            "remark": "",
            "type": "TABLE",
            "superTables": [],
            "columns": [
                {
                    "orderKey": 1,
                    "name": "id",
                    "comment": "ID",
                    "typeCode": -5,
                    "overwriteByRaw": false,
                    "rawType": "BIGINT",
                    "typeNotNull": true,
                    "dataSize": 19,
                    "numericPrecision": 0,
                    "partOfPk": true,
                    "autoIncrement": true,
                    "remark": "",
                    "logicalDelete": false,
                    "businessKey": false
                },
                {
                    "orderKey": 2,
                    "name": "student_code",
                    "comment": "学号",
                    "typeCode": 12,
                    "overwriteByRaw": false,
                    "rawType": "VARCHAR",
                    "typeNotNull": true,
                    "dataSize": 500,
                    "numericPrecision": 0,
                    "partOfPk": false,
                    "autoIncrement": false,
                    "remark": "",
                    "logicalDelete": false,
                    "businessKey": false
                },
                {
                    "orderKey": 3,
                    "name": "name",
                    "comment": "名称",
                    "typeCode": 12,
                    "overwriteByRaw": false,
                    "rawType": "VARCHAR",
                    "typeNotNull": true,
                    "dataSize": 500,
                    "numericPrecision": 0,
                    "partOfPk": false,
                    "autoIncrement": false,
                    "remark": "",
                    "logicalDelete": false,
                    "businessKey": false
                },
                {
                    "orderKey": 4,
                    "name": "class_id",
                    "comment": "班级",
                    "typeCode": -5,
                    "overwriteByRaw": false,
                    "rawType": "BIGINT",
                    "typeNotNull": true,
                    "dataSize": 19,
                    "numericPrecision": 0,
                    "partOfPk": false,
                    "autoIncrement": false,
                    "remark": "",
                    "logicalDelete": false,
                    "businessKey": false
                }
            ],
            "indexes": []
        }
    ],
    "associations": [
        {
            "type": "ONE_TO_MANY",
            "fake": false,
            "name": "fk_edu_student_edu_class",
            "updateAction": "",
            "deleteAction": "",
            "sourceTableName": "edu_class",
            "targetTableName": "edu_student",
            "columnReferences": [
                {
                    "sourceColumnName": "id",
                    "targetColumnName": "class_id"
                }
            ]
        }
    ],
    "enums": [],
    "optionsList": [
        {
            "x": 455,
            "y": 0
        },
        {
            "x": 0,
            "y": 0
        }
    ]
}
```
</details>

此时关联类型为一对多，但是本质还是多对一映射，因此生成的外键为 student 指向 class：

```sql
ALTER TABLE `edu_student`
    ADD CONSTRAINT `fk_edu_student_edu_class`
        FOREIGN KEY (`class_id`)
            REFERENCES `edu_class` (`id`);
```

生成的属性也和上面的多对一没有本质差异

```kotlin
/**
 * 学生
 */
@OneToMany(mappedBy = "eduClass")
val eduStudents: List<EduStudent>
```
```kotlin
/**
 * 班级
 */
@ManyToOne
@JoinColumn(
    name = "class_id",
    referencedColumnName = "id"
)
val eduClass: EduClass
```



