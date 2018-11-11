<template lang="html">
    <div id="dashboard" class="admin">
        <div class="row padding">
           
            <div class="col-12">
                <div class="paper">
                    <h3>PAGE VIEWS</h3>
                    <canvas ref="visitorCanvas" width="400" height="100" ></canvas>
                </div>
            </div>
            <div class="col-6">
                <div class="paper">
                    <canvas ref="countriesCanvas" width="400" height="100" ></canvas>
                </div>
            </div>
            <div class="col-6">
                <div class="paper">
                    <canvas ref="authenticatedCanvas" width="400" height="100" ></canvas>
                </div>
            </div>
              
           
           
            
        </div>
         <div class="row padding paper" v-if="logged.applications.indexOf('blog') !== -1">
            <div class="col-12">
                <h1>Latest Posts</h1>
            </div>
            <div class="col-6" v-for="(post, index) in filteredPosts"  :key=" 'post' + index" >
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
         <div class="row padding">
            <div class="col-lg-6" v-if="logged.applications.indexOf('tasks') !== -1 && filterTasks.length > 0">
                <div class="paper">
                    <h1>Tasks</h1>
                    <ul class="todo-list">
                        <li v-for="(todo, index) in filterTasks" class="todo" :key=" 'todo' + index"  >
                            {{ todo.title }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
         <div class="col-lg-6" v-if="logged.applications.indexOf('tasks') !== -1" v-for="(note, index) in filterNotes">
            <div class="paper">
                <p> {{ note.title }}</p>
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
        filterTasks() {
            return this.loggedTasks.filter( todo => { return todo.completed === false  })
        },
        filterNotes() {
            return this.loggedNotes.filter( note => { return note.overview === true  })
        },
        loggedTasks: function() {
            return this.tasks.filter( todo => {
                return todo.user_id === this.logged._id
            })
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
        Chart.defaults.global.elements.rectangle.backgroundColor = 'RGBA(30, 194, 255, 1)'
        var visits = new Chart(this.$refs.visitorCanvas, {
            type: 'line',
            data: {
                labels: [this.$moment().subtract(5, "days").format('ddd'), this.$moment().subtract(4, "days").format('ddd'), this.$moment().subtract(3, "days").format('ddd'), this.$moment().subtract(2, "days").format('ddd'), this.$moment().subtract(1, "days").format('ddd'), this.$moment().format('ddd')],
                datasets: [{
                    label: 'views',
                    data: [this.visits(5).length, this.visits(4).length, this.visits(3).length, this.visits(2).length, this.visits(1).length, this.visits(0).length],
                    backgroundColor: 'RGBA(30, 194, 255, 1)',
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
                        gridLines:{
                            color: "transparent",
                        }
                    }]
                },
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Total number of views last 6 days'
                }
            },     
        })
        var authenticated = new Chart(this.$refs.authenticatedCanvas,{
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [this.authenticated.length, this.visitors.length - this.authenticated.length],
                    backgroundColor: ["RGBA(30, 194, 255, 1)", "#ff7f7f"],
                    borderWidth: 0
                }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'authenticated',
                    'anonymous',
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Authenticated views'
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
                        backgroundColor: ["#3e95cd"],
                        data: data
                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                         ticks: {
                            beginAtZero:true,
                        }
                    }]
                },
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Views by country'
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
            }
            a {
                color: #eee;
            }
        }
    }
}
</style>
