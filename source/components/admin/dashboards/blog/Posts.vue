<template>
    <div id="blog">
        <div class="row" v-for="(post, i) in loggedPosts" :key="'post'+i">
            <div class="col" >
                <router-link :to="{ name: 'post', query: { id: post._id } }">
                    <small  class=" text-muted">{{$moment.unix(post.createdAt).format('DD MMM - YYYY')}}</small>
                    <h2>{{post.title}}</h2>
                    
                    <p>{{post.summary}}</p>
                </router-link>
                <hr>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button class="btn btn-primary" @click="$router.push('post')">New post</button>
            </div>
        </div>
        
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name: 'blog',
    computed: {
        ...mapGetters([ 'posts', 'logged' ]),
        loggedPosts: function() {
            return this.posts.filter( post => {
                return post.user_id === this.logged._id
            })
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
<style lang="scss">
#blog {

    h2, p {
        color: #ccc;
    }
}
</style>
