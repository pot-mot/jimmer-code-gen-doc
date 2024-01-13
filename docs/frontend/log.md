# 操作历史

在 Graph 组件 onMounted 时将会执行以下代码，此时历史记录变更时将打印日志。

此时基本操作历史都可以在控制台中看到。

```typescript
graph.on('history:change', (args) => {
    debugLog(args.options.name, args)
})
```

[debugLog.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/utils/debugLog.ts)

实现也很简单，仅仅用一个 Ref<debugLog[]> 进行留档，可根据需要进行调整。
