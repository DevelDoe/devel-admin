<template lang="html">
    <div id="dashboard" class="admin">
        <div class="row padding paper">
            
            <div class="col-12">
                <div class="paper">
                    <h3>PAGE VIEWS</h3>
                    <canvas ref="visitorCanvas" width="400" height="100" ></canvas>
                </div>
            </div>
            
            <div class="col-6">
                <div class="paper">
                    <canvas ref="countriesCanvas" width="400" height="50" ></canvas>
                </div>
            </div>

             <div class="col-6">
                <div class="paper">
                    <canvas ref="usersCanvas" width="400" height="100" ></canvas>
                </div>
            </div>

            <div class="col-6">
                <div class="paper">
                    <canvas ref="authenticatedCanvas" width="400" height="150" ></canvas>
                </div>
            </div>
            
        </div>
         <div class="row padding paper" v-if="logged.applications.indexOf('blog') !== -1">
            <div class="col-12">
                <div class="paper">
                    <h1>Latest Posts</h1>
                </div>
            </div>
            <div class="col-6" v-for="(post, index) in filteredPosts"  :key=" 'post' + index" >
                <div class="paper">
                    <router-link :to="{ name: 'post', query: { id: post._id } }" v-if="post.user_id === logged._id">
                        <small  class=" text-muted">{{$moment.unix(post.updatedAt).format('DD MMM - YYYY')}}</small>
                        <h3>{{post.title}}</h3>
                        <p>{{post.summary}}</p>
                        <small  class="text-muted author">by {{author(post.user_id)}}</small>
                    </router-link>
                    <span v-else>
                        <small  class=" text-muted">{{$moment.unix(post.updatedAt).format('DD MMM - YYYY')}}</small>
                        <h3>{{post.title}}</h3>
                        <p>{{post.summary}}</p>
                        <small  class="text-muted author">by {{author(post.user_id)}}</small>
                    </span>
                </div>
            </div>
        </div>
         <div class="row padding paper">
            <div class="col-lg-6" v-if="logged.applications.indexOf('tasks') !== -1 && filteredTasks.length > 0">
                <div class="paper">
                    <h1>Tasks</h1>
                    <ul class="todo-list">
                        <li v-for="(todo, index) in filteredTasks" class="todo" :key=" 'todo' + index"  >
                            {{ todo.title }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-6" v-if="logged.applications.indexOf('tasks') !== -1" >
                <div class="paper">
                    <h1>notes</h1>
                    <ul class="todo-list">
                        <li v-for="(note, index) in filterNotes" class="todo" :key=" 'note' + index"  >
                            {{ note.title }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { keySort } from '../../../../util/helperFunc.js'
export default {
    name: 'overview',
    computed: {
        ...mapGetters([ 'tasks', 'logged', 'notes', 'posts', 'users', 'visitors' ]),
        filteredTasks() {
            // this users tasks
            const users = this.tasks.filter( todo => {  return todo.user_id === this.logged._id  })
            const completed = users.filter( todo => { return todo.completed === false  })
            const sorted = completed.sort((a, b) => a.title.localeCompare(b.title) )
            return sorted
        },
        filterNotes() {
            return this.loggedNotes.filter( note => { return note.overview === true  })
        },
        loggedNotes: function() {
            return this.notes.filter( note => {
                return note.user_id === this.logged._id
            })
        },
        filteredPosts() {
            const usersPosts = this.posts.filter( post => {
                return post.user_id === this.logged._id || post.shared
            })
            const sorted = keySort(usersPosts, 'updatedAt', true)
            return sorted.slice(0, 6)
        },
        authenticated() {
            return this.visitors.filter( view => { return view.user_id !== undefined})
        },
        getCountries() {
            let countries = {}
            for(var i = 0, len = this.visitors.length; i<len; i++) {
                var country = this.visitors[i].country
                if( !countries[country] ) countries[country] = 0
                countries[country]++
            }
            return countries
        },
        getUsers() {
            let users = {}
            for(var i = 0, len = this.visitors.length; i<len; i++) {
                var user_id = this.visitors[i].user_id
                if( !users[user_id] ) users[user_id] = 0
                users[user_id]++
            }
            return users
        }
    },
    methods: {
        author(id) {
            let author = this.users.find(user => user._id === id)
            if(author.username) return author.username 
            else return author.email
        },
        visits(day) {
            return this.visitors.filter( visit => {
                return this.$moment.unix(visit.date).format('DD MMMM YY') === this.$moment().subtract(day, "days").format('DD MMMM YY')
            })
        }
    },
    mounted() {
        var visits = new Chart(this.$refs.visitorCanvas, {
            type: 'line',
            data: {
                labels: [this.$moment().subtract(5, "days").format('ddd'), this.$moment().subtract(4, "days").format('ddd'), this.$moment().subtract(3, "days").format('ddd'), this.$moment().subtract(2, "days").format('ddd'), this.$moment().subtract(1, "days").format('ddd'), this.$moment().format('ddd')],
                datasets: [{
                    label: 'views',
                    data: [this.visits(5).length, this.visits(4).length, this.visits(3).length, this.visits(2).length, this.visits(1).length, this.visits(0).length],
                    backgroundColor: 'rgba(176,176,212,1)',
                    borderWidth: 0
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                        },
                        gridLines: {
                            color: "transparent",
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            color: "transparent",
                        }
                    }]
                },
                legend: { display: false },
                title: {
                    display: true,
                    text: 'TOTAL'
                }
            },     
        })
        var authenticated = new Chart(this.$refs.authenticatedCanvas,{
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [this.authenticated.length, this.visitors.length - this.authenticated.length],
                    backgroundColor: ["rgba(176,176,212,1)", "rgba(176,176,212,.3)"],
                    borderWidth: 0
                }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'authenticated',
                    'anonymous',
                ]
            },
            options: {
                legend: { 
                    display: false,
                },
                title: {
                    display: true,
                    text: 'AUTHENTICATED',
                }
            }
        })

        let labels = []
        let data = []

        Object.keys(this.getCountries).forEach(country => {
            labels.push(country)
        })

        Object.keys(this.getCountries).forEach(country => {
            data.push(this.getCountries[country])
        })
        
        var countries = new Chart(this.$refs.countriesCanvas, {
            type: 'horizontalBar',
            data: {
                labels: labels,
                datasets: [
                    {
                        backgroundColor: ["rgba(176,176,212,1)"],
                        data: data
                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                         ticks: {
                            beginAtZero:true,
                        },
                        display: false,
                    }]
                },
                legend: { display: false },
                title: {
                    display: true,
                    text: 'COUNTRIES'
                }
            }
        })

        // users chart

        let usernames = []
        let user_views = []
        let backgrounds = []

        Object.keys(this.getUsers).forEach(key => {
            let username
            if(key != 'undefined') {
                username = this.users.find(user => user._id === key).username
            } else {
                username = 'anonymous'
            }
            usernames.push(username)
        })

        Object.keys(this.getUsers).forEach(value => {
            user_views.push(this.getUsers[value])
        })

        usernames.forEach((user, index) => {
            backgrounds.push(`rgba(176,176,212,${1/index})`)
        })
        
        var users = new Chart(this.$refs.usersCanvas, {
            type: 'horizontalBar',
            data: {
                labels: usernames,
                datasets: [
                    {
                        backgroundColor: backgrounds,
                        data: user_views
                    }
                ]
            },
            options: {
                scales: {
                    display: false,
                    xAxes: [{
                         ticks: {
                            beginAtZero:true,
                        },
                        display: false,
                    }]
                },
                legend: { display: false },
                title: {
                    display: true,
                    text: 'USERS'
                }
            }
        })
    }
}
</script>

<style lang="scss">
#dashboard {

    .paper {

        margin: 15px;
        padding: 15px;

        p {
            padding: 0;
            margin: 0;
        }

        ul {
            padding: 0;

            li {
                list-style-type: none;
                list-style-type: none;
                padding: 20px;
                margin: 10px;
                background: #242a46;
                color: #b0b0d4;
            }
            a {
                color: #eee;
            }
        }
    }
    .pie {
        padding: 50px;
        margin-top: 39px;

        .paper {
            margin: 0;
            padding: 0;
        }
    }
}
</style>
