// require("./src/style/main.css")
// const show = require('./show')

// show("Webpack  dev-server")

import Vue from 'vue'
import App from "./src/App"

new Vue({
    render: h=>h(App)
}).$mount("#app")