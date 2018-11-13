<template lang="html">
    <div id="dashboard" class="admin">
        
        <!-- setUsername modal -->
        <div class="modal fade" id="setUsernameModal" tabindex="-1" role="dialog" aria-labelledby="setUsernameLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="setUsernameLabel">Devel Admin</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                    </div>
                    <div class="modal-body text-center">
                        <form class="form-signin" id="setUsername" onsubmit="return false;">
                            <p>Hi, please take a moment and set a username.</p>
                            <input type="text" class="form-control" placeholder="username" required="" v-model="username">
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-lg btn-primary btn-block" type="submit" form="setUsername" @click="setUsername" >SET</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row padding paper">

            <div class="col-12 heading">
                <h3>PAGE VIEWS</h3>
            </div>
            
            <div class="col-12">
                <div class="paper">
                    <canvas ref="visitorCanvas" width="400" height="60" ></canvas>
                </div>
            </div>

            <div class="col-6">
                <div class="paper">
                    <canvas ref="countriesCanvas" width="400" height="50" ></canvas>
                </div>
            </div>

             <div class="col-6">
                <div class="paper">
                    <canvas ref="authenticatedCanvas" width="400" height="70" ></canvas>
                </div>
            </div>

            <div class="col-6">
                <div class="paper">
                    <canvas ref="usersCanvas" width="400" height="70" ></canvas>
                </div>
            </div>

            <div class="col-6">
                <div class="paper">
                    <canvas ref="resoCanvas" width="400" height="70" ></canvas>
                </div>
            </div>

            <div class="col-6">
                <div class="paper">
                    <canvas ref="pagesCanvas" width="400" height="120" ></canvas>
                </div>
            </div>

            <div class="col-6">
                <div class="paper">
                    <canvas ref="avgCanvas" width="400" height="120" ></canvas>
                </div>
            </div>
            
            
            
        </div>
        <div class="row padding paper" v-if="logged.applications.indexOf('blog') !== -1">
            <div class="col-12 heading">
                <h3>LATEST POSTS</h3>
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
                    <h3>{{ filteredTasks.length | pluralize }} <span class="task-count" v-show="filteredTasks.length" v-cloak> <strong>{{ filteredTasks.length }}</strong>  remaining</span></h3>
                    <ul class="todo-list">
                        <li v-for="(task, index) in filteredTasks" class="task" :key=" 'task' + index"  >
                            {{ task.title }}
                            <i class="fa fa-times" aria-hidden="true" @click="remove('task', task)"></i>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-6" v-if="logged.applications.indexOf('tasks') !== -1" >
                <div class="paper">
                    <h3>NOTES</h3>
                    <ul class="todo-list">
                        <li v-for="(note, index) in filterNotes" class="task" :key=" 'note' + index"  >
                            {{ note.title }}
                            <i class="fa fa-times" aria-hidden="true" @click="remove('note', note)"></i>
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
    data() {
        return {
            username: ''
        }
    },
    filters: {
        pluralize: function( n ) {
            return n === 1 ? 'TASK' : 'TASKS'
        }
    },
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
        },
        getPages(){
            let pages = {}
            for(var i = 0, len = this.visitors.length; i<len; i++) {
                var page = this.visitors[i].page
                var seconds = this.visitors[i].seconds
                if(page && page.indexOf('-') > 0) page = page.replace('-', '')
                if( !pages[page] ) {
                    pages[page] = {}
                    pages[page].views = 0
                    pages[page].seconds = 0
                } 
                pages[page].views++
                pages[page].seconds += seconds
            }
            Object.keys(pages).forEach(key => {
                pages[key].avg = pages[key].seconds / pages[key].views
            })
            return pages
        },
        getResolutions() {
            let resolutions = {}
            for(var i = 0, len = this.visitors.length; i<len; i++) {
                var resolution = this.visitors[i].resolution || undefined 
                if( !resolutions[resolution] ) resolutions[resolution] = 0
                resolutions[resolution]++
            }
            return resolutions
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
        },
        setUsername() {
            let user = this.logged 
            user.username = this.username
            const valid = this.$api.update( 'user', user)
            if( valid === undefined ) {
                this.$store.dispatch('delLogged')
                this.$store.dispatch('setLogged', user)
                $('#setUsernameModal').modal('hide')
                this.$router.go()
            }
        },
        remove: function( schema, obj ) {
            if(this.logged.sec_lv != 9) {
                this.$api.del( schema, obj )
            } else {
                this.$bus.$emit('toast', 'No Write permissions: Your on a special guest account, I guess your someone who has an interesst in my work! Please feel free to look around.' )
                setTimeout( () => { this.$bus.$emit('toast', '' ) }, 8000 )
            }
        },
    },
    mounted() {
        
        if(!this.logged.username) {
            setTimeout(() => {
                $('#setUsernameModal').modal('show')
            }, 2000)
        }

        var views = []
        for(var i = 30, stop = 0; i>=stop; i--) {
            var view = {}
            view.day = this.$moment().subtract(i, "days").format('dd DD')
            view.views = this.visits(i).length
            views.push(view)
        }

        // sort for pos
        let sorted = []
        sorted = views.sort((a,b)=>{return a.views-b.views})
        sorted.forEach((day, i, s) => {
            day.pos = s.length - i
        })

        let days = []
        views.forEach(view => {
            days.push(view.day)
        })
        
        let views_views = []
        views.forEach(view => {
            views_views.push(view.views)
        })

        let total_views_backgrounds = []
        views.forEach(view => {
            total_views_backgrounds.push(`rgba(176,176,212,${1/(view.pos+1)})`)
        })
    
        var visits = new Chart(this.$refs.visitorCanvas, {
            type: 'bar',
            data: {
                labels: days,
                datasets: [{
                    label: 'views',
                    data: views_views,
                    backgroundColor: total_views_backgrounds,
                    borderColor: 'rgba(176,176,212,1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        
                        display : false,
                        ticks: {
                            beginAtZero:true,
                        },
                        gridLines: {
                            display : false,
                            color: "transparent",
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display : false,
                            color: "transparent",
                        }
                    }]
                },
                legend: { display: false },
                title: {
                    display: true,
                    text: 'TOTAL VIEWS LAST 30 DAYS'
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
            
            let user = {}
            if(key != 'undefined') {
                user = this.users.find(user => user._id === key) || { username: 'Deleted user' }
            } else {
                user.username = 'Anonymous'
            }
            if(user.username !== 'Deleted user' ) usernames.push(user.username)
        })

        Object.keys(this.getUsers).forEach(value => {
            
            if(this.users.find(user => user._id === value) || value === 'undefined') {
                user_views.push(this.getUsers[value])
            }
        })

        usernames.forEach((user, i) => {
            backgrounds.push(`rgba(176,176,212,${1/(i+1)})`)
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
                    }],
                    yAxes: [{
                        display: true,
                        gridLines: {
                            color: "transparent",
                        },
                    }]
                },
                legend: { display: false },
                title: {
                    display: true,
                    text: 'USERS'
                }
            }
        })

        // pages viewd chart

        // sort by views
        let sortableArray = []
        Object.keys(this.getPages).forEach( key => {
            sortableArray.push({'name': key, 'views': this.getPages[key].views, 'seconds': this.getPages[key].seconds, 'avg': this.getPages[key].avg})
        })

        let pages = sortableArray.sort((a, b) => b.views - a.views)
        let pages_name = []
        let pages_views = []
        let pages_backgrounds = []

        pages.forEach( page => {
            pages_name.push(page.name)
            pages_views.push(page.views)
        })

        pages.forEach((page, i) => {
            pages_backgrounds.push(`rgba(176,176,212,${1/(i+1)})`)
        })

        var users = new Chart(this.$refs.pagesCanvas, {
            type: 'horizontalBar',
            data: {
                labels: pages_name,
                datasets: [
                    {
                        backgroundColor: pages_backgrounds,
                        data: pages_views
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
                        gridLines: {
                            display: false,
                            color: "white"
                        },
                    }],
                    yAxes: [{
                        display: true,
                        gridLines: {
                            color: "transparent",
                        },
                    }]
                },
                legend: { display: false },
                title: {
                    display: true,
                    text: 'PAGE VIEWS'
                }
            }
        })

        //  avg time on page chart

        pages = pages.sort((a, b) => b.avg - a.avg)

        let pages_avg = []
        pages_name = []

        pages.forEach( page => {
            pages_name.push(page.name)
            pages_avg.push(page.avg.toFixed(0))
        })

        var users = new Chart(this.$refs.avgCanvas, {
            type: 'horizontalBar',
            data: {
                labels: pages_name,
                datasets: [
                    {
                        backgroundColor: pages_backgrounds,
                        data: pages_avg
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
                        gridLines: {
                            display: false,
                            color: "white"
                        },
                    }],
                    yAxes: [{
                        display: true,
                        gridLines: {
                            color: "transparent",
                        },
                    }]
                },
                legend: { display: false },
                title: {
                    display: true,
                    text: 'AVERAGE SECONDS SPENT'
                }
            }
        })

        //  resolutions

        
        let resolutions = []
        Object.keys(this.getResolutions).forEach( key => {
            if(key !== 'undefined') resolutions.push(key)
        })

        resolutions = resolutions.sort((a, b) => b - a)

        let resolutions_data = []
        Object.keys(this.getResolutions).forEach( key => {
            if(key !== 'undefined') resolutions_data.push(this.getResolutions[key])
        })

        let resolutions_backgrounds = []
        resolutions.forEach((page, i) => {
            resolutions_backgrounds.push(`rgba(176,176,212,${1/(i+1)})`)
        })

        new Chart(this.$refs.resoCanvas, {
            type: 'horizontalBar',
            data: {
                labels: resolutions,
                datasets: [
                    {
                        backgroundColor: resolutions_backgrounds,
                        data: resolutions_data
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
                        gridLines: {
                            display: false,
                            color: "white"
                        },
                    }],
                    yAxes: [{
                        display: true,
                        gridLines: {
                            color: "transparent",
                        },
                    }]
                },
                legend: { display: false },
                title: {
                    display: true,
                    text: 'RESOLUTIONS'
                }
            }
        })
    }
}
</script>

<style lang="scss">
#dashboard {

    .heading {
        padding-bottom: 0;

        h3 {
            margin-bottom: 0;
        }
    }

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
                overflow: hidden;
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
    .task-count {
            font-size: 11px;
            color: #b0b0d4;
        }
    .task {
        position: relative;

        .fa-times {
            position: absolute;
            top: 8px;
            right: 5px;
            font-size: 11px;
            color: #3a3a4a;

            &:hover {
                color: #b0b0d4;
            }
        }
    }
    
}
</style>
