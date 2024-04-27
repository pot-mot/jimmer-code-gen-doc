# 一对一

> 以下以 Kotlin、MySQL 为演示标准

一对一相对少见，整体数据模型结构与多对一没有本质区别。

但注意，一对一关联需要对外键列添加唯一约束来保证数据源层面数据关系的安全性。

> 可直接复制 entities.json 至模型设计器中。

## 用户和用户地址

![user-to-address.png](/images/one-to-one/user-to-address.png)

![user_address-detail.png](/images/one-to-one/user_address-detail.png)

<details>
    <summary>entities.json</summary>

```json
{
    "tables": [
        {
            "name": "user_address",
            "comment": "用户地址",
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
                    "name": "province_code",
                    "comment": "省",
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
                    "name": "city_code",
                    "comment": "市",
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
                    "orderKey": 5,
                    "name": "region_code",
                    "comment": "区",
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
                    "orderKey": 6,
                    "name": "detailed_address",
                    "comment": "详细地址",
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
                    "name": "uidx_address_user",
                    "uniqueIndex": true,
                    "columns": [
                        {
                            "name": "user_id"
                        }
                    ],
                    "remark": ""
                }
            ]
        },
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
        }
    ],
    "associations": [
        {
            "type": "ONE_TO_ONE",
            "fake": false,
            "name": "fk_user_address_user",
            "updateAction": "",
            "deleteAction": "",
            "sourceTableName": "user_address",
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
            "x": 369,
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

此时将按照预期生成唯一索引与外键约束。

```sql
CREATE UNIQUE INDEX `uidx_address_user` ON `user_address` (`user_id`);

ALTER TABLE `user_address`
    ADD CONSTRAINT `fk_user_address_user`
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
