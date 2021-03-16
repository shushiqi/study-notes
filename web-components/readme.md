## web components
- 组件是前端的发展方向，VUE和React实际上都是组件化的框架。通过web components，可以创建浏览器原生支持的组件，不需要额外框架或webpack等打包器的编译即可使用。
- [*Web Components 是一套不同的技术，允许您创建可重用的定制元素（它们的功能封装在您的代码之外）并且在您的web应用中使用它们。*](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components "来源：MDN")
- web components主要有三项技术组成，以创建自定义元素实现复用等目的
    1. **Custom elements（自定义元素）** 自定义元素及行为
    2. **Shadow DOM（影子DOM）** 将封装的“影子”DOM树附加到元素，可以通过添加时使用`{mode: closed}`,隐藏结构样式及行为，保持元素的功能私有，防止冲突
    3. **HTML templates（HTML模板）**   `<templat>`和`<slot>`元素可以编写不在呈现页面中显示的标记模板
- 如何使用？
    1. 定义一个类
    2. 对该类添加内容（模板、样式、自定义参数等）
    3. 添加到页面元素上