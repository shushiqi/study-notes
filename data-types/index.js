let obj = {
    a: 1,
    b: "222",
    c: {
        d: 3
    }
}

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
let obj2 = deepCopy(obj)
obj2.a = 2
console.log(obj);

