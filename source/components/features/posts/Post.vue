<template>
    <div id="post ">

        <gForm :schema="'post'" :data="post" :select="select" />

    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name: 'post',
    page: 'new post',
    data() {
        return {
            select: { 
                category: [ 'HTML', 'CSS', 'JavaScript', 'Linux', 'Windows', 'MongoDB', 'Git', 'Vue', 'Webpack', 'Node', 'Design', 'Electronics', 'Jekyll', 'Github',  'Star Citizen', 'Music Production' ],
                lang: [ 'en', 'sv']
            }
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
                    summary: '',
                    original: '',
                    body: '',
                    category: '',
                    tags: [],
                    published: false,
                    user_id: this.logged._id,
                    shared: false,
                    lang: '',
                    wip: false,
                    feat: false,
                    important: false
                }
            }
        },
    }
}
</script>
