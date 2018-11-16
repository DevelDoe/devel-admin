<template>
    <div id="blog">
        <div class="row" v-for="(post, i) in moveImp" :key="'post'+i">
            <section class="col" :class="{important: post.important}">
                <router-link :to="{ name: 'post', query: { id: post._id } }">
                    <small class="text-muted">
                        <span class="date" v-if="post.published">Published {{$moment(post.publishedAt).format('DD MMM - YYYY')}}</span>
                        <span class="date" v-else>{{$moment.unix(post.updatedAt).format('DD MMM - YYYY')}}</span>
                         
                    </small>
                    <div class="marks">
                        <span v-if="post.published" class="marked">published</span>
                        <span v-if="post.wip" class="marked">work in progress</span> 
                        <span v-if="post.important" class="marked">!</span>
                        <span v-if="post.feat" class="marked">featured</span>  
                        <span v-if="post.shared" class="marked">shared</span> 
                    </div>
                    <h2>{{post.title}}</h2>
                    <p>{{post.summary}}</p>
                </router-link>
            </section>
        </div>
        <div class="row controls">
            <div class="btn-group">
                <button class="btn" @click="$router.push('post')">New post</button>
            </div>
        </div>
        
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import { keySort } from '../../../../util/helperFunc.js'
export default {
    name: 'posts',
    page: 'posts',
    computed: {
        ...mapGetters([ 'posts', 'logged' ]),
        filteredPosts() {
            const usersPosts = this.posts.filter( post => {
                return post.user_id === this.logged._id
            })
            return keySort(usersPosts, 'updatedAt', true)
        },
        moveImp() {
            const imp = this.filteredPosts.filter(post => !post.important)
            return this.filteredPosts.filter(post => post.important).concat(imp)
        }
    }
}
</script>
