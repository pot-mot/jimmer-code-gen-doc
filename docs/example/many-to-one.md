# 一对多 / 多对一

> 以下以小写、Kotlin、MySQL 为演示标准

一对多几乎称得上是最普遍的关联模式，只要存在一般性的“从属关系”，基本就可以视为一条一对多关联。

在数据模型层面，这条关联会表现为由**子实体的外键列**指向**主实体的主键列**的外键约束。而在模型层面，这条关联自然可以反向存在。

下面就对多对一和一对多这对反转的关联进行简单的建模演示，可自行复制 GraphData.json 到模型设计器中进行复现：

## 订单与订单明细（多对一，子指向主）

![detail-to-order.png](/images/many-to-one/detail-to-order.png)

<details>
    <summary>GraphData.json</summary>

```json
{
    "json": {
        "cells": [
            {
                "position": {
                    "x": 670,
                    "y": 260
                },
                "size": {
                    "width": 320,
                    "height": 154
                },
                "view": "vue-shape-view",
                "shape": "TABLE_NODE",
                "id": "7e93359a-8fd8-4d84-8440-1a30570fcbae",
                "data": {
                    "table": {
                        "name": "order_detail",
                        "comment": "订单明细",
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
                                "name": "order_id",
                                "comment": "订单 ID",
                                "typeCode": -5,
                                "overwriteByType": false,
                                "type": "BIGINT",
                                "typeNotNull": true,
                                "displaySize": 0,
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
                            },
                            {
                                "orderKey": 4,
                                "name": "commodity_quantity",
                                "comment": "商品数量",
                                "typeCode": 4,
                                "overwriteByType": false,
                                "type": "INTEGER",
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
                "zIndex": 16,
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
                            "id": "982098f1-d95c-45df-91de-caebeda52a28",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 320
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "91d709b8-2073-4ea7-907c-04c5b3da0152",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 320
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "2467b9ea-a4dd-4828-80e5-5b465bf091ef",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 320
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "50a87aef-dbcb-48da-935e-85c430c06c10",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 320
                                }
                            }
                        }
                    ]
                }
            },
            {
                "position": {
                    "x": 170,
                    "y": 260
                },
                "size": {
                    "width": 282,
                    "height": 124
                },
                "view": "vue-shape-view",
                "shape": "TABLE_NODE",
                "id": "442cfc37-d284-4d31-ab1a-89ead89f8d59",
                "data": {
                    "table": {
                        "name": "sale_order",
                        "comment": "订单",
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
                                "name": "serial_no",
                                "comment": "流水号",
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
                            },
                            {
                                "orderKey": 3,
                                "name": "create_time",
                                "comment": "创建时间",
                                "typeCode": 93,
                                "overwriteByType": false,
                                "type": "TIMESTAMP",
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
                "zIndex": 22,
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
                            "id": "4141446b-6d34-4deb-8161-fe2ebfb4c880",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 282
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "b1cab071-ffb6-4602-a34e-4e2d06b97a47",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 282
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "2948c1fc-5967-4730-8e18-084986e306af",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 282
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
                "id": "7b792f71-dbcc-4ebc-89a1-ac21349fa9a9",
                "zIndex": 23,
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
                                "text": "MANY_TO_ONE",
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
                        "associationType": "MANY_TO_ONE",
                        "fake": false,
                        "name": "fk_detail_to_order",
                        "sourceTable": {
                            "name": "order_detail",
                            "comment": "订单明细"
                        },
                        "targetTable": {
                            "name": "sale_order",
                            "comment": "订单"
                        },
                        "columnReferences": [
                            {
                                "sourceColumn": {
                                    "name": "order_id",
                                    "comment": "订单 ID",
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
                        ],
                        "dissociateAction": "DELETE"
                    }
                },
                "source": {
                    "cell": "7e93359a-8fd8-4d84-8440-1a30570fcbae",
                    "port": "91d709b8-2073-4ea7-907c-04c5b3da0152"
                },
                "target": {
                    "cell": "442cfc37-d284-4d31-ab1a-89ead89f8d59",
                    "port": "4141446b-6d34-4deb-8161-fe2ebfb4c880"
                }
            }
        ]
    },
    "zoom": 1,
    "transform": "matrix(1,0,0,1,-78.1173942944489,-7.425285105292232)"
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
ALTER TABLE `order_detail` ADD CONSTRAINT `fk_detail_to_order` 
    FOREIGN KEY (`order_id`)
  REFERENCES `sale_order` (`id`);
```

