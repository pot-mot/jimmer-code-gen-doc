# 一对一

> 以下以 Kotlin、MySQL 为演示标准

一对一数据模型结构与多对一没有本质区别。

但注意，一对一关联需要对外键列添加唯一约束来保证数据源层面数据关系的安全性。

> 可直接复制 copy-data.json 至模型设计器中。

## 用户和用户详细

![user-to-detail.png](/images/one-to-one/user-to-detail.png)

![user_detail.png](/images/one-to-one/user_detail.png)

<details>
    <summary>copy-data.json</summary>

```json
{
    "tables": [
        {
            "name": "user",
            "comment": "用户",
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
                    "name": "name",
                    "comment": "",
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
            "name": "user_detail",
            "comment": "用户详情",
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
                    "name": "user_id",
                    "comment": "用户",
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
                },
                {
                    "orderKey": 3,
                    "name": "address",
                    "comment": "地址",
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
                    "name": "remark",
                    "comment": "备注",
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
            "indexes": [
                {
                    "name": "uidx_user_detail__user",
                    "uniqueIndex": true,
                    "columns": [
                        {
                            "name": "user_id"
                        }
                    ],
                    "remark": ""
                }
            ]
        }
    ],
    "associations": [
        {
            "type": "ONE_TO_ONE",
            "fake": false,
            "name": "fk_user_detail_user",
            "updateAction": "",
            "deleteAction": "",
            "sourceTableName": "user_detail",
            "targetTableName": "user",
            "columnReferences": [
                {
                    "sourceColumnName": "user_id",
                    "targetColumnName": "id"
                }
            ],
            "dissociateAction": "DELETE"
        }
    ],
    "enums": [],
    "optionsList": [
        {
            "x": 0,
            "y": 0
        },
        {
            "x": 377,
            "y": 0
        }
    ]
}
```
</details>

此时将按照预期生成唯一索引与外键约束。

```sql
CREATE UNIQUE INDEX `uidx_user_detail__user` ON `user_detail` (`user_id`);

ALTER TABLE `user_detail`
    ADD CONSTRAINT `fk_user_detail_user`
        FOREIGN KEY (`user_id`)
            REFERENCES `user` (`id`);
```

表现在实体层面则就是一对 @OneToOne 属性：

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
 * 用户详情
 */
@OneToOne(mappedBy = "user")
val userDetail: UserDetail?
```

需要注意，一对一为了单独存储等功能，从动方（User）不一定携带主动方（详细信息），所以 User.userDetail 需要可空。
