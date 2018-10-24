<template>
    <div id="post">
        <gForm :schema="'post'" :data="post" :select="categories" />
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name: 'post',
    data() {
        return {
            categories: [ 'HTML', 'CSS', 'JavaScript', 'Linux' ]
        }
    },
    computed: {
        ...mapGetters([ 'posts', 'logged' ]),
        post() {
            if(this.$route.query.id)
                return this.posts.find(post => post._id === this.$route.query.id ) || null
            else {
                return {
                    title: '',
                    original: '',
                    body: '',
                    createdAt: this.$moment().unix(),
                    category: '',
                    tags: [],
                    published: false,
                    user_id: this.logged._id
                }
            }
        },
    },
    mounted() {
        this.$store.dispatch( 'setLocation', 'posts' )
    },
    destroyed() {
        this.$store.dispatch( 'setLocation', '' )
    }
}
</script>
