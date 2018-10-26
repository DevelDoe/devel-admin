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

            <nav class="navbar  navbar-dark bg-light sticky-top" id="home">
                <div class="navbar-user">
                    <div class="container-fluid">
                        <div class="img">
                            <img :src="logged.img_src " alt="">

                        </div>
                        <div class="devel-col info">
                            <h2>{{ logged.username }}</h2>
                            <h3>{{ logged.fname }} {{ logged.lname }}</h3>
                        </div>
                        <div class="devel-col" >
                            <i class="fa fa-sign-out"  aria-hidden="true" @click="$store.dispatch('delToken'), $store.dispatch('delLogged'), $router.push('/')" ></i>
                        </div>
                    </div>
                </div>
            </nav>

        <div class="container-fluid">
            <ul class="nav nav-stacked">

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
                        <li id="login" v-if="!token">
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
        }
    },
    created() {
        this.$bus.$on('toast', toast => { this.toast = toast })
    }
}
</script>
<style lang="scss">
#app {
    #portal {
        #fixed.logged {
            left: 100px;
        }
    }
    .navbar {
        padding: .8rem;
        color: #eee;
        background-color: transparent !important;
    }
    .navbar-brand {
        color: #eee;
        img {
            width: 10%;
            margin-bottom: 10px;
        }
    }
    .navbar-nav {
        li {
            padding-right: 20px;
        }
    }
    .btn-login {
        background: transparent;
        color: #eee;
        &:hover {
            background-color:rgba(255,255,255,0.04)
        }
    }
    .heading {
        position: relative;

        h2 {
            position: absolute;
            top: 12px;
            left: 57px;
            font-size: 33px;
            color: #ccc;
        }
        .fa-search {
            float: right;
            font-size: 24px;
            padding-right: 1rem;
        }
    }
    .nav-stacked {
        .nav-caption {
            letter-spacing: 1px;
            color: #c2cade;
            text-transform: uppercase;
            margin-top: 10px;
        }

        li {
            padding: 0.5rem 1.2rem;
            border-radius: 0.25rem;
            width: 100%;
            cursor: pointer;
            margin-bottom: 5px;
            transition: background-color .3s ease-in-out;

            a {
                color: #b1b1b1;
                width: 100%;
                height: 100%;
                transition: color .3s ease-in-out;

                &:hover {
                    text-decoration: none;
                    color: #fff;
                }
            }
        }

        .dropdown {
            
            .dropdown-menu {
                background-color: #252830;
                 a {
                    color: #b1b1b1;
                    width: 100%;
                    height: 100%;
                    transition: color .3s ease-in-out;

                    &:hover {
                        text-decoration: none;
                        color: #b1b1b1;
                    }
                }
                
            }
            .show {
                    border: 1px solid rgba(255, 255, 255, 0.15);
                }

        }

        .active {
            background-color: #b0b0d4;

            a {
                color: #252830;
            }
        }
    }
}

</style>
