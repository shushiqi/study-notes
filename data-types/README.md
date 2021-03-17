## 数据类型
- 在JS中,数据分为基础数据类型与引用类型，即原始值与引用值。原始值是最简单的数据，而引用值则是由多个值构成的对象。
- 基础数据类型有以下6种：undefined、null、boolean、number、string以及symbol（ES6新增）。在实际使用中，我们操作的就是存储在变量中的实际值；
- 引用类型则是保存在内存中的对象。因为JS不允许直接访问内存位置，因此操作对象时实际是操作该对象的引用。（但在给对象添加属性时，操作的是实际对象，因此该说法并不严谨）

- 复制数据的不同点
    1. 基础数据类型复制互不影响；
    2. 在引用类型数据种，简单的复制（赋值）等操作，由于操作的是对象的引用，因此两者引用的是同一个对象。

- 复制引用数据
```js
// 浅复制
function shallowCopy(obj) {
    let newObj = obj instanceof Object ? {} : []
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const element = obj[key];
            newObj[key] = element
        }
    }
    return newObj
}
// 深复制
function deepCopy(obj) {
    if (obj && typeof obj === "object") {
        let newObj = Array.isArray(obj) ? [] : {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                console.log(typeof obj[key]);
                if (obj[key] && typeof obj[key] === "object") {
                    deepCopy(obj[key])
                } else {
                    newObj[key] = obj[key]

                }
            }
        }
        return newObj
    } else {
        return obj
    }

}
```