## 班级和学生（一对多，主指向子）

![class-to-student.png](/images/many-to-one/class-to-student.png)

<details>
    <summary>GraphData.json</summary>
    
```json
{
    "json": {
        "cells": [
            {
                "position": {
                    "x": 647,
                    "y": 260
                },
                "size": {
                    "width": 255,
                    "height": 154
                },
                "view": "vue-shape-view",
                "shape": "TABLE_NODE",
                "id": "91ed97fc-b3a6-40c1-99dd-2782f4830099",
                "data": {
                    "table": {
                        "name": "edu_student",
                        "comment": "学生",
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
                                "name": "student_code",
                                "comment": "学号",
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
                            },
                            {
                                "orderKey": 3,
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
                            },
                            {
                                "orderKey": 4,
                                "name": "class_id",
                                "comment": "班级",
                                "typeCode": -5,
                                "overwriteByType": false,
                                "type": "BIGINT",
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
                "zIndex": 28,
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
                            "id": "d01ada82-ed4b-4ce0-b740-9614d281bcce",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 255
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "620870e7-ea4f-435f-ac22-e03d4371a83c",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 255
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "60cf11ba-0262-4d63-a572-b321381b4454",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 255
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "ea9a90b2-34f9-4854-9e75-3c4bb60a317a",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 255
                                }
                            }
                        }
                    ]
                }
            },
            {
                "position": {
                    "x": 206,
                    "y": 260
                },
                "size": {
                    "width": 241,
                    "height": 124
                },
                "view": "vue-shape-view",
                "shape": "TABLE_NODE",
                "id": "fab38c0d-a7f0-4e00-81e5-a229ae66735f",
                "data": {
                    "table": {
                        "name": "edu_class",
                        "comment": "班级",
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
                                "name": "class_code",
                                "comment": "班号",
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
                            },
                            {
                                "orderKey": 3,
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
                "zIndex": 30,
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
                            "id": "6e4022e9-90aa-455c-b221-0fcc65a7bbbb",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 241
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "19ce8120-43d4-4e3d-ba2e-6a96015791df",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 241
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "130897a5-ef2f-491e-873b-c0726d199b10",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 241
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
                "id": "b728b01d-5615-434f-b309-da31f7e0d49c",
                "data": {
                    "association": {
                        "associationType": "ONE_TO_MANY",
                        "fake": false,
                        "name": "fk_student_to_class",
                        "sourceTable": {
                            "name": "edu_class",
                            "comment": "班级"
                        },
                        "targetTable": {
                            "name": "edu_student",
                            "comment": "学生"
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
                                    "name": "class_id",
                                    "comment": "班级",
                                    "type": "BIGINT",
                                    "typeCode": -5
                                }
                            }
                        ]
                    }
                },
                "zIndex": 31,
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
                                "text": "ONE_TO_MANY",
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
                "source": {
                    "cell": "fab38c0d-a7f0-4e00-81e5-a229ae66735f",
                    "port": "6e4022e9-90aa-455c-b221-0fcc65a7bbbb"
                },
                "target": {
                    "cell": "91ed97fc-b3a6-40c1-99dd-2782f4830099",
                    "port": "ea9a90b2-34f9-4854-9e75-3c4bb60a317a"
                }
            }
        ]
    },
    "zoom": 1.05,
    "transform": "matrix(1.05,0,0,1.05,-42.813757433834894,-16.974278834855227)"
}
```
</details>

此时关联类型为一对多，但是本质还是多对一映射，因此生成的外键为 student 指向 class：

```sql
ALTER TABLE `edu_student` ADD CONSTRAINT `fk_student_to_class` 
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
    name = "id",
    referencedColumnName = "class_id"
)
val eduClass: EduClass
```



