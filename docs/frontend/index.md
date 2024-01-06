# 前端

## 核心代码索引

目前支撑 ModelEditor 的代码相对分散，主要由以下部分组成：

- [GraphEditor](https://github.com/pot-mot/jimmer-code-gen-vue3/tree/multi_column_ref/src/components/business/graphEditor)：
  基础图编辑代码。
- [ModelGraphEditor](https://github.com/pot-mot/jimmer-code-gen-vue3/tree/multi_column_ref/src/components/business/modelGraphEditor)：
  模型图编辑器代码，实质是继承前者做出的模型编辑扩展。
- [Graph.vue](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/components/pages/ModelEditor/graph/Graph.vue)：
  核心组件，同时是页面的组成部分，所以并不在 business 下而是直接归到的 page 中。
- [ModelEditorStore.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/components/pages/ModelEditor/store/ModelEditorStore.ts)：
  前者的状态管理，因为涉及统合多个组件以及外部数据导入，所以单独抽离。采用 store 意味着目标是单例，但实际上把 setup 抽出来作为 Hook 也可以是多例的，只是目前没这个需要。
  内部很大程度上依赖了基础图编辑中的[入口文件](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/components/business/graphEditor/index.ts)。

可自行根据需要对这些部分进行调整
