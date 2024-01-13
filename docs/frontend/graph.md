# 图交互

## 响应式数据

[reactiveState.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/components/global/graphEditor/common/reactiveState.ts)

由于 AntV/X6 Graph 中的数据不具备响应式，导致在 Vue 中的开发体检不佳，因此补充了上面这个在图创建时监听各种事件，以达到让基本数据为响应式的 Hook。

## 撤回重做

[useHistory.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/components/global/graphEditor/history/useHistory.ts)

快捷键是 【ctrl+z】（撤回）、【ctrl+shift+z】（重做）。

因为项目内外部影响数据的行为较多，历史记录不可忽略太多信息，因此项目内基本采用 history batch 相关操作把大量变更压缩进一次行为。

## 复制粘贴

[clipBoard.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/components/pages/ModelEditor/graph/data/clipBoard.ts)

快捷键是 【ctrl+c】（复制）、【ctrl+v】（粘贴）、【ctrl+x】（剪切）。

目前模型设计器支持粘贴三种数据:

### CopyData

```typescript
interface CopyData {
    tables: GenTableModelInput[],
    associations: GenAssociationModelInput[],
    enums: GenModelInput_TargetOf_enums[]
}
```

[CopyData](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/shape/CopyData.ts)

在页面中选中表和关联复制得到的数据结构。

### GraphData

```typescript
interface GraphData {
    cells: Array<Cell>,
    zoom: number,
    transform: string | null
}
```

[GraphData](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/shape/GraphData.ts)

Model 的 graphData 的标准类型声明，相较 CopyData 粘贴时将**缺少枚举信息**。

### ModelInput

[ModelInput](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/shape/ModelInput.ts)

ModelInput，即直接导出的 model.json。

通过粘贴与直接导入模型相比将只会导入 graphData 和 enums。

## 多选、框选与移动

[useSelection.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/components/global/graphEditor/selection/useSelection.ts)

可以使用左键进行批量框选，快捷键是 【ctrl+a】（全选）、【delete/backspace】（删除）、【delete/backspace + shift】（删除关联）、【up\down\left\right ( + ctrl)】方向键移动表位置。

:::warning
目前框选是基于 AntV/X6 Selection 实现的，边的框选判断标准是基于矩形，所以存在误选的可能，此处需要留心。
:::

## 布局

[layoutByLevel.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/components/global/graphEditor/layout/layoutByLevel.ts)

目前的布局实现较为简单，仅按照基本序遍历排出层级，目标是**尽可能整理出表间依赖关系**。

（不使用 AntV 官方提供布局的主要原因是表节点的尺寸是变动的，并比较好的适配方案。如果有，欢迎 PR。）

:::warning
### 导入时的延迟

[importTableIntoGraph](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/multi_column_ref/src/components/pages/ModelEditor/store/ModelEditorStore.ts#L159)

目前在导入超过一张表时都会触发 layoutAndFit 这个操作，但节点与关联创建会消耗无法预估的时间。

以下是目前的实现，是设置了基于表数量的延迟，仅是目前的一种妥协，未来将寻求更好的解决办法。

同上，如果有好的办法，欢迎 PR。

```typescript
const importTableIntoGraph = async (tables: GenTableColumnsView[]) => {
    const graph = _graph()

    const {nodes, edges} = await loadByTableViews(graph, tables)

    setTimeout(() => {
        if (nodes.length == 1) {
            commonOperations.focus(nodes[0])
        } else {
            graph.resetSelection([...nodes, ...edges])
            commonOperations.layoutAndFit()
        }
    }, 100 + nodes.length * 40)
}
```
:::

