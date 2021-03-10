** fetch
- fetch API是用来代替XMLHttpRequest对象进行数据请求的API，它更现代化，也更易使用。
    1. `fetch`仅当网络故障或请求被组织时，才会标记为**reject**，而其它情况，即使响应状态码为404等，也会标记为**resolve**.
    2.  `fetch`**不会发送 cookies**,除非使用了credentials 的初始化选项
    3.  `fetch` 可以接受跨域 cookies；也可以使用 f`fetch`建立起跨域会话。