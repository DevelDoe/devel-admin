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


import api from './util/api'
Object.defineProperty(Vue.prototype, '$api', { get() { return this.$root.api } } )

import Plugins from './plugins/plugins.js'
Vue.use(Plugins)

import Globals from './components/_globals/globals.js'
Vue.use(Globals)

Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.api.bus } })

import moment from 'moment'
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } })

const hljs = require('highlight.js')
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
     let data = { api, moment }
     return data
   },
   render (h) {
     return h(App, { props: this.$data })
   },
   router
})
