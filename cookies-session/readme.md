## cookie和session
cookie和session都是用来跟踪浏览器用户身份的会话方式。
- 区别
    1. 状态：`cookie`保存在浏览器端，`session`保存在服务器端；
    2. 使用：`cookie`保存在内存中，随浏览器关闭而结束，若设置过期时间，关闭浏览器数据仍存在，直到过期时间结束；session首先检查客户端中是否存在`sessionid`，服务器根据`sessionid`返回session对象，使用`cookie`方式存储session对象。若禁用`cookie`，则需使用URL重写，可通过`response.encodeURL(url)` 进行实现。这个API对encodeURL的结果为，当浏览器支持`Cookie`时，url不做任何处理；当浏览器不支持`Cookie`的时候，将会重写URL将`sessionid`拼接到访问地址后;
    3. 存储：`cookie`以文本的方式保存为字符串类型，大小不超过4kb。`session`类似HashTable，可以支持任何类型对象，大小没有限制；
          1. `cookie`欺骗，`cookie`截获；`session`的安全性大于`cookie`；原因：
              - `sessionid`存储在`cookie`中，首先需要攻破`cookie`；
        - `sessionid`是需要登录或启动`session_start`才有等等
    4. 应用场景： 
        - `cookie`： 是否登陆过网站（实现自动登录）；保存上次登陆时间等信息；保存上次查看页面；浏览计数；
        - `session`： 商城购物车；防止用户非法登录；将某些数据放入session中，供同一用户的不同页面使用；
    5. 缺点：
        - `cookie`：大小受限；可禁用`cookie`；安全性较低；某些状态不可保存在客户端；每次访问都需要发送`cookie`，浪费带宽；`cookie`数据有路径（path）的概念，可以限制`cookie`只属于某个路径下。
        - `session`：占用服务器内存，服务器的内存压力较大；依赖于`cookie`（`sessionID`保存在`cookie`）；创建`Session`变量有很大的随意性，可随时调用，不需要开发者做精确地处理，所以，过度使用`session`变量将会导致代码不可读而且不好维护；
  
## web storage与local storage