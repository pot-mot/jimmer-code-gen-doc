# 图交互

## 响应式数据

[reactiveState.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/main/src/components/global/graphEditor/data/reactiveState.ts)

由于 AntV/X6 Graph 中的数据不具备响应式，导致在 Vue 中的开发体检不佳，因此补充了上面这个在图创建时监听各种事件，以达到让基本数据为响应式的 Hook。

## 撤回重做

[useHistory.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/main/src/components/global/graphEditor/history/useHistory.ts)

快捷键是 【ctrl+z】（撤回）、【ctrl+shift+z】（重做）。

因为项目内外部影响数据的行为较多，历史记录不可忽略太多信息，因此项目内基本采用 history batch 相关操作把大量变更压缩进一次行为。

## 多选、框选与移动

[useSelection.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/main/src/components/global/graphEditor/selection/useSelection.ts)

可以使用左键进行批量框选，快捷键是 【ctrl+a】（全选）、【delete/backspace】（删除）、【delete/backspace + shift】（删除关联）、【up\down\left\right ( + ctrl)】方向键移动表位置。

:::warning
目前框选是基于 AntV/X6 Selection 实现的，边的框选判断标准是基于矩形，所以存在误选的可能，此处需要留心。
:::

## 布局

[layoutByLevel.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/main/src/components/global/graphEditor/layout/layoutByLevel.ts#L317)

目前的布局实现仅为按照默认顺序遍历排出层级，尽可能整理出表间依赖关系。
