# 多对多

> 以下以小写、Kotlin、MySQL 为演示标准

多对多也相当常见，在这种关联中，双方是平等的，所以关联由哪一方发起并不重要。

在数据模型层面，这种关联除非采用非常不利于查询的数组存储，否则一般采用中间表实现。

当对中间表没有任何额外要求时，仅需要创建一条位于两个表主键列间的 ManyToMany 关联即可隐式的创建一张纯粹的中间表。

（当有额外存储需要，例如变更时间时，则必须要显式创建中间表并创建两条 ManyToOne 关联。更多内容请参考 Jimmer 的 ManyToManyView 这个功能）

## 厂家与产品

厂家不止生产一种产品，一种产品也不止由一家工厂生产，这自然是一个标准的多对多关系。

![factory-to-product.png](/images/many-to-many/factory-to-product.png)

<details>
    <summary>GraphData.json</summary>

```json
{
    "json": {
        "cells": [
            {
                "position": {
                    "x": 640,
                    "y": 340
                },
                "size": {
                    "width": 206,
                    "height": 94
                },
                "view": "vue-shape-view",
                "shape": "TABLE_NODE",
                "id": "0af93104-4d36-4aab-9902-2625734c4056",
                "data": {
                    "table": {
                        "name": "product",
                        "comment": "产品",
                        "remark": "",
                        "orderKey": 0,
                        "type": "TABLE",
                        "columns": [
                            {
                                "orderKey": 1,
                                "name": "id",
                                "comment": "ID",
                                "typeCode": -5,
                                "overwriteByType": false,
                                "type": "BIGINT",
                                "typeNotNull": true,
                                "displaySize": 0,
                                "numericPrecision": 0,
                                "partOfPk": true,
                                "autoIncrement": true,
                                "remark": "",
                                "logicalDelete": false,
                                "businessKey": false
                            },
                            {
                                "orderKey": 2,
                                "name": "name",
                                "comment": "名称",
                                "typeCode": 12,
                                "overwriteByType": false,
                                "type": "VARCHAR",
                                "typeNotNull": true,
                                "displaySize": 0,
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
                },
                "zIndex": 19,
                "ports": {
                    "groups": {
                        "COLUMN_PORT_GROUP": {
                            "position": "COLUMN_PORT",
                            "markup": [
                                {
                                    "tagName": "rect",
                                    "selector": "COLUMN_PORT_SELECTOR"
                                }
                            ],
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "magnet": true,
                                    "fill": "rgba(0,0,0,0)",
                                    "height": 30,
                                    "width": 200
                                }
                            }
                        }
                    },
                    "items": [
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "788a5f29-c96c-4a78-abea-08d79110ac16",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 206
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "e975110c-fb95-4760-a790-637c880d07d5",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 206
                                }
                            }
                        }
                    ]
                }
            },
            {
                "position": {
                    "x": 260,
                    "y": 340
                },
                "size": {
                    "width": 206,
                    "height": 94
                },
                "view": "vue-shape-view",
                "shape": "TABLE_NODE",
                "id": "619dca2a-560a-4185-9db2-d3619a042bd8",
                "data": {
                    "table": {
                        "name": "factory",
                        "comment": "工厂",
                        "remark": "",
                        "orderKey": 0,
                        "type": "TABLE",
                        "columns": [
                            {
                                "orderKey": 1,
                                "name": "id",
                                "comment": "ID",
                                "typeCode": -5,
                                "overwriteByType": false,
                                "type": "BIGINT",
                                "typeNotNull": true,
                                "displaySize": 0,
                                "numericPrecision": 0,
                                "partOfPk": true,
                                "autoIncrement": true,
                                "remark": "",
                                "logicalDelete": false,
                                "businessKey": false
                            },
                            {
                                "orderKey": 2,
                                "name": "name",
                                "comment": "名称",
                                "typeCode": 12,
                                "overwriteByType": false,
                                "type": "VARCHAR",
                                "typeNotNull": true,
                                "displaySize": 0,
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
                },
                "zIndex": 21,
                "ports": {
                    "groups": {
                        "COLUMN_PORT_GROUP": {
                            "position": "COLUMN_PORT",
                            "markup": [
                                {
                                    "tagName": "rect",
                                    "selector": "COLUMN_PORT_SELECTOR"
                                }
                            ],
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "magnet": true,
                                    "fill": "rgba(0,0,0,0)",
                                    "height": 30,
                                    "width": 200
                                }
                            }
                        }
                    },
                    "items": [
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "8be08c3e-3f6e-4ba2-832b-0f220ae69f4d",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 206
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "5caece10-5f96-4039-a91f-e71190a894f3",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 206
                                }
                            }
                        }
                    ]
                }
            },
            {
                "shape": "ASSOCIATION_EDGE",
                "router": {
                    "name": "er",
                    "args": {
                        "direction": "H"
                    }
                },
                "id": "c9fbe5b6-eccc-4692-acb2-38b8d11fc954",
                "zIndex": 22,
                "labels": [
                    {
                        "markup": [
                            {
                                "tagName": "rect",
                                "selector": "body"
                            },
                            {
                                "tagName": "text",
                                "selector": "ASSOCIATION_LABEL_TEXT_SELECTOR"
                            }
                        ],
                        "attrs": {
                            "ASSOCIATION_LABEL_TEXT_SELECTOR": {
                                "text": "MANY_TO_MANY",
                                "fill": "var(--common-color)",
                                "fontWeight": "normal"
                            },
                            "body": {
                                "ref": "ASSOCIATION_LABEL_TEXT_SELECTOR",
                                "fill": "#f5f5f5"
                            }
                        }
                    }
                ],
                "data": {
                    "association": {
                        "associationType": "MANY_TO_MANY",
                        "fake": false,
                        "name": "fk_factory_id_product_id",
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
                                    "type": "BIGINT",
                                    "typeCode": -5
                                },
                                "targetColumn": {
                                    "name": "id",
                                    "comment": "ID",
                                    "type": "BIGINT",
                                    "typeCode": -5
                                }
                            }
                        ]
                    }
                },
                "source": {
                    "cell": "619dca2a-560a-4185-9db2-d3619a042bd8",
                    "port": "8be08c3e-3f6e-4ba2-832b-0f220ae69f4d"
                },
                "target": {
                    "cell": "0af93104-4d36-4aab-9902-2625734c4056",
                    "port": "788a5f29-c96c-4a78-abea-08d79110ac16"
                }
            }
        ]
    },
    "zoom": 1,
    "transform": "matrix(1,0,0,1,-114,-17)"
}
```
</details>


此时将自然生产一张中间表与两个外键约束。

```sql
CREATE TABLE `fk_factory_id_product_id` (
    `factory_id` BIGINT(0) NOT NULL,
    `product_id` BIGINT(0) NOT NULL
)
  ENGINE = InnoDB
  CHARACTER SET = utf8mb4
  COMMENT = '工厂与产品的映射关系表'
  ROW_FORMAT = Dynamic;

ALTER TABLE `fk_factory_id_product_id` ADD CONSTRAINT `pk_fk_factory_id_product_id` PRIMARY KEY (`factory_id`,`product_id`);

ALTER TABLE `fk_factory_id_product_id` ADD CONSTRAINT `fk_factory_id_product_id_s` 
    FOREIGN KEY (`factory_id`)
  REFERENCES `factory` (`id`);

ALTER TABLE `fk_factory_id_product_id` ADD CONSTRAINT `fk_factory_id_product_id_t` 
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
