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

        <div class="row">
            <div class="col-6">
                <div class="row padding paper" v-if="logged.applications.indexOf('posts') !== -1 && filteredPosts.length > 0">
                    <div class="col-12 heading">
                        <h3>LATEST POSTS</h3>
                    </div>
                    <div class="col-12 pm" style="margin: 0 15px 15px !important" v-for="(post, index) in filteredPosts"  :key=" 'post' + index" >
                        <div class="paper pm" style="margin: 0 15px 15px !important">
                            <router-link :to="{ name: 'post', query: { id: post._id } }" v-if="post.user_id === logged._id">
                                <small style="font-size: 9px;" class=" text-muted">{{$moment.unix(post.updatedAt).format('DD MMM YYYY')}}</small>
                                <h4 style="font-size: 18px;">{{post.title}}</h4>
                                <p style="font-size: 14px;">{{post.summary}}</p>
                                <small  style="font-size: 9px;" class="text-muted author">by {{author(post.user_id)}}</small>
                            </router-link>
                            <span v-else>
                                <small style="font-size: 9px;"  class=" text-muted">{{$moment.unix(post.updatedAt).format('DD MMM YYYY')}}</small>
                                <h4 style="font-size: 18px;">{{post.title}}</h4>
                                <p style="font-size: 14px;">{{post.summary}}</p>
                                <small style="font-size: 9px;"  class="text-muted author">by {{author(post.user_id)}}</small>
                            </span>
                        </div>
                    </div>
                </div>

                <!-- images -->
                <div class="row padding paper images" v-if="logged.applications.indexOf('images') !== -1 && filteredImages.length > 0">
                    <div class="col-12 heading">
                        <h3>LATEST IMAGES</h3>
                    </div>
                    <div class="col-6" v-for="(image, index) in filteredImages"  :key=" 'image' + index" >
                        <div class="paper">
                            <router-link :to="{ name: 'image', query: { id: image._id } }" v-if="image.user_id === logged._id">
                                <div style="overflow:hidden">
                                    <div class="cover" :src="api_url + image.images[0]" alt="" style="width:100%; height: 200px" :style="'background: url('+api_url + replaceWhiteSpace(image.images[0])+'); background-size: cover; background-position: 50% 50%'" :title="image.title"></div>
                                </div>
                                <h4>{{image.title}}</h4> 
                                <h6 >by {{author(image.user_id)}}</h6>
                            </router-link>
                            <span v-else>
                                <div style="overflow:hidden">
                                    <div class="cover" :src="api_url + image.images[0]" alt="" style="width:100%; height: 200px" :style="'background: url('+api_url + replaceWhiteSpace(image.images[0])+'); background-size: cover; background-position: 50% 50%'" :title="image.title"></div>
                                </div>
                                <h4>{{image.title}}</h4> 
                                <h6 >by {{author(image.user_id)}}</h6>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="row padding paper" v-if="this.logged.sec_lv < 3 || this.logged.sec_lv == 9">

                    <div class="col-12 heading">
                        <h3>PAGE VIEWS</h3>
                    </div>
                    
                    <div class="col-12">
                        <div class="paper">
                            <canvas ref="visitorCanvas" width="400" height="100" ></canvas>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="paper">
                            <canvas ref="pagesCanvas" width="400" height="300" ></canvas>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="paper">
                            <canvas ref="avgCanvas" width="400" height="300" ></canvas>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="paper">
                            <canvas ref="countriesCanvas" width="400" height="50" ></canvas>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="paper">
                            <canvas ref="authenticatedCanvas" width="400" height="100" ></canvas>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="paper">
                            <canvas ref="usersCanvas" width="400" height="200" ></canvas>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="paper">
                            <canvas ref="resoCanvas" width="400" height="170" ></canvas>
                        </div>
                    </div>

                    
                    
                </div>

                <div class="row padding paper" v-if="(logged.applications.indexOf('tasks') !== -1 && filteredTasks.length > 0) || (logged.applications.indexOf('tasks') !== -1 && filterNotes.length > 0)">
                    <div class="col-lg-6" v-if="logged.applications.indexOf('tasks') !== -1">
                        <div class="paper">
                            <h3>{{ filteredTasks.length | pluralizeTask }} <span class="task-count" v-show="filteredTasks.length" v-cloak> <strong>({{ filteredTasks.length }}</strong>  remaining)</span></h3>
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
                            <h3>{{ filterNotes.length | pluralizeNote }} <span class="task-count" v-show="filterNotes.length" v-cloak> <strong>({{ filterNotes.length }}</strong>  remaining)</span></h3>
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
            
        </div>

        

        

        

         
        
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { keySort } from '../../../util/helperFunc.js'
import config from '../../../../config'
export default {
    name: 'overview',
    page: 'overview',
    data() {
        return {
            username: '',
            api_url: config.api_url,
        }
    },
    filters: {
        pluralizeTask: function( n ) {
            return n === 1 ? 'TASK' : 'TASKS'
        },
        pluralizeNote: function( n ) {
            return n === 1 ? 'NOTE' : 'NOTES'
        }
    },
    computed: {
        ...mapGetters([ 'tasks', 'logged', 'notes', 'posts', 'users', 'visitors', 'images' ]),
        filteredTasks() {
            // this users tasks
            const user = this.tasks.filter( todo => {  return todo.user_id === this.logged._id  })
            const completed = user.filter( todo => { return todo.completed === false  })
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
            const posts = this.posts.filter( post => {
                return post.user_id === this.logged._id || post.shared
            })
            const sorted = keySort(posts, 'updatedAt', true)
            return sorted.slice(0, 6)
        },
        filteredImages() {
            const images = this.images.filter( image => { return !image.private })
            const sorted = images.sort((a,b)=> {return b.updatedAt - a.updatedAt})
            return sorted.slice(0, 6)
        },
        getViews() {
            return this.visitors.filter( view => { return view.app === config.target_site })
        },
        authenticated() {
            return this.getViews.filter( view => { return view.user_id !== undefined})
        },
        getCountries() {
            let countries = {}
            for(var i = 0, len = this.getViews.length; i<len; i++) {
                var country = this.getViews[i].country
                if( !countries[country] ) countries[country] = 0
                countries[country]++
            }
            return countries
        },
        getUsers() {
            let users = {}
            for(var i = 0, len = this.getViews.length; i<len; i++) {
                if (this.getViews[i].user_id) {
                    var user = this.getViews[i].user_id
                } else {
                    var user = this.getViews[i].ip
                }
                
                if( !users[user] ) {
                    
                    users[user] = 0
                } 
                users[user]++
            }
            return users
        },
        getPages(){
            let pages = {}
            for(var i = 0, len = this.getViews.length; i<len; i++) {
                if(this.getViews[i].page !== undefined) {
                    var page = this.getViews[i].page
                    var seconds = this.getViews[i].seconds
                    if(page && page.indexOf('-') > 0) page = page.replace('-', '')
                    if( !pages[page] ) {
                        pages[page] = {}
                        pages[page].views = 0
                        pages[page].seconds = 0
                    } 
                    pages[page].views++
                    pages[page].seconds += seconds
                }
            }
            Object.keys(pages).forEach(key => {
                pages[key].avg = pages[key].seconds / pages[key].views
            })
            return pages
        },
        getResolutions() {
            let resolutions = {}
            for(var i = 0, len = this.getViews.length; i<len; i++) {
                var resolution = this.getViews[i].resolution || undefined 
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
        views(day) {
            return this.getViews.filter( visit => {
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
                this.$bus.$emit('toast', 'no write permissions, your on a guest account.')
                setTimeout( () => { this.$bus.$emit('toast', '' ) }, 8000 )
            }
        },
        replaceWhiteSpace( url ) {
            var replaced = url.split(' ').join('%20');
            return replaced
        }
    },
    mounted() {
        
        if(!this.logged.username) {
            setTimeout(() => {
                $('#setUsernameModal').modal('show')
            }, 2000)
        }

        if(this.logged.sec_lv < 3 || this.logged.sec_lv == 9) {
                // total views
            var views = []
            for(var i = 14, stop = 0; i>=stop; i--) {
                var view = {}
                view.day = this.$moment().subtract(i, "days").format('dd DD')
                view.views = this.views(i).length
                views.push(view)
            }
           
            let days = []
            views.forEach(view => {
                days.push(view.day)
            })
            
            let views_views = []
            views.forEach(view => {
                views_views.push(view.views)
            })

            let sorted = []
            sorted = views.sort((a,b)=>{return a.views-b.views})
            sorted.forEach((day, i, s) => {
                day.pos = s.length - i
            })

            let total_views_backgrounds = []
            views.forEach(view => {
                total_views_backgrounds.push(`rgba(176,176,212,${1/(view.pos+1)})`)
            })
        
            new Chart(this.$refs.visitorCanvas, {
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
                        text: 'TOTAL VIEWS LAST 15 DAYS'
                    }
                },     
            })

            //** Authenticated */


            new Chart(this.$refs.authenticatedCanvas,{
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [this.authenticated.length, this.getViews.length - this.authenticated.length],
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

            
            //** Countires */ 

            let countreis = []
            Object.keys(this.getCountries).forEach((country, i, s) => {
                countreis.push( { country: country, views: this.getCountries[country] } )
            })

            let countires_sorted = countreis.sort((a,b)=>{return b.views - a.views})

            let countreis_labels = []
            countires_sorted.forEach( entry => {
                countreis_labels.push(entry.country)
            })
            let countreis_data = []
            countires_sorted.forEach( entry => {
                countreis_data.push(entry.views)
            })
            let countreis_backgrounds = []
            countires_sorted.forEach( (entry, i) => {
                countreis_backgrounds.push(`rgba(176,176,212,${1/(i+1)})`)
            })
            
            new Chart(this.$refs.countriesCanvas, {
                type: 'horizontalBar',
                data: {
                    labels: countreis_labels,
                    datasets: [
                        {
                            backgroundColor: countreis_backgrounds,
                            data: countreis_data
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

            let users = []
            Object.keys(this.getUsers).forEach( key => {
                let user = {}
                if(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(key)) {
                    user = { username: key }
                } else {
                    user = this.users.find(user => user._id === key) || null
                }
                
                if(user) users.push( { username: user.username, views: this.getUsers[key] } )
            })

            let sortedUsers = users.sort((a,b) => b.views - a.views)

            let users_labes = []
            sortedUsers.forEach( user => {
                users_labes.push( user.username )
            })

            let users_data = []
            sortedUsers.forEach( user => {
                users_data.push( user.views )
            })

            let users_backgrounds = []
            sortedUsers.forEach( (user, i) => {
                users_backgrounds.push(`rgba(176,176,212,${1/(i+1)})`)
            })
            
            new Chart(this.$refs.usersCanvas, {
                type: 'horizontalBar',
                data: {
                    labels: users_labes,
                    datasets: [
                        {
                            backgroundColor: users_backgrounds,
                            data: users_data
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

            new Chart(this.$refs.pagesCanvas, {
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

            //** avg time on page chart */

            pages = pages.sort((a, b) => b.avg - a.avg)

            let pages_avg = []
            pages_name = []

            pages.forEach( page => {
                pages_name.push(page.name)
                pages_avg.push(page.avg.toFixed(0))
            })

            new Chart(this.$refs.avgCanvas, {
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

            //** resolutions */

            let resolutions = []
            Object.keys(this.getResolutions).forEach( key => {
                if(key !== 'undefined') resolutions.push({ 'resolution': key, 'views': this.getResolutions[key] })
            })

            let resolutions_sorted = resolutions.sort((a, b) => b.views - a.views)
            
            let resolutions_labels = []
            resolutions_sorted.forEach( el => {
                resolutions_labels.push( el.resolution )
            })

            let resolutions_data = []
            resolutions_sorted.forEach( el => {
                resolutions_data.push( el.views )
            })

            let resolutions_backgrounds = []
            resolutions_sorted.forEach((el, i) => {
                resolutions_backgrounds.push(`rgba(176,176,212,${1/(i+1)})`)
            })


            new Chart(this.$refs.resoCanvas, {
                type: 'horizontalBar',
                data: {
                    labels: resolutions_labels,
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
}
</script>

<style lang="scss">
#dashboard {

    .heading {
        padding-bottom: 0;
        background: transparent;

        h3 {
            margin-bottom: 0;
            background: #212740;
            color: #b0b0d4;
            margin:0;
            padding: 10px;
            width: 100%;
            font-size: 1.2rem;
        }
    }

    .paper {

        margin: 15px;
        padding: 15px;

        h3 {
            margin-bottom: 0;
            background: #212740;
            color: #b0b0d4;
            margin:0;
            padding: 10px;
            width: 100%;
            font-size: 1.2rem;
        }

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
            font-size: 9px;
            color: #b0b0d4;
        }
    .task {
        position: relative;
        font-size: 14px;

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

    .images {

        h4, 
        h5,
        h6 {
            margin:0;
            padding: 10px;
            width: 100%;
        }


        h4 {
            font-size: 18px;
        }

        h5 {
            font-size: 14px;
            padding-top: 0;
        }

        h6 {
            font-size: 9px;
            padding-top: 0;
        }

        .cover {
            transform: scale(1);
            transition: transform 0.3s ease-in-out;
            overflow: hidden;

            &:hover {
                transform: scale(1.1);
            }
        }

    }
}
</style>
