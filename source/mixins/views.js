import config from '../../config'

var debug = false

function getPage(vm) {
    const { page } = vm.$options 
    if (page) return typeof page === 'function' ? page.call(vm) : page
}


export default {
    data() {
        return {
            socket: null,
            handleVisibilityChange: null,
            visibilityChange: '',
            hidden: '',
            visitor: null
        }
    },
    mounted() {
        const page = getPage(this)
        if(page) {
            if (debug) console.log('page:', page)
            var self = this

            this.socket = new WebSocket(config.web_socket)
            if (debug) console.log('new socket:', self.socket)

            this.visitor = {
                page,
                app: config.app_name,
                resolution: screen.width + 'x' + screen.height
            }
            if (self.$store.getters.logged) this.visitor.user_id = self.$store.getters.logged._id

            this.socket.onopen = () => {
                if (debug) console.log('socket send:', this.visitor)
                this.socket.send(JSON.stringify(this.visitor))
            }

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
                    if (debug) console.log('socket close:', self.socket)
                    self.socket.close()
                } else {
                    self.socket = new WebSocket(config.web_socket)
                    if (debug) console.log('new socket:', self.socket)

                    self.socket.onopen = () => {
                        self.socket.send(JSON.stringify(self.visitor))
                        if (debug) console.log('socket send:', self.visitor)
                    }
                }
            }
            
            document.addEventListener(this.visibilityChange, this.handleVisibilityChange, false)
        }
    },
    destroyed() {
        const page = getPage(this)
        if (page) {
            if (debug) console.log('destroyed() socket close:', this.socket)
            this.socket.close()
            if (debug) console.log('removeEventListener', this.visibilityChange)
            document.removeEventListener(this.visibilityChange, this.handleVisibilityChange, false)
        }
    },
}

