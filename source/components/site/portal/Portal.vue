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
                            <h1>Devel Admin</h1>
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


        
         <figure>
            <div class="fixed-wrap">
                <div id="fixed" :class="{ logged: logged}">
                    <div class="carousel-caption">
                        <h1 class="display-2">{{ appName }}</h1>
                        <h5>Acuar is a platform for artists. A place for our artists to showcase and sell their art.</h5>
                        <a href="https://github.com/DevelDoe/devel-admin"><button type="button" class="btn btn-outline-secondary btn-lg">GitHub</button> </a>
                    </div>
                </div>
            </div>
        </figure>

       <div class="social">
            <a href="https://www.facebook.com/develdoe"><i class="fa fa-facebook"></i></a>
            <a href="https://www.github.com/develdoe"><i class="fa fa-github"></i></a>
            <a href="https://www.instagram.com/develdoe"><i class="fa fa-instagram"></i></a>
            <a href="http://andreeray.se"><i class="fa fa-home"></i></a>
        </div>

        <footer>
            <a href="https://github.com/DevelDoe">ĕn-jĕnˈdər by DevelDoe</a> 
        </footer>
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
            email: '',
            password: '',
            appName: config.app_name,
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

                        let user
                        let resource
                        let task 
                        let note 
                        let post 
                        let visitor 
                        let photo
                        let message

                        const update = () => {
                            
                            if( resource, task, note, post, visitor, photo, user, message ) {

                                if (this.logged.username) {
                                
                                    if(this.logged.sec_lv != 9) this.$bus.$emit('toast', 'Welcome back ' + this.logged.username )
                                    else this.$bus.$emit('toast', 'Welcome ' + this.logged.username + '. Please feel free to look around. If you have any questions feel free to put them forward.' )
                                    setTimeout( () => { this.$bus.$emit('toast', '' ) }, 8000 )
                                
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
<style lang="scss">

#portal {
    background-color: #eee;
    color: #333;

    .carousel-caption {
        position: absolute;
        top: 56%;
        transform: translateY(-50%);
        h1 {
            font-size: 500%;
            text-transform: uppercase;
            text-shadow: 1px 1px 15px #000;
        }
        h5 {
            margin-bottom: 1.5rem;
        }

    }
    
    .btn-outline-secondary {
            border: none;
            color: #899bb1;
            background: #364763;

        &:hover {
             color:white;
            background: #4a6186;
        }
    }

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
        .btn-primary {
            background-color: #3c528c;
            border: none;
            &:hover {
                background-color: #253573;
                color: black;
            }
        }
    }
    /*--- Fixed Background Image --*/
    figure {
        position: relative;
        width: 100%;
        height: 600px;
        margin: 0!important;
    }
    .fixed-wrap {

    }
    #fixed {
        background-image: url('../../../assets/img/bg.jpg');
        position: fixed;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center center;
        -webkit-transform: translateZ(0);
                transform: translateZ(0);
        will-change: transform;
        transition: left 500ms;
    }
    .social {
        position: fixed;
        bottom: 10px;
        right: 0px;
        a {
            padding: 15px;
        }
        .fa {
            font-size: 22px !important;
        }
        .fa-facebook,
        .fa-github,
        .fa-instagram,
        .fa-home
        {
            &:hover {
                color: rgba(255,255,255,255.9);
            }
        }
        .fa-facebook {
            color: #3b5998;
        }
        .fa-github {
            color: #666;
        }
        .fa-instagram {
            color: #517fa8
        }
        .fa-home {
            color: #6648b1;
        }
    }
    footer {
        
        background: #364763;
        height: 93px;
        width: 106px;
        padding: 9px;
        font-size: 12px;
        position: fixed;
        right: 0;
        bottom: 93px;
        font-weight: 400;
        a {
            position: absolute;
            color: #899bb1;
            padding-top: 40px;

            &:hover {
                color: white;
            }
        }
        &:hover {
            background-color: #4e658c;
        }
    }

    
    /*---Media Queries --*/
    @media (max-width: 992px) {
        .carousel-caption {
            h3 {
                display: none;
            }
        }
        .social {
            a {
                font-size: 4rem;
                padding: 2rem;
            }
        }
    }
    @media (max-width: 768px) {
        .carousel-caption {

            h1 {
                font-size: 350%;
            }
            h3 {
                display: none;
            }
            .btn {
                font-size: 95%;
                padding: 8px 14px;
            }
        }
        .display-4 {
            font-size: 200%;
        }
        .social {
            a {
                font-size: 2.5rem;
                padding: 1.2rem;
            }
        }
        #login {
            display: none;
        }
    }
    @media (max-width: 576px) {
        .carousel-caption {

            h1 {
                font-size: 250%;
            }
            .btn {
                font-size: 90%;
                padding: 4px 8px;
            }
        }
        .display-4 {
            font-size: 160%;
        }
        .social {
            a {
                font-size: 2rem;
                padding: .7rem;
            }
        }
    }
}

</style>
