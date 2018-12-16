<template>
    <div id="general" style="height: 100%;">
        <div class="row" style="height: 100%;">
            <div class="col-md-9" style="overflow: hidden; position: relative;height: 100%;width: 100%;margin-left: -28px;">
                <div class="messages" ref="messages">
                    <div class="message" v-for="(msg, i) in messages" :key="'message'+i">
                        <div class="row">
                            <div class="col-md-1" style="padding-left:0;padding-right:0">
                                <div class="image">
                                    <img :src=" api_url + getUser( msg.user ).img_src " alt="">
                                </div>
                                
                            </div>
                            <div class="col-md-11" style="padding-left:0">
                                <div class="message-user"> <h3> {{ getUser( msg.user ).username }} </h3> <small class="text-muted date">{{ $moment.unix(msg.created_at).calendar(null) }}</small> </div>
                                <div class="message-msg"> <span v-html="$markdown.render( msg.message )"></span> </div>
                            </div>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="input">
                            <textarea autofocus  class="textarea" rows="1" ref="textarea" autocomplete="off" placeholder="Message #general-chat" style="height: auto" v-model="message" @keyup="enter"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 users">
                <h3>ONLINE</h3>
                <div class="online">
                    <div class="user" v-for="(user,i) in online" :key="'user'+i">
                        <div class="image">
                            <img :src=" api_url + user.img_src " alt="">
                        </div>
                        {{ user.username }}
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    
</template>

<script>
var debug = false
import { mapGetters } from 'vuex'
import config from '../../../config'
export default {
    name: 'general',
    page: 'general',
    data() {
        return {
            message: '',
            chat_users: [],
            api_url: config.api_url
        }
    },
    computed: {
        ...mapGetters([ 'logged', 'messages', 'users' ]),
        online() {
            return this.users.filter( user => user.online )
        }
    },
    methods: {
        enter(event) {
            if(!event.shiftKey && event.keyCode === 13) {
                this.send()
                this.$refs.textarea.style.height = 'auto'
            } 
            if(event.shiftKey && event.keyCode === 13)  this.$refs.textarea.style.height = (this.$refs.textarea.clientHeight + 20) + 'px'
            if( event.keyCode === 8 ) {
                let str = this.$refs.textarea.value
                console.log(str.split(/\r\n|\r|\n/).length)
                switch(str.split(/\r\n|\r|\n/).length) {
                    case 1:
                         this.$refs.textarea.style.height = 'auto'
                         break;
                    case 2:
                        this.$refs.textarea.style.height = '62px'
                        break;
                    case 3:
                        this.$refs.textarea.style.height = '82px'
                        break;
                    case 4:
                        this.$refs.textarea.style.height = '102px'
                        break;
                    case 5:
                        this.$refs.textarea.style.height = '122px'
                        break;
                    case 6:
                        this.$refs.textarea.style.height = '142px'
                        break;
                    default:
                }
            }
            
        },
        send() {
            
            const chat = {
                type: 'chat',
                user: this.logged._id,
                message: this.message, 
                room: 'general',
                created_at: this.$moment().unix()
            }
            this.message = ''
            this.$socket.send(JSON.stringify( chat ))
            this.$store.dispatch( `addMessage` , chat )
            
        },
        getUser( id ) {
            const user = this.users.find( user => user._id === id )
            return user
        }
    },
    updated() {
        this.$nextTick(() => {
            this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight 
            this.$refs.textarea.focus()
        })
    },
    mounted() {
        this.message = "u"
        this.message = ""
        this.$nextTick(() => {
            this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
            this.$refs.textarea.focus()
        })
    }
}
</script>
