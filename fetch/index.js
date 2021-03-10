// XMLHttpRequest对象
var xhr = new XMLHttpRequest()
xhr.open('get', '/somerequest', true)
xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status == 200) {
        console.log(xhr.responseText);
    } else {
        alert("请求失败" + xhr.statusText)
    }
}
xhr.send()

// fetch
fetch("/somerequest").then(res=>{
    console.log(res.json());
})