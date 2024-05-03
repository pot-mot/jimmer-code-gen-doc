# Debug 与消息反馈

## [Debug](https://github.com/pot-mot/jimmer-code-gen-vue3/tree/main/src/debug)

debugStore 控制台输出与记录可以通过左下角【Debug 日志】进行配置。

## [Message](https://github.com/pot-mot/jimmer-code-gen-vue3/tree/main/src/message)

message 与 debugStore 平行，主要用于反馈交互级别的问题。

---

debug 类型目前分为 loading（异步请求与页面跳转），message（交互校验与响应反馈问题），history（图编辑器操作历史）三类，可分别控制收集与打印。

> message warn 和 error 的输出为单独控制，与 debug log 平行。
