<template>
    <div id="portal">

        <!-- Modal -->
        <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModallLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="loginModalLabel">sign in</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                    </div>
                    <div class="modal-body text-center">
                        <form class="form-signin" id="loginForm" onsubmit="return false;">
                            <h1>{{appName}}</h1>
                            <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                            <label for="inputEmail" class="sr-only">Email address</label>
                            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="" v-model="email">
                            <label for="inputPassword" class="sr-only">Password</label>
                            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="" v-model="password">
                            <div class="checkbox mb-3">
                                <label>
                                <input type="checkbox" value="remember-me"> Remember me
                                </label>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-lg btn-primary btn-block" type="submit" form="loginForm" @click="login" >Sign in</button>
                    </div>
                </div>
            </div>
        </div>


        <nav class="navbar navbar-expand-md navbar-light bg-light sticky-top" >
            <div class="container-fluid">
                <a class="navbar-brand" href="#"> {{ appName }} </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li @click="$store.dispatch( 'setLocation', 'portal' )" :class="{ 'nav-item': true, active: isActiveNavItem('portal') }">
                            <a class="nav-link" href="#"> home </a>
                        </li>
                        <li @click="$store.dispatch( 'setLocation', 'stack' )" :class="{ 'nav-item': true, active: isActiveNavItem('stack') }">
                            <a class="nav-link" href="#stack">stack </a>
                        </li>
                        <li @click="$store.dispatch( 'setLocation', 'about' )" :class="{ 'nav-item': true, active: isActiveNavItem('about'), }">
                            <a class="nav-link" href="#about">about </a>
                        </li>
                        <li @click="$store.dispatch( 'setLocation', 'code' )" :class="{ 'nav-item': true, active: isActiveNavItem('code') }">
                            <a class="nav-link" href="#code">code </a>
                        </li>
                        <li @click="$store.dispatch( 'setLocation', 'connect' )" :class="{ 'nav-item': true, active: isActiveNavItem('connect') }">
                            <a class="nav-link" href="#connect">connect </a>
                        </li>
                        <li id="login" v-if="!token">
                            <button type="button" class="btn btn-ouline-secondary" data-toggle="modal" data-target="#loginModal" >login</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


        <div id="slides" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#slides" data-slide-to="0" class="active"></li>
                <li data-target="#slides" data-slide-to="1"></li>
                <li data-target="#slides" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="../../../assets/img/background.png" >
                    <div class="carousel-caption">
                        <h1 class="display-2">{{ appName }}</h1>
                        <h3>fully featured administration application.</h3>
                    </div>
                </div>
            </div>
        </div>


        <div class="container-fluid">
            <div class="row jumbotron">
                <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-10">
                    <p class="lead"> Its built with vue and holds all the core feature of a web administration application. </p>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-9 col-xl-2">
                    <a href="https://github.com/DevelDoe/devel-admin"><button type="button" class="btn btn-outline-secondary btn-lg">GitHub</button> </a>
                </div>
            </div>
        </div>

        <div class="container-fluid padded" id="stack">
            <div class="row welcome text-center">
                <div class="col-12">
                    <h1 class="display-4">Built with ease.</h1>
                </div>
                <div class="col-12">
                    <p class="lead">Welcome to my VueJS strap application!
                    DevelStrap VueJS is a free and open-source front-end Vue application that you can use as a starting point for your VueJS applications.</p>
                </div>
            </div>
        </div>


        <div class="container-fluid padding">
            <div class="row text-center padding">
                <div class="col-xs-12 col-sm-6 col-md-4">
                    <img src="https://vuejs.org/images/logo.png" alt="" height="42" width="42">
                    <h3>VueJS</h3>
                    <p>The Progressive JavaScript Framework.</p>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4">
                    <img src="https://user-images.githubusercontent.com/7110136/29002857-9e802f08-7ab4-11e7-9c31-604b5d0d0c19.png" alt="" height="42" width="42">
                    <h3>VueX</h3>
                    <p>Centralized store for all the components.</p>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4">
                    <img src="https://avatars1.githubusercontent.com/u/2105791?v=3&s=400" alt="" height="42" width="42">
                    <h3>Webpack</h3>
                    <p>The most popular module bundler. </p>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4">
                    <img src="https://d33wubrfki0l68.cloudfront.net/7a197cfe44548cc1a3f581152af70a3051e11671/78df8/img/babel.svg" alt="" height="42" width="42">
                    <h3>Babel</h3>
                    <p>The next generation JavaScript compiler. </p>
                </div>
                <div class="col-xs-12 col-md-4">
                    <img src="https://cdn-images-1.medium.com/max/2000/1*9HanDsRU11ZMsgDGJwN96w.png" alt="" height="42" width="42">
                    <h3>Bootstrap</h3>
                    <p>The most popular HTML, CSS, and JS library in the world.</p>
                </div>
            </div>
        </div>

        <!-- Fixed Background -->
        <figure>
            <div class="fixed-wrap">
                <div id="fixed"></div>
            </div>
        </figure>

        <!-- Me Myself And I -->
        <div class="container-fluid" id="about">
            <div class="row welcome text-center">
                <div class="col-12">
                    <h1 class="display-4">Me Myself and I</h1>
                </div>
            </div>
        </div>


        <div class="container-fluid padding">
            <div class="row padding">
                <div class="col-md-4">
                    <div class="card" style="border:none;">
                        <img class="card-img-top" src="https://www.w3.org/html/logo/downloads/HTML5_Badge_256.png" alt="" >
                        <div class="card-body">
                            <h4 class="card-title">Structure</h4>
                            <p>Proper HTML5 structuring and scemantics to indicate clearly what role is played by the content those tags contain. HTML tags are (mostly) used to format content,these tags tell the browser how to display the content on the page.</p>
                            <a href="https://www.semrush.com/blog/semantic-html5-guide/" class="btn btn-outline-secondary">More</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card" style="border:none;">
                        <img class="card-img-top" src="https://marketing.dcassetcdn.com/blog/2016/January/2016-web-design-trends/CSS3Logo_300.png" alt="" >
                        <div class="card-body">
                            <h4 class="card-title">Presentation</h4>
                            <p>Mobile first, responsive design for a rich understanding of what users are looking for and the right way to deliver it for the best user experience. </p>
                            <a href="https://alistapart.com/article/responsive-web-design/" class="btn btn-outline-secondary">More</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card" style="border:none;">
                        <img class="card-img-top" src="https://www.pixelperfect.co.za/wp-content/uploads/2018/07/JS.png" alt="" >
                        <div class="card-body">
                            <h4 class="card-title">Behavior</h4>
                            <p>Using Javascript to code front-end has come a long way from just validation and jQuery hooks to create dynamic web pages. Today the complex single page applications rely heavely on frameworks such as VueJS, React and Angular.  </p>
                            <a href="https://www.semrush.com/blog/semantic-html5-guide/" class="btn btn-outline-secondary">More</a>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="my-4">
        </div>

        <!-- Two Column Section -->
        <div class="container-fluid" id="code">
            <div class="row padding">
                <div class="col-md-12 col-lg-6">
                    <h2>Get Started...</h2>
                    <h4>Clone</h4>
                    <code>git clone git@github.com:DevelDoe/devel-admin.git</code>
                    <h4>Install</h4>
                    <code>npm install</code>
                    <h4>Build</h4>
                    <code>npm run dev</code>
                </div>
                <div class="col-lg-6">
                    <img src="https://media.wired.com/photos/5b36a5b6e237e87ce9592b8e/191:100/pass/Github-Microsoft-BIZ-FINAL.jpg" alt="github" class="img-fluid">
                </div>
            </div>
        </div>

        <!-- Social -->
        <div class="container-fluid padding" id="connect">
            <div class="row text-center padding">
                <div class="col-12">
                    <h2>Connect</h2>
                </div>
                <div class="col-12 social padding">
                    <a href="https://www.facebook.com/develdoe"><i class="fa fa-facebook"></i></a>
                    <a href="https://www.github.com/develdoe"><i class="fa fa-github"></i></a>
                    <a href="https://www.instagram.com/develdoe"><i class="fa fa-instagram"></i></a>
                    <a href="http://andreeray.se"><i class="fa fa-home"></i></a>
                </div>
            </div>
        </div>



        <footer>
            <div class="container-fluid padding">
                <div class="row">
                    <div class="col-lg-6">
                        <h3>Version 1.0 Front-End</h3>
                        <p>Version 1.0 is non back-end dependent and is good if you have other dependencies then 2.0 feature set.</p>
                        <div class="list-group">
                            <div  class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Vue</h5>
                                    <small>V1.0</small>
                                </div>
                                <p class="mb-1">Basic Vue skeleton.</p>
                            </div>
                            <div  class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Resources</h5>
                                    <small>V1.1</small>
                                </div>
                                <p class="mb-1">Application Protocal Interface</p>
                            </div>
                            <div  class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Router</h5>
                                    <small>V1.2</small>
                                </div>
                                <p class="mb-1">Application Routing</p>
                            </div>
                            <div  class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Store</h5>
                                    <small>V1.3</small>
                                </div>
                                <p class="mb-1">Centralized store.</p>
                            </div>
                            <div  class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Bootstrap</h5>
                                    <small>V1.4</small>
                                </div>
                                <p class="mb-1">Bootstrap integration</p>
                            </div>
                            <div  class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Administration</h5>
                                    <small>V1.5</small>
                                </div>
                                <p class="mb-1">Administration interface</p>
                            </div>
                            <div  class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Charts</h5>
                                    <small>V1.6</small>
                                </div>
                                <p class="mb-1">Integrate chartJS.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <h3>Version 2.0 Full Stack</h3>
                        <p>Version 2.0 has more features but rely heavely on a backend. Checkout <a href="https://github.com/DevelDoe/develstrap-backend">develStrap backendAPI</a>.</p>
                        <div class="list-group">
                            <div  class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">API</h5>
                                    <small>V2.1</small>
                                </div>
                                <p class="mb-1">Backend API and database integration</p>
                            </div>
                            <div  class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Tasks</h5>
                                    <small>V2.1.2</small>
                                </div>
                                <p class="mb-1">Simple todo list.</p>
                            </div>
                            <div  class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Notes</h5>
                                    <small>V2.1.3</small>
                                </div>
                                <p class="mb-1">Simple notes feature.</p>
                            </div>
                            <div  class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Toaster</h5>
                                    <small>V2.1.4</small>
                                </div>
                                <p class="mb-1">Notification system.</p>
                            </div>
                            <div  class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Validation</h5>
                                    <small>V2.2</small>
                                </div>
                                <p class="mb-1">Application metadata and validation logic.</p>
                            </div>
                            <div  class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Visitors</h5>
                                    <small>V2.3</small>
                                </div>
                                <p class="mb-1">Visitor data.</p>
                            </div>
                            <div  class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Authentication & Authorization</h5>
                                    <small>V2.4</small>
                                </div>
                                <p class="mb-1">User signup, roles and permissions.</p>
                            </div>
                            <div  class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Blog</h5>
                                    <small>V2.5</small>
                                </div>
                                <p class="mb-1">Blogging Feature.</p>
                            </div>
                            <div  class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Search</h5>
                                    <small>V2.6</small>
                                </div>
                                <p class="mb-1">Dynamic user search feature.</p>
                            </div>
                            <div  class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Chat</h5>
                                    <small>V2.7</small>
                                </div>
                                <p class="mb-1">Modern messaging feature.</p>
                            </div>
                            <div  class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">File Transfer</h5>
                                    <small>V2.8</small>
                                </div>
                                <p class="mb-1">Rich transfer user experience.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-center">
                        <hr class="light">
                        <h5>made by DevelDoe</h5>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import config from '../../../../config'
