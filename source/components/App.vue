<template>
<div id="app" ref="app">

    <DevelToast :toast="toast"/>
    <transition name="fade" mode="out-in" >
        <gSearch />
    </transition>

    <div class='dots' :class="{ animate: loading }">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>

    <transition name="drawer">
    <div :class="drawerClass" v-if="logged && drawer">
        <div class="container-fluid">
            <div class="navbar-user clearfix" >
                <span @click="$router.push(`/admin/user?id=${logged._id}`)" style="cursor: pointer;">
                    <div class="img">
                        <img v-if="logged.img_src" :src="api_url + logged.img_src " alt="" >
                    </div>
                    <div class="info">
                        <span >
                            <h2>{{ logged.username }}</h2>
                            <h3>{{ logged.fname }} {{ logged.lname }}</h3>
                        </span>
                        
                    </div>
                </span>
                <div class="signout">
                    <i class="fa fa-sign-out"  aria-hidden="true" @click="logout" title="signout"></i>
                </div>
            </div>


            <ul class="nav nav-stacked clearfix">

                <li class="nav-caption">Site</li>
                <li :class="{ 'nav-item': true, activePortal: isActiveNavItem('portal') || isActiveNavItem('stack') || isActiveNavItem('about') || isActiveNavItem('code') || isActiveNavItem('connect') }" @click="$router.push('/')"><a> Portal </a></li>

                <li class="nav-caption">Dashboards</li>
                <li :class="{ 'nav-item': true, active: isActiveNavItem('overview') }" @click="closeDrawer; $router.push('/admin/overview')"> <a> Overview </a> </li>
                <li v-if="logged.applications.indexOf('tasks') !== -1 || logged.applications.indexOf('notes') !== -1" class="dropdown" :class="{ 'nav-item': true, active: isActiveNavItem('tasks') ||  isActiveNavItem('notes')  }">
                    <a data-toggle="dropdown" class="dropdown-toggle" href="#">Productivity <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li v-if="logged.applications.indexOf('tasks') !== -1" @click="closeDrawer; $router.push('/admin/tasks')"> <a> Tasks </a> </li>
                        <li v-if="logged.applications.indexOf('notes') !== -1" @click="closeDrawer; $router.push('/admin/notes')"> <a > Notes </a> </li>
                    </ul>
                </li>
                <li v-if="logged.applications.indexOf( 'images' )  !== -1" :class="{ 'nav-item': true, active: isActiveNavItem( 'images' ) ||  isActiveNavItem('new image')  }" @click="closeDrawer; $router.push('/admin/images')"> <a>Images</a> </li>
                <li v-if="logged.applications.indexOf( 'posts' )   !== -1" :class="{ 'nav-item': true, active: isActiveNavItem( 'posts' )  ||  isActiveNavItem('new post') }" @click="closeDrawer; $router.push('/admin/posts')"> <a>Posts</a> </li>
                <li v-if="logged.applications.indexOf( 'weights' ) !== -1" 
                    :class="{ 'nav-item': true, active: isActiveNavItem( 'weights' ) || isActiveNavItem( 'quadriceps') }" 
                    @click="closeDrawer(); $router.push( '/weights' )"> <a> Weights </a> </li>

                <li class="nav-caption" v-if="logged.forums.indexOf('general') !== -1 ">Forum</li>
                <li v-if="logged.forums.indexOf('general') !== -1" :class="{ 'nav-item': true, active: isActiveNavItem('general') }" @click="closeDrawer; $router.push('/admin/forum/general')"> <a>general</a> </li>
                
                <li class="nav-caption" v-if="logged.administrations.indexOf('data') !== -1 || logged.administrations.indexOf('users') !== -1 ">Administration</li>
                <li v-if="logged.administrations.indexOf('data') !== -1" :class="{ 'nav-item': true, active: isActiveNavItem('data') }" @click="closeDrawer; $router.push('/admin/data')"> <a>Data</a> </li>
                <li v-if="logged.administrations.indexOf('users') !== -1" :class="{ 'nav-item': true, active: isActiveNavItem('users') || isActiveNavItem('new user') }" @click="closeDrawer; $router.push('/admin/users')"> <a>Users</a> </li>

                <li class="nav-caption" v-if="logged.supports.indexOf('tickets') !== -1 ">Support</li>
                <li v-if="logged.supports.indexOf('tickets') !== -1" :class="{ 'nav-item': true, active: isActiveNavItem('tickets') }" @click="closeDrawer; $router.push('/admin/support/tickets')"> <a>tickets</a> </li>

            </ul>
        </div>

    </div>
    
    </transition >

    <nav class="navbar navbar-expand-md navbar-light bg-light sticky-top" v-if="!logged">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"> {{ appName }} </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li id="login" >
                        <button type="button" class="btn btn-login" data-toggle="modal" data-target="#loginModal" >login</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
   
    <div id="admin" :class="{ 'content': true, 'admin-open': token && drawer }">
        <div class="container-fluid">
            <div class="row heading" v-if="logged && location !== 'portal'">
                <div class="col-2">
                    <i class="fa fa-angle-left" aria-hidden="true" @click="$router.go(-1)"></i>
                </div>
                <div class="col-8"> 
                    <div v-if="mobile" class="burger" @click="drawer = true">
                        <i class="fa fa-bars" aria-hidden="true"></i>
                    </div>
                    <h2 v-else  class="display-6">{{location}}</h2>
                </div>
                <div class="col-2">
                    <i class="fa fa-search" aria-hidden="true" @click="$store.dispatch('toggleSearch')"></i>
                </div>
            </div>
            <div class="row" style="height: calc(100% - 80px)">
                <div class="col">
                    <keep-alive>
                        <transition name="fade" mode="out-in" >
                            <router-view />
                        </transition>
                    </keep-alive>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import config from '../../config'
