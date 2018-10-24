/**
 * @Author: Morgan Andree Ray
 * @Date:   08-05-2018
 * @Email:  info@andreeray.se
 * @Filename: store.js
 * @Last modified by:   Morgan Andree Ray
 * @Last modified time: 08-05-2018
 * @License: MIT
 */

import Vue from 'vue'
import Vux from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vux)

const store = new Vux.Store({
    plugins: [createPersistedState()],
    state: {
        appName: 'DevelStrap VueJS',
        token: '',
        location: 'home',
        showSearch: false,
        tasks: [],
        resources: null,
        users: [],
        logged: null,
        notes: [],
        loading: false,
        posts: []
    },
    getters: {
        appName: state => {
            return state.appName
        },
        token: state => {
            return state.token
        },
        location: state => {
            return state.location
        },
        showSearch: state => {
            return state.showSearch
        },
        tasks: state => {
            return state.tasks
        },
        resources: state => {
            return state.resources
        },
        users: state => {
            return state.users
        },
        logged: state => {
            return state.logged
        },
        notes: state => {
            return state.notes
        },
        loading: state => {
            return state.loading
        },
        posts: state => {
            return state.posts
        },
    },
    mutations: {
        setAppName: (state, payload) => {
            state.appName = payload
        },
        setToken: (state, payload) => {
            state.token = payload
        },
        delToken: (state) => {
            state.token = ''
        },
        setLocation: (state, payload) => {
            state.location = payload
        },
        toggleSearch: (state) => {
            state.showSearch = !state.showSearch
        },

        setTasks: (state, payload) => {
            state.tasks = payload
        },
        addTask: (state, payload) => {
            state.tasks.push(payload)
        },
        delTask: (state, payload) => {
            state.tasks = state.tasks.filter(task => {
                return task._id != payload
            })
        },

        setResources: (state, payload) => {
            state.resources = payload
        },
        addResource: (state, payload) => {
            state.resources.push(payload)
        },
        delResource: (state, payload) => {
            state.resources = state.resources.filter(resource => {
                return resource._id != payload
            })
        },

        setUsers: (state, payload) => {
            state.users = payload
        },
        addUser: (state, payload) => {
            state.users.push(payload)
        },
        delUser: (state, payload) => {
            state.users = state.users.filter(user => {
                return user._id != payload
            })
        },

        setLogged: (state, payload) => {
            state.logged = payload
        },
        delLogged: (state, payload) => {
            state.logged = null
        },

        setNotes: (state, payload) => {
            state.notes = payload
        },
        addNote: (state, payload) => {
            state.notes.push(payload)
        },
        delNote: (state, payload) => {
            state.notes = state.notes.filter(note => {
                return note._id != payload
            })
        },

        setLoading: (state, payload) => {
            state.loading = payload
        },

        setPosts: (state, payload) => {
            state.posts = payload
        },
        addPost: (state, payload) => {
            state.posts.push(payload)
        },
        delPost: (state, payload) => {
            state.posts = state.posts.filter(post => {
                return post._id != payload
            })
        },

    },
    actions: {
        setAppName: (ctx, payload) => {
            ctx.commit('setAppName', payload)
        },
        setToken: (ctx, payload) => {
            ctx.commit('setToken', payload)
        },
        delToken: (ctx, payload) => {
            ctx.commit('delToken', payload)
        },
        setLocation: (ctx, payload) => {
            ctx.commit('setLocation', payload)
        },
        toggleSearch: (ctx) => {
            ctx.commit('toggleSearch')
        },

        setTasks: (ctx, payload) => {
            ctx.commit('setTasks', payload)
        },
        addTask: (ctx, payload) => {
            ctx.commit('addTask', payload)
        },
        delTask: (ctx, payload) => {
            ctx.commit('delTask', payload)
        },

        setResources: (ctx, payload) => {
            ctx.commit('setResources', payload)
        },
        addResource: (ctx, payload) => {
            ctx.commit('addResource', payload)
        },
        delResource: (ctx, payload) => {
            ctx.commit('delResource', payload)
        },

        setUsers: (ctx, payload) => {
            ctx.commit('setUsers', payload)
        },
        addUser: (ctx, payload) => {
            ctx.commit('addUser', payload)
        },
        delUser: (ctx, payload) => {
            ctx.commit('delUser', payload)
        },

        setLogged: (ctx, payload) => {
            ctx.commit('setLogged', payload)
        },
        delLogged: (ctx, payload) => {
            ctx.commit('delLogged', payload)
        },

        setNotes: (ctx, payload) => {
            ctx.commit('setNotes', payload)
        },
        addNote: (ctx, payload) => {
            ctx.commit('addNote', payload)
        },
        delNote: (ctx, payload) => {
            ctx.commit('delNote', payload)
        },

        setLoading: (ctx, payload) => {
            ctx.commit('setLoading', payload)
        },

        setPosts: (ctx, payload) => {
            ctx.commit('setPosts', payload)
        },
        addPost: (ctx, payload) => {
            ctx.commit('addPost', payload)
        },
        delPost: (ctx, payload) => {
            ctx.commit('delPost', payload)
        },
    }
})

export default store