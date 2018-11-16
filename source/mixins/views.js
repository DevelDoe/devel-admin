import config from '../../config'

function getPage(vm) {
    const { page } = vm.$options 
    if (page) return typeof page === 'function' ? page.call(vm) : page
}

export default {
    data() {
        return {
            socket: null
        }
    },
    mounted() {
        const page = getPage(this)
        if(page) {
            var self = this

            this.socket = new WebSocket(config.web_socket)


            const visitor = {
                page,
                app: config.app_name,
                resolution: screen.width + 'x' + screen.height
            }
            if (self.$store.getters.logged) visitor.user_id = self.$store.getters.logged._id

            this.socket.onopen = () => {
                this.socket.send(JSON.stringify(visitor))
            }

            var hidden, visibilityChange;
            if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
                hidden = "hidden";
                visibilityChange = "visibilitychange";
            } else if (typeof document.msHidden !== "undefined") {
                hidden = "msHidden";
                visibilityChange = "msvisibilitychange";
            } else if (typeof document.webkitHidden !== "undefined") {
                hidden = "webkitHidden";
                visibilityChange = "webkitvisibilitychange";
            }

            function handleVisibilityChange() {
                if (document[hidden]) {
                    self.socket.close()
                } else {
                    self.$router.go()
                }
            }
            document.addEventListener(visibilityChange, handleVisibilityChange, false)
        }
    },
    destroyed() {
        const page = getPage(this)
        if (page) {
            this.socket.close()
        }
    },
}