import { mapGetters } from 'vuex'
const debugSocket = true
export default {
    name: 'app',
    data() {
        return {
            toast: '',
            showSearch: false,
            appName: config.app_name,
            api_url: config.api_url,
            drawer: true,
            mobile: false
        }
    },
    computed: {
        ...mapGetters([ 'token', 'location', 'logged', 'loading' ]),
        drawerClass() {
            return {
                drawer: this.drawer 
            }
        }
    },
    methods: {
        isActiveNavItem: function( location ) {
            return this.location === location
        },
        closeDrawer() {
            console.log('hel')
            this.mobile === true ? this.drawer = false : this.drawer = true
        },
        logout: function() {
            
            fetch(`${config.api_url}/public/logout`, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                redirect: "follow",
                referrer: "no-referrer",
            }).then( res => {
                res.json().then( data => {
                    
                    if(data.msg === 'Loged out') {
                        this.$store.dispatch('delToken')
                        this.$store.dispatch('delLogged')
                        this.$socket.send(JSON.stringify({type:'endview'}))
                        this.$socket.close()
                        if (debugSocket) console.log('app(logout): close')
                        this.$router.push('/')
                    }
                })
            }).catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        this.$bus.$on('toast', toast => { this.toast = toast })
    },
    mounted() {
        var vm = this
        window.addEventListener('keyup', function(event) {
            if (event.keyCode == 83 && event.altKey ) {
                vm.$store.dispatch('toggleSearch')
            }
        })
        vm.mobile = vm.$refs.app.offsetWidth < 768 ? true : false
    }
}
</script>
<style lang="scss" scoped>
@media (max-width: 768px) {
    .navbar-user {
        background-color: #b0b0d4;
    }
    .drawer {
        width: 100%;

        .img {
            width: 65px !important;
        }

        .info{
            width: 70% !important;
            line-height: 61px !important;
            height: 60px !important;
            padding-left: 5px;

            h2 {
                font-size: 20px !important;
                color:#212740 !important;
            }

            h3 {
                font-size: 12px !important;
                color:#212740 !important;
            }
        }

        
        .signout i {
            font-size: 40px !important;
            margin-top: 28px !important;
            font-size: 30px !important;
            color:#212740 !important;
        }
    }
    .burger {
            line-height: 60px !important;
            text-align: center;
        .fa {
            padding: 3px;
        }
    }

    .signout {
            position: absolute !important;
            right: 21px !important;
            top: 0px !important;
    }

}
</style>