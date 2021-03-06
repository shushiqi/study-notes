
    function debounce(fn, delay) {
        let timer = null
        return function () {
            let _this = this
            let args = arguments
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(_this, args)
            }, delay);
        }
    }

    function throttle(fn, delay) {
        var timer = null;
        return function () {
            var context = this;
            var args = arguments;
            console.log(timer, !timer);
            if (!timer) {
                timer = setTimeout(function () {
                    fn.apply(context, args);
                    timer = null;
                }, delay);
            }
        }
    }

    function cb() {
        console.log("响应中......");
    }

    window.addEventListener("resize", throttle(cb, 2000))