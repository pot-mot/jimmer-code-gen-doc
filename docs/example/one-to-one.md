# 一对一

> 以下以小写、Kotlin、MySQL 为演示标准

一对一相对少见，整体数据模型结构与多对一没有本质区别。

但注意，一对一关联需要对外键列添加唯一约束来保证数据源层面数据关系的安全性。

## 用户和用户地址

![user-to-address.png](/images/one-to-one/user-to-address.png)

![user_address-detail.png](/images/one-to-one/user_address-detail.png)

<details>
    <summary>GraphData.json</summary>

```json
{
    "json": {
        "cells": [
            {
                "position": {
                    "x": 641,
                    "y": 376
                },
                "size": {
                    "width": 303,
                    "height": 214
                },
                "view": "vue-shape-view",
                "shape": "TABLE_NODE",
                "id": "b22de922-3082-435a-bf84-915cb1b1975e",
                "data": {
                    "table": {
                        "name": "user_address",
                        "comment": "用户地址",
                        "remark": "",
                        "orderKey": 0,
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
                                "displaySize": 19,
                                "numericPrecision": 0,
                                "partOfPk": true,
                                "autoIncrement": true,
                                "remark": "",
                                "logicalDelete": false,
                                "businessKey": false
                            },
                            {
                                "orderKey": 2,
                                "name": "user_id",
                                "comment": "用户",
                                "typeCode": -5,
                                "overwriteByRaw": false,
                                "rawType": "BIGINT",
                                "typeNotNull": true,
                                "displaySize": 19,
                                "numericPrecision": 0,
                                "partOfPk": false,
                                "autoIncrement": false,
                                "remark": "",
                                "logicalDelete": false,
                                "businessKey": false
                            },
                            {
                                "orderKey": 3,
                                "name": "province_code",
                                "comment": "省",
                                "typeCode": 12,
                                "overwriteByRaw": false,
                                "rawType": "VARCHAR",
                                "typeNotNull": true,
                                "displaySize": 500,
                                "numericPrecision": 0,
                                "partOfPk": false,
                                "autoIncrement": false,
                                "remark": "",
                                "logicalDelete": false,
                                "businessKey": false
                            },
                            {
                                "orderKey": 4,
                                "name": "city_code",
                                "comment": "市",
                                "typeCode": 12,
                                "overwriteByRaw": false,
                                "rawType": "VARCHAR",
                                "typeNotNull": true,
                                "displaySize": 500,
                                "numericPrecision": 0,
                                "partOfPk": false,
                                "autoIncrement": false,
                                "remark": "",
                                "logicalDelete": false,
                                "businessKey": false
                            },
                            {
                                "orderKey": 5,
                                "name": "region_code",
                                "comment": "区",
                                "typeCode": 12,
                                "overwriteByRaw": false,
                                "rawType": "VARCHAR",
                                "typeNotNull": true,
                                "displaySize": 500,
                                "numericPrecision": 0,
                                "partOfPk": false,
                                "autoIncrement": false,
                                "remark": "",
                                "logicalDelete": false,
                                "businessKey": false
                            },
                            {
                                "orderKey": 6,
                                "name": "detailed_address",
                                "comment": "详细地址",
                                "typeCode": 12,
                                "overwriteByRaw": false,
                                "rawType": "VARCHAR",
                                "typeNotNull": true,
                                "displaySize": 500,
                                "numericPrecision": 0,
                                "partOfPk": false,
                                "autoIncrement": false,
                                "remark": "",
                                "logicalDelete": false,
                                "businessKey": false
                            }
                        ],
                        "indexes": [
                            {
                                "name": "uidx_address_user",
                                "uniqueIndex": true,
                                "columns": [
                                    {
                                        "name": "user_id"
                                    }
                                ]
                            }
                        ]
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
                            "id": "0237bb9a-c521-450d-9110-8f05a41a48b3",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 303
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "a061aa1b-cf06-43f5-8e24-012e6970df4c",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 303
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "5adf0ef3-31e7-4fb9-b904-54bc4cbe5d69",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 303
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "269e0186-f1df-436b-a04a-00e5751777ab",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 303
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "eac70a8f-7ff8-47e1-a9a4-3687d07f7731",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 303
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "5073057b-e86f-46d8-b84d-3c86c2f6f1bc",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 303
                                }
                            }
                        }
                    ]
                }
            },
            {
                "position": {
                    "x": 260,
                    "y": 370
                },
                "size": {
                    "width": 169,
                    "height": 94
                },
                "view": "vue-shape-view",
                "shape": "TABLE_NODE",
                "id": "481a990d-6d38-4049-b896-8a79d523d5ec",
                "data": {
                    "table": {
                        "name": "user",
                        "comment": "用户",
                        "remark": "",
                        "orderKey": 0,
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
                                "displaySize": 19,
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
                                "comment": "",
                                "typeCode": 12,
                                "overwriteByRaw": false,
                                "rawType": "VARCHAR",
                                "typeNotNull": true,
                                "displaySize": 500,
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
                "zIndex": 34,
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
                            "id": "ea65275b-473a-486a-991b-6b06b60e1923",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 169
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "35bcecb8-1758-4d24-a4a2-4420e0f041b8",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 169
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
                "id": "aecf84a9-1b41-4617-a57b-4de48547bf7b",
                "data": {
                    "association": {
                        "type": "ONE_TO_ONE",
                        "fake": false,
                        "name": "fk_user_address_user",
                        "updateAction": "",
                        "deleteAction": "",
                        "sourceTable": {
                            "name": "user_address",
                            "comment": "用户地址"
                        },
                        "targetTable": {
                            "name": "user",
                            "comment": "用户"
                        },
                        "columnReferences": [
                            {
                                "sourceColumn": {
                                    "name": "user_id",
                                    "comment": "用户",
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
                        ],
                        "dissociateAction": "DELETE"
                    }
                },
                "source": {
                    "cell": "b22de922-3082-435a-bf84-915cb1b1975e",
                    "port": "a061aa1b-cf06-43f5-8e24-012e6970df4c"
                },
                "target": {
                    "cell": "481a990d-6d38-4049-b896-8a79d523d5ec",
                    "port": "ea65275b-473a-486a-991b-6b06b60e1923"
                },
                "zIndex": 35
            }
        ]
    },
    "zoom": 1,
    "transform": "matrix(1,0,0,1,-114,-17)"
}
```
</details>

此时将按照预期生成唯一索引与外键约束。

```sql
CREATE UNIQUE INDEX `uidx_address_user` ON `user_address` (`user_id`);

ALTER TABLE `user_address` ADD CONSTRAINT `fk_address_to_user` 
    FOREIGN KEY (`user_id`)
  REFERENCES `user` (`id`);
```

而表现在实体层面则就是一对 @OneToOne 属性。

而一对一为了单独存储等功能，从动方（User）必然不一定携带主动方（地址），所以 User 处的 userAddress 属性自然需要可空。

```kotlin
/**
 * 用户
 */
@OneToOne
@JoinColumn(
    name = "user_id",
    referencedColumnName = "id"
)
@OnDissociate(DissociateAction.DELETE)
val user: User
```
```kotlin
/**
 * 用户地址
 */
@OneToOne(mappedBy = "user")
val userAddress: UserAddress?
```
