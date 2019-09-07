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
                            <p class="h3 mb-3 font-weight-normal">sign in</p>
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


        
         <figure>
            <div class="fixed-wrap">
                <div id="fixed" :class="{ logged: logged}">
                    <div class="carousel-caption">
                        <h1 class="display-2">{{ appName }}</h1>
                        <p>{{intro}}</p>
                        <a v-if="portalBtn" :href="portalBtn"><button type="button" class="btn btn-outline-secondary btn-lg">GitHub</button> </a>
                    </div>
                </div>
            </div>
        </figure>

       <div class="social" v-if="socialFacebook !== '' || socialGithub !== '' || socialInstagram !== '' || socialTwitter !== '' || socialWebsite !== ''">
            <a v-if="socialFacebook" :href="socialFacebook"><i class="fa fa-facebook"></i></a>
            <a v-if="socialGithub" :href="socialGithub"><i class="fa fa-github"></i></a>
            <a v-if="socialInstagram" :href="socialInstagram"><i class="fa fa-instagram"></i></a>
            <a v-if="socialTwitter" :href="socialTwitter"><i class="fa fa-twitter"></i></a>
            <a v-if="socialWebsite" :href="socialWebsite"><i class="fa fa-home"></i></a>
        </div>

    </div>
</template>

<script>
const debugSocket = false
import config from '../../../../config'
import { mapGetters } from 'vuex'
import Vue from 'vue'
export default {
    name: 'portal',
    page: 'portal',
    data() {
        return {
            // email: 'guest@develadmin.nu',
            // password: 'guest',
            email: 'root',
            password: 'toor',
            appName: config.app_name,
            intro: config.app_intro,
            socialFacebook: config.social_facebook,
            socialTwitter: config.social_twitter,
            socialGithub: config.social_github,
            socialInstagram: config.social_instagram,
            socialWebsite: config.social_website,
            portalBtn: config.portal_btn
        }
    },
    computed: {
        ...mapGetters([ 'logged', 'location', 'users' ])
    },
    methods: {
        isActiveNavItem: function( location ) {
            return this.location === location
        },
        login() {
           
            fetch(`${config.api_url}/public/login`, {
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

                        $('#loginModal').modal('hide')
                        this.$router.push('overview')

                        let user
                        let resource
                        let task 
                        let note 
                        let post 
                        let visitor 
                        let photo
                        let message
                        let ticket
                        let exercise
                        let setting

                        const update = () => {
                            
                            if( resource, task, note, post, visitor, photo, user, message, exercise, setting ) {

                                if (this.logged.username) {
                                
                                    if(this.logged.sec_lv != 9) this.$bus.$emit('toast', 'Welcome back ' + this.logged.username )
                                    else this.$bus.$emit('toast', 'Welcome ' + this.logged.username + '. Please feel free to look around. If you have any questions feel free to put them forward.' )
                                    setTimeout( () => { this.$bus.$emit('toast', '' ) }, 4000 )
                                
                                }

                            }

                        }

                        this.$api.get( 'user', () => {
                            
                            var logged = this.users.find( user => user.email === this.email )
                            this.$store.dispatch('setLogged', logged )
                            user = true

                            if( this.$socket.readyState !== 1 ) {

                                this.$socket = new WebSocket(config.web_socket)
                                if (debugSocket) console.log('portal: new')

                                this.$socket.onopen = () => {
                                    this.$socket.send(JSON.stringify({ type: 'setUser', user: this.logged._id }))
                                }

                                this.$socket.onmessage = e => {

                                    const parsed = JSON.parse(e.data)

                                    if( parsed.type === 'online' ) {
                                        let user = this.$store.getters.users.find( u => u._id === parsed.id )
                                        user.online = parsed.online
                                        this.$store.dispatch('delUser', user._id)
                                        this.$store.dispatch('addUser', user)
                                    }

                                    if (parsed.type === 'message') this.$store.dispatch(`addMessage`, parsed.message)

                                }
                            } else {
                                this.$socket.send(JSON.stringify({ type: 'setUser', user: this.logged._id }))
                                if (debugSocket) console.log('portal: setuser')
                            }
                            
                            
                            this.$api.get( 'resource', () => {
                                resource = true
                                update()
                            })
                            this.$api.get( 'task', () => {
                                task = true
                                update()
                            })
                            this.$api.get( 'note', () => {
                                note = true
                                update()
                            })
                            this.$api.get( 'post', () => {
                                post = true
                                update()
                            })
                            this.$api.get( 'visitor', () => {
                                visitor = true
                                update()
                            })
                            this.$api.get( 'image', () => {
                                photo = true
                                update()
                            })
                            this.$api.get( 'message', () => {
                                message = true
                                update()
                            })
                            this.$api.get( 'ticket', () => {
                                ticket = true
                                update()
                            })
                            this.$api.get( 'exercise', () => {
                                exercise = true
                                update()
                            })
                            this.$api.get( 'setting', () => {
                                setting = true
                                update()
                            })

                            update()
                        })
            
                        
                    } else {
                        this.$bus.$emit('toast', data.msg )
                        setTimeout( () => { this.$bus.$emit('toast', '' ) }, 3000 )
                    }
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>