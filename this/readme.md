## this是什么？
    this就是一个指针，指向调用函数的对象。this有以下几种绑定规则：
    1. 默认绑定
    2. 隐式绑定
    3. 显示绑定
    4 . new绑定
    5. 箭头函数绑定
1. 默认绑定
- `this`默认绑定全局对象`window`，严格模式下绑定到`undefined`
2. 隐式绑定
- 在ES5中，**this永远指向最后调用它的那个对象** 
```js
function foo () {
  console.log(this.a)
}
var obj = { a: 1, foo } // 1
var a = 2
obj.foo()
```
在上例中，虽然foo定义在`window`对象下，但在`obj`对象中引用了它，并重新赋值到`obj.foo`上。在实际调用过程中，是`obj`对象进行的调用，因此打印的应该是`obj`中的`a`。
- 隐式绑定丢失问题
    有两种情况会造成隐式丢失问题
    1. 使用变量给函数取别名
    ```js
    function foo () {
        console.log(this.a)
    }
    var obj = { a: 1, foo } 
    var a = 2
    var foo2 = obj.foo;
    obj.foo() // 1
    foo2(); // 2
    ```
    在实际运行过程中，由于`foo2`虽然引用了`obj.foo`，但实际上调用的是`window`对象
    2. 将函数作为参数传递时，回调函数丢失this绑定
    ```js
    function foo () {
        console.log(this.a)
    }
    function doFoo (fn) {
        console.log(this)
        fn()
    }
    var obj = { a: 1, foo }
    var a = 2
    doFoo(obj.foo)
    ```
3. 显示绑定
   - 通过`call()`、`apply()`、`bind()`等方法直接修改函数内`this`的指向
   - 使用`call()`或者`apply()`的函数是会直接执行的
   - `call()`接收若干参数，`apply()`接收参数数组
   - `bind()`是创建一个新的函数，需要手动调用才会执行
    >`call()`、`apply()`、`bind()`接收到的第一个参数是空或者null、undefined的话，则会忽略这个参数。
    ```js
    function foo () {
        console.log(this.a)
    }
    var obj = { a: 1 }
    var a = 2

    foo() // 2
    foo.call(obj) 1
    foo.apply(obj) 1
    foo.bind(obj) //未执行，没有打印
    ```
4. new绑定
   - 使用new来调用一个函数，会构造一个新对象并把这个新对象绑定到调用函数中的this。
5. 箭头函数绑定
   实际箭头函数不会对this进行绑定。
    >箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined。
6. 绑定优先级：new绑定 > 显式绑定 > 隐式绑定 > 默认绑定

7. 测试
    1. 字面量对象中的各种场景
    ```js
    var name = 'window'
    var person1 = {
            name: 'person1',
            foo1: function () {
            console.log(this.name)
            },
            foo2: () => console.log(this.name),
            foo3: function () {
                return function () {
                console.log(this.name)
             }
             },
            foo4: function () {
                return () => {
                console.log(this.name)
                }
            }
        }
    var person2 = { name: 'person2' }

    person1.foo1() // person1
    person1.foo1.call(person2)  // person2

    person1.foo2() // window
    person1.foo2.call(person2) // window

    person1.foo3()() // window
    person1.foo3.call(person2)() // window
    person1.foo3().call(person2) // person2

    person1.foo4()() // person1
    person1.foo4.call(person2)() // person2
    person1.foo4().call(person2) // person1

    ```
    2. 构造函数中的各种场景
    ```js
    var name = 'window'
    function Person (name) {
        this.name = name
        this.foo1 = function () {
        console.log(this.name)
    },
    this.foo2 = () => console.log(this.name),
    this.foo3 = function () {
        return function () {
        console.log(this.name)
        }
    },
    this.foo4 = function () {
    return () => {
      console.log(this.name)
            }
        }
    }
    var person1 = new Person('person1')
    var person2 = new Person('person2')

    person1.foo1() // person1
    person1.foo1.call(person2) //person2

    person1.foo2() // person1
    person1.foo2.call(person2) // person1

    person1.foo3()() //window
    person1.foo3.call(person2)() //window
    person1.foo3().call(person2) //person2

    person1.foo4()() //person1
    person1.foo4.call(person2)() //person2
    person1.foo4().call(person2) // person1

    ```
