function fn(param = "") {
    console.log("a:" + this.a)
    console.log("param:" + param)
}

var obj = { a: 1, param: "params" }
var a = 2
fn()
fn.call(obj, "call")
fn.apply(obj, ["apply"])
fn.bind(obj)()
