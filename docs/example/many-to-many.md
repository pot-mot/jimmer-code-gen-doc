# 多对多

> 以下以小写、Kotlin、MySQL 为演示标准

多对多也相当常见，在这种关联中，双方是平等的，所以关联由哪一方发起并不重要。

在数据模型层面采用中间表实现。

当对中间表没有任何额外要求时，仅需要创建一条位于两个表主键列间的 ManyToMany 关联即可隐式的创建一张纯粹的中间表。

（当有额外存储需要，例如变更时间时，则必须要显式创建中间表并创建两条 ManyToOne 关联。更多内容请参考 Jimmer 的 [ManyToManyView](https://babyfish-ct.gitee.io/jimmer-doc/docs/mapping/advanced/view/many-to-many-view/) 这个功能）

## 厂家与产品

厂家不止生产一种产品，一种产品也不止由一家工厂生产，这自然是一个标准的多对多关系。

![factory-to-product.png](/images/many-to-many/factory-to-product.png)

<details>
    <summary>GraphData.json</summary>

```json
{
    "tables": [
        {
            "name": "factory",
            "comment": "工厂",
            "remark": "",
            "type": "TABLE",
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
                    "idGeneration": false,
                    "logicalDelete": false,
                    "businessKey": false
                },
                {
                    "orderKey": 2,
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
                    "idGeneration": false,
                    "logicalDelete": false,
                    "businessKey": false
                }
            ],
            "indexes": []
        },
        {
            "name": "product",
            "comment": "产品",
            "remark": "",
            "type": "TABLE",
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
                    "idGeneration": false,
                    "logicalDelete": false,
                    "businessKey": false
                },
                {
                    "orderKey": 2,
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
                    "idGeneration": false,
                    "logicalDelete": false,
                    "businessKey": false
                }
            ],
            "indexes": []
        }
    ],
    "associations": [
        {
            "type": "MANY_TO_MANY",
            "fake": false,
            "name": "factory_product_mapping",
            "updateAction": "",
            "deleteAction": "",
            "sourceTable": {
                "name": "factory",
                "comment": "工厂"
            },
            "targetTable": {
                "name": "product",
                "comment": "产品"
            },
            "columnReferences": [
                {
                    "sourceColumn": {
                        "name": "id",
                        "comment": "ID",
                        "rawType": "BIGINT",
                        "typeCode": -5
                    },
                    "targetColumn": {
                        "name": "id",
                        "comment": "ID",
                        "rawType": "BIGINT",
                        "typeCode": -5
                    }
                }
            ]
        }
    ],
    "enums": [],
    "optionsList": [
        {
            "x": 406,
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


此时将自然生产一张中间表与两个外键约束。

```sql
CREATE TABLE `factory_product_mapping` (
    `factory_id` BIGINT NOT NULL,
    `product_id` BIGINT NOT NULL
)
  ENGINE = InnoDB
  CHARACTER SET = utf8mb4
  COMMENT = '工厂与产品的映射关系表'
  ROW_FORMAT = Dynamic;

ALTER TABLE `factory_product_mapping` ADD CONSTRAINT `pk_factory_product_mapping` PRIMARY KEY (`factory_id`,`product_id`);

ALTER TABLE `factory_product_mapping` ADD CONSTRAINT `factory_product_mapping_s` 
    FOREIGN KEY (`factory_id`)
        REFERENCES `factory` (`id`);

ALTER TABLE `factory_product_mapping` ADD CONSTRAINT `factory_product_mapping_t` 
    FOREIGN KEY (`product_id`)
        REFERENCES `product` (`id`);
```

而在属性层面自然就是一对 @ManyToMany，即对称的两组 List。

```kotlin
/**
 * 产品
 */
@ManyToMany
@JoinTable(
    name = "factory_product_mapping",
    joinColumnName = "factory_id",
    inverseJoinColumnName = "product_id"
)
val products: List<Product>
```
```kotlin
/**
 * 工厂
 */
@ManyToMany(mappedBy = "products")
val factories: List<Factory>
```
