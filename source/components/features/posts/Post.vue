<template>
    <div id="post">

        <div class="row parent">

            <!-- FORM -->
            <div class="col child">

                <form id="userForm" :class="{ 'needs-validation': !valid }" novalidate onsubmit="return false;">
                
                    <div class="form-group">
                        
                        <label>Title</label>
                        <!-- TODO: remove force -->
                        <input type="text" class="form-control" id="title"  placeholder="enter a title here" v-model="post.title" @keydown="$forceUpdate()">

                    </div>

                    <div class="form-group">
                        <label>Category</label>
                        <select class="form-control"  v-model="post.category" @blur="$forceUpdate()">
                            <option disabled value="">Choose a category</option>
                            <option v-for="(key, i) in select.category" :value="key" :key="'category'+i">{{key}}</option>
                        </select>
                    </div>
                    
                </form>

            </div>

            <!-- PREVIEW -->
            <div class="col-lg-6" id="blogPreview">

                <div class="child" id="blogPreviewChild">

                    <header id="header">
                        <h1>{{ post.category}} - {{ post.title }}</h1>
                    </header>
                    
                    <div id="summary">
                        <small>{{ post.summary }}</small>
                    </div>

                    <div id="blogPreviewBody" >
                        <p v-html="$markdown.render(post.body)"></p>
                    </div>

                </div>

            </div>

        </div>

        

        <hr>

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
                lang: [ 'en', 'sv'],
            },
            valid: true,
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
                    important: false,
                    site: ['none']
                }
            }
        },
    }
}
</script>
