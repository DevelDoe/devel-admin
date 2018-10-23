<!--
@Author: Andree Ray <andreeray>
@Date:   2018-01-18T21:23:04+01:00
@Email:  andreeray@live.com
@Filename: App.vue
@Last modified by:   Morgan Andree Ray
@Last modified time: 08-05-2018
-->

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
                    <li v-if="logged.applications.indexOf('tasks') !== -1" :class="{ 'nav-item': true, active: isActiveNavItem('tasks') }">
                        <a href="/#/admin/tasks"> Tasks </a>
                    </li>
                    <li v-if="logged.applications.indexOf('notes') !== -1" :class="{ 'nav-item': true, active: isActiveNavItem('notes') }">
                        <a href="/#/admin/notes"> Notes </a>
                    </li>
                    <li v-if="logged.applications.indexOf('blog') !== -1" :class="{ 'nav-item': true, active: isActiveNavItem('blog') }">
                        <a href="/#/admin/blog"> Blog </a>
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
        <div id="admin" :class="{ 'content': true, 'admin-open': token }">
            <div class="container-flui">
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
</div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
    name: 'app',
    data() {
        return {
            toast: '',
            showSearch: false
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
}

</style>
