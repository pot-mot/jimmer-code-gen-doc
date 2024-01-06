# 图交互

## 核心代码索引

目前图交互的代码相对分散，主要由以下部分组成：

- [GraphEditor](https://github.com/pot-mot/jimmer-code-gen-vue3/tree/multi_column_ref/src/components/business/graphEditor)：
    基础图编辑代码。
- [ModelGraphEditor](https://github.com/pot-mot/jimmer-code-gen-vue3/tree/multi_column_ref/src/components/business/modelGraphEditor)：
    模型图编辑器代码，实质是继承前者做出的模型编辑扩展。
- [Graph.vue](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/components/pages/ModelEditor/graph/Graph.vue)：
    核心组件，同时是页面的组成部分，所以并不在 business 下而是直接归到的 page 中。
- [ModelEditorStore.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/components/pages/ModelEditor/store/ModelEditorStore.ts)：
    前者的状态管理，因为涉及统合多个组件以及外部数据导入，所以单独抽离。采用 store 意味着目标是单例，但实际上把 setup 抽出来作为 Hook 也可以是多例的，只是目前没这个需要。
    内部很大程度上依赖了基础图编辑中的[入口文件](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/components/business/graphEditor/index.ts)。

## 响应式数据

[reactiveState.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/components/business/graphEditor/common/reactiveState.ts)

由于 AntV/X6 Graph 中的数据不具备响应式，导致在 Vue 中的开发体检不佳，因此补充了上面这个在图创建时监听各种事件，以达到让基本数据为响应式的 Hook。

## 撤回重做

[useHistory.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/components/business/graphEditor/history/useHistory.ts)

快捷键是 【Ctrl + z】（撤回）、【Ctrl + Shift + Z】（重做）。

因为项目内外部影响数据的行为较多，历史记录不可忽略太多信息，因此项目内基本采用 history batch 相关操作把大量变更压缩进一次行为。

## 复制粘贴

[clipBoard.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/components/business/modelGraphEditor/clipBoard.ts)

快捷键自然是熟悉的 【Ctrl + c】（复制）、【Ctrl + v】（粘贴）、【Ctrl + x】（剪切）。

目前模型设计器支持粘贴两种数据:

```typescript
{
    tables: Array<GenTableModelInput> 
    associations: Array<GenAssociationModelInput>
}
```

```typescript
{
    cells: Array<Cell>
    zoom: number
    transform: string | null
}
```

前者同时也是复制黏贴表与关联时获取到的数据格式，后者则是 GraphData.json 的标准类型声明。

:::warning
如果在其他会话框中执行复制黏贴却意外触发了模型设计器里的复制黏贴操作，原因应该是鼠标不小心移动到画布上了。

目前这不可避免但也没有较好解决办法，因为 graph.container 本身是没法触发 keyboard 的，这些事件只能委托到 documentElement 上进行。因此判断只能用 mouseenter、mouseleave 去维护状态。

如果有好的办法，欢迎 PR。
:::

## 多选、框选与移动

[useSelection.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/components/business/graphEditor/selection/useSelection.ts)

可以使用左键进行批量框选，快捷键是 【Ctrl + a】（全选）、【Ctrl + Delete】（删除）、方向键移动。

:::warning
目前框选是基于 AntV/X6 Selection 实现的，边的框选判断标准是基于矩形，所以存在误选的可能，此处需要留心。
:::

## 布局

[layoutByLevel.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/components/business/graphEditor/layout/layoutByLevel.ts)

目前的布局还是比较简陋的，只是按照基本序遍历排出层级，目标只是**尽可能表达出表间依赖关系**。

（以及不用 AntV 官方自带的几种布局的主要原因是表的尺寸是变动的，没有找到比较好的适配方案）

:::warning
### 导入时的延迟

[ModelEditorStore.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/components/pages/ModelEditor/store/ModelEditorStore.ts)，

目前在导入超过一张表时都会触发 layoutAndFit 这个操作，但节点与关联创建会消耗无法预估的时间。

以下是目前的实现，是固定设置了 200 ms 的延迟，仅是目前的一种妥协，未来将寻求更好的解决办法。

同上，如果有好的办法，欢迎 PR。

```typescript
const importTableIntoGraph = async (tables: GenTableColumnsView[]) => {
    const graph = _graph()

    const {nodes, edges} = await loadByTableViews(graph, tables)

    await nextTick()

    setTimeout(() => {
        if (nodes.length == 1) {
            commonOperations.focus(nodes[0])
        } else {
            graph.resetSelection([...nodes, ...edges])
            commonOperations.layoutAndFit()
        }
    }, 200)
}
```
:::

