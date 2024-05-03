# 复制粘贴

[clipBoard.ts](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/main/src/components/pages/ModelEditor/graph/clipBoard/clipBoard.ts)

| 快捷键 | 说明 |
|---|----|
| ctrl+c | 复制 |
| ctrl+v | 粘贴 |
| ctrl +x | 剪切 |

目前模型设计器支持粘贴三种数据:

## [CopyData](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/main/src/shape/CopyData.ts)

```typescript
interface CopyData {
    tables: GenTableModelInput[],
    optionsList?: TableLoadOptions[],
    associations: GenAssociationModelInput[],
    enums: GenModelInput_TargetOf_enums[]
}
```

在页面中选中表和关联复制得到的数据结构，其中 optionsList 是 table 除 DTO 以外的位置信息等额外部分。

## [GraphData](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/main/src/shape/GraphData.ts)

```typescript
interface GraphData {
    json: {
        cells: Array<TableNode | AssociationEdge>
    },
    zoom: string,
    transform: number | undefined,
}
```

Model 的 graphData 的标准类型声明，相较 CopyData 粘贴时将**缺少枚举信息**。

## [ModelInput](https://github.com/pot-mot/jimmer-code-gen-vue3/blob/main/src/shape/ModelInput.ts)

ModelInput，即直接导出的 model.json，即模型本身全部的信息。

粘贴时将导入 graphData 和 enums。
