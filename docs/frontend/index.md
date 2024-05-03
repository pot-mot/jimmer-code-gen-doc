# 前端

## 核心代码索引

目前支撑 ModelEditor 的代码相对分散，主要由以下部分组成：

- [GraphEditor](https://github.com/pot-mot/jimmer-code-gen-vue3/tree/main/src/components/global/graphEditor)：
  基础图编辑代码。
- [ModelEditorGraph.vue](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/main/src/components/pages/ModelEditor/graph/ModelEditorGraph.vue)：
  模型图编辑器，在前者基础上扩展了 ORM 模型编辑。
- [ModelEditorStore.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/main/src/components/pages/ModelEditor/store/ModelEditorStore.ts)：
  前者的状态管理，统合事件系统。
