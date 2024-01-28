# 操作历史

在 Graph 组件 onMounted 时将会执行以下代码，此时历史记录变更时将打印日志。
具体参见[这里](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/components/pages/ModelEditor/graph/ModelEditorGraph.vue#L213)

```typescript
graph.on('history:change', (args) => {
    debugStore.log('HISTORY', args.options.name, args)
})
```

此时基本操作历史将被记录进 debugStore。

[Debug](https://github.com/pot-mot/jimmer-code-gen-vue3/tree/multi_column_ref/src/debug)

debugStore 控制台输出与记录可以通过左下角【Debug 日志】进行配置。

[Message](https://github.com/pot-mot/jimmer-code-gen-vue3/tree/multi_column_ref/src/message)

message 与 debugStore 平行，主要用于反馈交互级别的问题。

debug 类型目前分为 loading（异步请求与页面跳转），message（交互校验与响应反馈问题），history（图编辑器操作历史）三类，可分别控制收集与打印。

> message warn 和 error 的输出为单独控制，与 debug log 平行。
