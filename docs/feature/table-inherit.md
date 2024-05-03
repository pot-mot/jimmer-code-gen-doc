# 表继承

可以通过继承与上级表进行继承的设置：

![base-entity.png](/images/table-inherit/base-entity.png)

创建一张表，并勾选上级表。

![product.png](/images/table-inherit/product.png)

在另一张表中设置继承。

![generated.png](/images/table-inherit/generated.png)

可以看到生成后 table 层面多出了上级表的字段，而实体也具备了明确的继承。

## 占位符

![user-and-blog.png](/images/table-inherit/user-and-blog.png)

这是一个上级表存在关联的例子。

此时外键名称为 `fk_user_resource_user_blog`，但实际上该外键为 user 和 blog 的关联，因此我们要调整该外键名称。

![add-placeholder.png](/images/table-inherit/add-placeholder.png)

![new-fk-name.png](/images/table-inherit/new-fk-name.png)

通过`{}`占位符，外键名称成功调整为 `fk_blog_user`。

索引也是一样，当我们在上级表中设置索引时，也需要通过占位符`{}`调整索引名称，避免重名问题。

