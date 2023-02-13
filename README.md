# px2rem2js
> 根据设计稿与 FontSize 基准值动态计算与设置Root FontSize，初始化 Rem 适配，首次加载及视窗变化时触发。在Js中，提供按照设计稿px到rem的转换方法。

## 安装

npm:

```bash
npm install --save px2rem2js
```

yarn:

```bash
yarn add px2rem2js
```

## 初始化一个简单的适配场景

```tsx
// src/utils/rem.ts
// 单例场景
import px2rem2js from 'px2rem2js';
const p2r2js = new px2rem2js() // global default option: {designWidth:750,baseFontSize:100,suffix:true,context:window}
export const initRem = p2r2js.initRem
export const getRem = p2r2js.getRem // current default option: {suffix:global.default.option.suffix}
export default p2r2js

// src/app.ts
import { initRem } from '@/utils/rem.ts'
initRem()

// src/pages/home.tsx
import { getRem } from '@/utils/rem.ts'
export default () => {
  return <div style={{width:getRem(100),height:getRem(100),fontSize:getRem(16)}}>Hello World!!</div>
}
```

## 特性

- 语言：支持TS
- 便捷：initRem方法封装了对root font-size的处理，配套getRem方法获取rem值，初始化完成后无需关心视窗变化的影响。
- 灵活：支持配置designWidth(设计稿宽度)，baseFontSize(基准值)等等。
- ~~配套：使用babel插件babel-plugin-px2rem2js，代码内自动将100 #dp 转换为 getRem(100) ，并且自动增加引入语句。~~(todo)

## API

`global option`：

| 选项           | 含义               | 值类型        | 默认值      | 备注                                                                                                                      |
| -------------- | ------------------ | ------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| designWidth     | 设计稿宽度         | number      | 750   | 根据设计稿宽度开发                                                                           |
| baseFontSize    | root font-size 基准值  | number        | 100          | 提高可阅读性，扩大小数点精准度度                                                                                                            |
| suffix        | 输出值是否带有rem | boolean      | true        | 某些场景可能希望只输出值，不带单位 |
| context       | 上下文 | any      | window        | 允许配置应用于addEventListener和document的取值对象
|
- 初始化：`p2r2js.initRem()`
- 注册事件：`p2r2js.on(<EvenTypes[string]>,callback)`，注册事件
- 获取计算rem值：`p2r2js.getRem(<number|string>,?<GetRemOptions>)`，第二个可选参数不传则使用实例化配置


`GetRemOptions`:
| 选项           | 含义               | 值类型        | 默认值      | 备注                                                                                                                      |
| -------------- | ------------------ | ------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| suffix     | 输出值是否带有rem         | boolean      | true   | 某些场景可能希望只输出值，不带单位发  

`EvenTypes`:
| 选项           | 触发时机        | 回调参数      | 备注                                                                                                                      |
| -------------- | ------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| RESIZE     | 窗口大小改变时触发    | 无   |   

## TO DO

- babel-plugin-px2rem2js 自动引入+转换代码

## 本地 demo

`npm i && npm run dev`

开启本地服务打开html