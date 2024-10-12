/**
 * @Author: Andree Ray <andreeray>
 * @Date:   2018-01-13T20:12:34+01:00
 * @Email:  andreeray@live.com
 * @Filename: app.js
 * @Last modified by:   Morgan Andree Ray
 * @Last modified time: 08-05-2018
 */



import Vue from 'vue'


// Alternatively, you may import plugins individually as needed:
// import 'bootstrap/js/dist/util';
// import 'bootstrap/js/dist/dropdown';
import 'bootstrap'
import './assets/scss/root.scss'


import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './util/routes'
const router = new VueRouter({ routes })


import store from './store/store'

import develLS from 'devel-localstorage'

// clearing localstorage in login function
// var ls = develLS.get('version')
// if (!ls || ls.version > 3.6) {
//     console.log('clearing out localstorage')
//     localStorage.clear()
//     store.dispatch('delToken')
//     store.dispatch('delLogged')
// }

develLS.set('version', { version: 3.5 })

import api from './util/api'
Object.defineProperty(Vue.prototype, '$api', { get() { return this.$root.api } } )

import Plugins from './plugins/plugins.js'
Vue.use(Plugins)

import Globals from './components/_globals/globals.js'
Vue.use(Globals)

Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.api.bus } })

import moment from 'moment'
moment.locale('en-gb')
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } })

import axios from 'axios'
Object.defineProperty(Vue.prototype, '$axios', { get() { return this.$root.axios } })

import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript)
import css from 'highlight.js/lib/languages/css'
hljs.registerLanguage('css', css)
import html from 'highlight.js/lib/languages/xml'
hljs.registerLanguage('html', html)
import bash from 'highlight.js/lib/languages/bash'
hljs.registerLanguage('bash', bash)

const markdown = require('markdown-it')({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) {}
        }

        return '<pre class="hljs"><code>' + markdown.utils.escapeHtml(str) + '</code></pre>';
    }
})
Object.defineProperty(Vue.prototype, '$markdown', { get() { return this.$root.markdown } })

import location from './mixins/location'
Vue.mixin(location)
import views from './mixins/views'
Vue.mixin(views)
import logged from './mixins/logged'
Vue.mixin(logged)

import chart from 'chart.js'
Object.defineProperty(Vue.prototype, '$chart', { get() { return this.$root.chart } })


const debugSocket = true
import config from '../config'

let socket = new WebSocket(config.web_socket)
socket.onerror = (error) => {
    console.error("WebSocket error:", error);
};
socket.onclose = () => {
    console.log("WebSocket closed, attempting to reconnect in 5 seconds...");
    setTimeout(() => {
        socket = new WebSocket(config.web_socket);
    }, 5000);
};

socket.onopen = () => {
    if (store.getters.logged) {
        socket.send(JSON.stringify({ type: 'setUser', user: store.getters.logged._id }))
        if (debugSocket) console.log('root: setUser')
    }
}

socket.onmessage = e => {

    const parsed = JSON.parse(e.data)
    if( parsed.type === 'online' ) {
        let user = store.getters.users.find( u => u._id === parsed.id )
        user.online = parsed.online
        store.dispatch('delUser', user._id)
        store.dispatch('addUser', user)
    }

    if (parsed.type === 'message') store.dispatch(`addMessage`, parsed.message)
}

Object.defineProperty(Vue.prototype, '$socket', { 
    get() { return this.$root.socket },
    set(newValue) { this.$root.socket = newValue; },
})


import App from './components/App.vue'

Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})

new Vue({
    el: '#app',
    store: store,
    data () {
     let data = { api, moment, markdown, axios, socket }
     return data
   },
   render (h) {
     return h(App, { props: this.$data })
   },
   router
})
