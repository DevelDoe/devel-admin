<template lang="html">
    <div class="admin" id="user">
        <gForm :schema="'user'" :data="user" />
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'user',
    computed: {
        ...mapGetters([ 'users' ]),
        user() {
            if(this.$route.query.user_id)
                return this.users.find(user => user._id === this.$route.query.user_id ) || null
            else {
                return {
                    fname: '',
                    lname: '',
                    username: '',
                    email: '',
                    password: '',
                    img_src: '',
                    sec_lv: '',
                    applications: [],
                    administrations: []
                }
            }
        },
    },
    mounted() {
        this.$store.dispatch( 'setLocation', 'users' )
    },
    destroyed() {
        this.$store.dispatch( 'setLocation', '' )
    }
}
</script>
<style lang="scss">

</style>
