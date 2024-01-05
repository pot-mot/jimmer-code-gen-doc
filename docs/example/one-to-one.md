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
                                "name": "user_id",
                                "comment": "用户",
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
                                "name": "province_code",
                                "comment": "省",
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
                                "name": "city_code",
                                "comment": "市",
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
                                "orderKey": 5,
                                "name": "region_code",
                                "comment": "区",
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
                                "orderKey": 6,
                                "name": "detailed_address",
                                "comment": "详细地址",
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
                            "id": "5bf7ea19-4109-44ab-aee9-ade83d5d7359",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 303
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "50fb206a-8abe-4848-a22a-f787ba27a643",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 303
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "d999491d-3bde-41c3-8414-69fddcb077c5",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 303
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "bb09f2ca-d1e9-4b4c-83af-1ee5deec70a1",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 303
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "b682c743-5d1c-47cb-b443-027ddf4660d4",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 303
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "a7177526-ed84-4721-a043-922fe875502a",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 303
                                }
                            }
                        }
                    ]
                },
                "zIndex": 16
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
                                "comment": "",
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
                            "id": "5e08e449-202f-49bc-80bf-5d34b5233f2f",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 169
                                }
                            }
                        },
                        {
                            "group": "COLUMN_PORT_GROUP",
                            "id": "310be4bc-4df7-485b-9e16-8dd0ecb879e8",
                            "attrs": {
                                "COLUMN_PORT_SELECTOR": {
                                    "width": 169
                                }
                            }
                        }
                    ]
                },
                "zIndex": 18
            },
            {
                "shape": "ASSOCIATION_EDGE",
                "router": {
                    "name": "er",
                    "args": {
                        "direction": "H"
                    }
                },
                "id": "0df22f49-9052-47d9-a56d-56e1021ba519",
                "source": {
                    "cell": "b22de922-3082-435a-bf84-915cb1b1975e",
                    "port": "50fb206a-8abe-4848-a22a-f787ba27a643"
                },
                "zIndex": 19,
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
                                "text": "ONE_TO_ONE",
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
                        "associationType": "ONE_TO_ONE",
                        "fake": false,
                        "name": "fk_address_to_user",
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
                "target": {
                    "cell": "481a990d-6d38-4049-b896-8a79d523d5ec",
                    "port": "5e08e449-202f-49bc-80bf-5d34b5233f2f"
                }
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
  REFERENCES `user` (`id`)
   ON UPDATE RESTRICT;
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
