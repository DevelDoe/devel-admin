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
        posts: [],
        visitors: [],
        images: [],
        messages: [],
        tickets: [],
        workouts: [],
        exercises: [],
        settings: []
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
        visitors: state => {
            return state.visitors
        },
        images: state => {
            return state.images
        },
        messages: state => {
            return state.messages
        },
        tickets: state => {
            return state.tickets
        },
        workouts: state => {
            return state.workouts
        },
        exercises: state => {
            return state.exercises
        },
        settings: state => {
            return state.settings
        }
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

        setVisitors: ( state, payload ) => {
            state.visitors = payload
        },

        setImages: (state, payload) => {
            state.images = payload
        },
        addImage: (state, payload) => {
            state.images.push(payload)
        },
        delImage: (state, payload) => {
            state.images = state.images.filter(image => {
                return image._id != payload
            })
        },

        setMessages: (state, payload) => {
            state.messages = payload
        },
        addMessage: (state, payload) => {
            state.messages.push(payload)
        },

        setTickets: (state, payload) => {
            state.tickets = payload
        },
        addTicket: (state, payload) => {
            state.tickets.push(payload)
        },
        delTicket: (state, payload) => {
            state.tickets = state.tickets.filter(ticket => {
                return ticket._id != payload
            })
        },

        setWorkouts: (state, payload) => {
            state.workouts = payload
        },
        addWorkout: (state, payload) =>  {
            state.workouts.push( payload )
        },
        delWorkout: (state, payload) => {
            state.workouts = state.workouts.filter(workout => {
                return workout._id != payload
            })
        },

        setExercises: (state, payload) => {
            state.exercises = payload
        },
        addExercise: (state, payload) =>  {
            state.exercises.push( payload )
        },
        delExercise: (state, payload) => {
            state.exercises = state.exercises.filter(exercise => {
                return exercise._id != payload
            })
        },

        setSettings: (state, payload) => {
            state.settings = payload
        },
        addSetting: (state, payload) =>  {
            state.settings.push( payload )
        },
        delSetting: (state, payload) =>  {
            state.settings = state.settings.filter(setting => {
                return setting._id != payload
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

        setVisitors: (ctx, payload) => {
            ctx.commit('setVisitors', payload)
        },

        setImages: (ctx, payload) => {
            ctx.commit('setImages', payload)
        },
        addImage: (ctx, payload) => {
            ctx.commit('addImage', payload)
        },
        delImage: (ctx, payload) => {
            ctx.commit('delImage', payload)
        },

        setMessages: (ctx, payload) => {
            ctx.commit('setMessages', payload)
        },
        addMessage: (ctx, payload) => {
            ctx.commit('addMessage', payload)
        },

        setTickets: (ctx, payload) => {
            ctx.commit('setTickets', payload)
        },
        addTicket: (ctx, payload) => {
            ctx.commit('addTicket', payload)
        },
        delTicket: (ctx, payload) => {
            ctx.commit('delTicket', payload)
        },

        setWorkouts: (ctx, payload) => {
            ctx.commit('setWorkouts', payload)
        },
        addWorkout: (ctx, payload) => {
            ctx.commit('addWorkout', payload)
        },
        delWorkout: (ctx, payload) => {
            ctx.commit('delWorkout', payload)
        },

        setExercises: (ctx, payload) => {
            ctx.commit('setExercises', payload)
        },
        addExercise: (ctx, payload) => {
            ctx.commit('addExercise', payload)
        },
        delExercise: (ctx, payload) => {
            ctx.commit('delExercise', payload)
        },

        setSettings: (ctx, payload) => {
            ctx.commit('setSettings', payload)
        },
        addSetting: (ctx, payload) => {
            ctx.commit('addSetting', payload)
        },
        delSetting: (ctx, payload) => {
            ctx.commit('delSetting', payload)
        },

    }
})

export default store