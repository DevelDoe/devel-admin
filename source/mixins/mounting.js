import config from '../../config'

export default {
    data() {
        return {
            socket: null
        }
    },
    mounted() {
        if (this.$options.name !== 'router-link' && this.$options.name !== 'resource' && this.$options.name !== 'transition' && this.$options.name !== 'keep-alive' && this.$options.name !== undefined && this.$options.name !== 'gSearch' && this.$options.name !== 'gForm' && this.$options.name !== 'DevelToast' && this.$options.name !== 'app') {
            
            var self = this

            this.$store.dispatch('setLocation', this.$options.name +'')


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

            this.socket = new WebSocket('ws://35.210.92.246:4000')

            
            const visitor = {
                page: self.$options.name,
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
        
        if (this.$options.name !== 'router-link' && this.$options.name !== 'resource' && this.$options.name !== 'transition' && this.$options.name !== 'keep-alive' && this.$options.name !== undefined && this.$options.name !== 'gSearch' && this.$options.name !== 'DevelToast' && this.$options.name !== 'app' && this.$options.name !== 'gForm') {
            clearInterval(this.id)
            this.socket.close()
            this.$store.dispatch('setLocation', '')
        }
    },
}