import { mapGetters } from 'vuex'

export default {
    name: 'portal',
    data() {
        return {
            email: 'guest@company.domain',
            password: 'password',
            appName: config.app_name
        }
    },
    computed: {
        ...mapGetters([ 'token', 'location', 'users' ])
    },
    methods: {
        isActiveNavItem: function( location ) {
            return this.location === location
        },
        login() {
            fetch('http://35.241.141.40:4002/login', {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            }).then( res => {
                res.json().then( data => {
                    if(data.token) {

                        this.$store.dispatch('setToken', data.token)



                        this.$api.get( 'user', () => {
                            var user = this.users.find( user => user.email === this.email )
                            this.$store.dispatch('setLogged', user )
                            $('#loginModal').modal('hide')
                            this.$api.get( 'resource', () => {
                                this.$api.get( 'task' )
                                this.$api.get( 'note' )
                            })
                        })




                    }
                })
            })


        }
    },
    mounted() {
        this.$store.dispatch( 'setLocation', 'portal' )
    },
    destroyed() {
        this.$store.dispatch( 'setLocation', '' )
    }
}
</script>
<style lang="scss">
#portal {

    .form-signin {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: auto;

        .form-control {
            position: relative;
            box-sizing: border-box;
            height: auto;
            padding: 10px;
            font-size: 16px;
        }

        input[type="email"] {
            margin-bottom: -1px;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
        }

        input[type="password"] {
            margin-bottom: 10px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }

        .checkbox {
            font-weight: 400;
        }
    }
}

</style>
