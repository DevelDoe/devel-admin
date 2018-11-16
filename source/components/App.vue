<template>
<div id="app">

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
    <div :class="{ 'drawer': logged }" v-if="logged">
        <div class="container-fluid">
            <div class="navbar-user clearfix">
                <div class="img">
                    <img :src="logged.img_src " alt="" >

                </div>
                <div class="info">
                    <span>
                        <h2>{{ logged.username }}</h2>
                        <h3>{{ logged.fname }} {{ logged.lname }}</h3>
                    </span>
                    
                </div>
                <div class="signout">
                    <i class="fa fa-sign-out"  aria-hidden="true" @click="logout" title="signout"></i>
                </div>
            </div>


            <ul class="nav nav-stacked clearfix">

                <li class="nav-caption">Site</li>
                <li :class="{ 'nav-item': true, active: isActiveNavItem('portal') || isActiveNavItem('stack') || isActiveNavItem('about') || isActiveNavItem('code') || isActiveNavItem('connect') }">
                    <a href="/#/"> Portal </a>
                </li>

                <li class="nav-caption">Dashboards</li>
                <li :class="{ 'nav-item': true, active: isActiveNavItem('overview') }">
                    <a href="/#/admin/overview"> Overview </a>
                </li>
                <li class="dropdown" :class="{ 'nav-item': true, active: isActiveNavItem('tasks') ||  isActiveNavItem('notes')  }">
                    <a data-toggle="dropdown" class="dropdown-toggle" href="#">Productivity <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li v-if="logged.applications.indexOf('tasks') !== -1" >
                            <a href="/#/admin/tasks"> Tasks </a>
                        </li>
                        <li v-if="logged.applications.indexOf('notes') !== -1" >
                            <a href="/#/admin/notes"> Notes </a>
                        </li>
                    </ul>
                </li>

                <li v-if="logged.applications.indexOf('images') !== -1" :class="{ 'nav-item': true, active: isActiveNavItem('IMAGE ALBUMS') ||  isActiveNavItem('NEW IMAGE ALBUM')  }">
                    <a href="/#/admin/images"> Images </a>
                </li>
                
                <li v-if="logged.applications.indexOf('blog') !== -1" :class="{ 'nav-item': true, active: isActiveNavItem('posts') }">
                    <a href="/#/admin/posts"> Blog </a>
                </li>

                <li class="nav-caption">Administration</li>
                <li v-if="logged.administrations.indexOf('data') !== -1" :class="{ 'nav-item': true, active: isActiveNavItem('data') }">
                    <a href="/#/admin/data">Data</a>
                </li>
                <li v-if="logged.administrations.indexOf('users') !== -1" :class="{ 'nav-item': true, active: isActiveNavItem('users') }">
                    <a href="/#/admin/users">Users</a>
                </li>
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
   
    <div id="admin" :class="{ 'content': true, 'admin-open': token }">
        <div class="container-fluid">
            <div class="row heading" v-if="logged">
                <div class="col-12">
                    <i class="fa fa-angle-left" aria-hidden="true" @click="$router.go(-1)"></i>
                    <i class="fa fa-angle-right" aria-hidden="true" @click="$router.go(1)"></i>
                    <h2 class="display-6">{{location}}</h2>
                    <i class="fa fa-search" aria-hidden="true" @click="$store.dispatch('toggleSearch')"></i>
                </div>
            </div>
            <div class="row">
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
export default {
    name: 'app',
    data() {
        return {
            toast: '',
            showSearch: false,
            appName: config.app_name
        }
    },
    computed: {
        ...mapGetters([ 'token', 'location', 'logged', 'loading' ]),
    },
    methods: {
        isActiveNavItem: function( location ) {
            return this.location === location
        },
        logout: function() {
            
            fetch(`${config.api_url}public/logout`, {
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
        
    }
}
</script>