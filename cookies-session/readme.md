## cookie和session
cookie和session都是用来跟踪浏览器用户身份的会话方式。
- 区别
    1.状态：cookie保存在浏览器端，session保存在服务器端；
    2.使用：cookie保存在内存中，随浏览器关闭而结束，若设置过期时间，关闭浏览器数据仍存在，直到过期时间结束；session首先检查客户端中是否存在sessionid，服务器根据sessionid返回session对象