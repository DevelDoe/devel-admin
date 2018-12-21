import config from '../../config'

var debugSocket = false

function getPage(vm) {
    const { page } = vm.$options 
    if (page) return typeof page === 'function' ? page.call(vm) : page
}


export default {
    data() {
        return {
            handleVisibilityChange: null,
            visibilityChange: '',
            hidden: '',
            visitor: null
        }
    },
    mounted() {
        const page = getPage(this)
        if(page) {
            var self = this

            this.visitor = {
                type: 'view',
                page,
                app: config.app_name,
                resolution: screen.width + 'x' + screen.height
            }
            if (this.$store.getters.logged) this.visitor.user_id = this.$store.getters.logged._id
            
            if (this.$socket.readyState === 1) this.$socket.send(JSON.stringify(this.visitor))
            else {
                let interval = setInterval(()=>{
                    if (this.$socket.readyState === 1) {
                        this.$socket.send(JSON.stringify(this.visitor))
                        clearInterval(interval)
                    } 
                }, 300)
            }
            if (debugSocket) console.log('view(mounted): view')

            
            

            if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
                this.hidden = "hidden";
                this.visibilityChange = "visibilitychange";
            } else if (typeof document.msHidden !== "undefined") {
                this.hidden = "msHidden";
                this.visibilityChange = "msvisibilitychange";
            } else if (typeof document.webkitHidden !== "undefined") {
                this.hidden = "webkitHidden";
                this.visibilityChange = "webkitvisibilitychange";
            }


            this.handleVisibilityChange = function () {
                if (this.hidden) {
                    if (debugSocket) console.log('view(HVC): hidden')
                    self.$socket.send(JSON.stringify({type:'endview'}))
                    if (debugSocket) console.log('view(HVC): endview')
                    self.$socket.close()
                    if (debugSocket) console.log('view(HVC): close')
                } else {
                    if (debugSocket) console.log('view(HVC): !hidden')
                    self.$socket = new WebSocket(config.web_socket)
                    if (debugSocket) console.log('view(HVC): new')

                    self.$socket.onopen = () => {
                        if(self.logged) {
                            self.$socket.send(JSON.stringify({ type: 'setUser', user: self.logged._id }))
                            if (debugSocket) console.log('view(HVC): setUser')
                        } 
                        
                        self.$socket.send(JSON.stringify(self.visitor))
                        if (debugSocket) console.log('view(HVC): view')
                    }

                    self.$socket.onmessage = e => {

                        const parsed = JSON.parse(e.data)

                        if (parsed.type === 'online') {
                            let user = self.$store.getters.users.find(u => u._id === parsed.id)
                            user.online = parsed.online
                            self.$store.dispatch('delUser', user._id)
                            self.$store.dispatch('addUser', user)
                        }

                        if (parsed.type === 'message') self.$store.dispatch(`addMessage`, parsed.message)
                    }
                }
            }
            
            document.addEventListener(this.visibilityChange, this.handleVisibilityChange, false)
        }
    },
    destroyed() {
        const page = getPage(this)
        if (page) {
            if( this.$socket.readyState === 1 ) { this.$socket.send(JSON.stringify({ type:'endview'})) }
            if (debugSocket) console.log('view(destroy): endview')
            if (debugSocket) console.log('view(destroy): removeEventListener', this.visibilityChange)
            document.removeEventListener(this.visibilityChange, this.handleVisibilityChange, false)
        }
    },
}

