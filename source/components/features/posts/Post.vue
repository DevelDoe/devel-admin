<template>
    <div id="post">

        <div class="row parent">

            <!-- FORM -->
            <div class="col child">

                <form id="userForm" :class="{ 'needs-validation': !valid }" novalidate onsubmit="return false;">

                    <div class="row post-title">

                        <div class="col-4">

                            <div class="form-group">
                                <select class="form-control"  v-model="post.category" @blur="$forceUpdate()">
                                    <option disabled value="">CATEGORY</option>
                                    <option v-for="(key, i) in select.category" :value="key" :key="'category'+i">{{key}}</option>
                                </select>
                            </div>

                        </div>


                        <div class="col">

                            <div class="form-group">
                                <input type="text" class="form-control" id="title"  placeholder="TITLE" v-model="post.title" @keydown="$forceUpdate()" autocomplete="off">
                            </div>

                        </div>

                    </div>

                    <div class="row body">

                        <div class="col">

                            <div class="form-group" >
                                <textarea class="form-control" id="summary" placeholder="summary" v-model="post.summary" @keydown="$forceUpdate()" autocomplete="off"></textarea>
                            </div>

                            <div class="form-group" style="height:100%">
                                <textarea class="form-control" id="body" placeholder="body" v-model="post.body" @keydown="$forceUpdate()" autocomplete="off" ></textarea>
                            </div>

                            

                        </div>

                    </div>
                    
                </form>

            </div>

            <!-- PREVIEW -->
            <div class="col" >

                <div class="row">

                    <div class="col">


                        <div class="form-group">
                            <input type="text" class="form-control" id="tags"  placeholder="comma separated tags" v-model="post.tags" @keydown="$forceUpdate()" autocomplete="off">
                        </div>

                        <div class="form-group">
                            <input type="text" class="form-control" id="original" placeholder="Refference" v-model="post.original" @keydown="$forceUpdate()" autocomplete="off">
                        </div>

                        <div class="form-group">
                            <select class="form-control"  v-model="post.category" @blur="$forceUpdate()">
                                <option disabled value="">language</option>
                                <option v-for="(key, i) in select.lang" :value="key" :key="'lang'+i">{{key}}</option>
                            </select>
                        </div>

                        <div class="form-group" v-if="post.published">
                            <datepicker placeholder="date" v-model="post.date"></datepicker>
                        </div>

                    </div>
                
                </div>

                <!-- <div class="child" id="blogPreviewChild">

                    <header id="header">
                        <h1>{{ post.category}}<span v-if='post.title'>, </span>{{ post.title }}</h1>
                    </header>
                    
                    <div id="summary">
                        <small>{{ post.summary }}</small>
                    </div>

                    <div id="blogPreviewBody" >
                        <p v-html="$markdown.render(post.body)"></p>
                    </div>

                </div> -->

            </div>

        </div>

      
        <div class="row controls" v-if="post._id">
            <div class="btn-group">
    
                <button class="btn btn-ctrl" :class="{ 'active': post.published }"  @click="post.published = !post.published, $forceUpdate()" >published</button>
                <button class="btn btn-ctrl" :class="{ 'active': post.shared }"  @click="post.shared = !post.shared, $forceUpdate()" >shared</button>
                <button class="btn btn-ctrl" :class="{ 'active': post.wip }"  @click="post.wip = !post.wip, $forceUpdate()" >wip</button>
                <button class="btn btn-ctrl" :class="{ 'active': post.feat }"  @click="post.feat = !post.feat, $forceUpdate()" >feat</button>
                <button class="btn btn-ctrl" :class="{ 'active': post.important }"  @click="post.important = !post.important, $forceUpdate()" >important </button>
                <button type="button" class="btn btn" @click="update()">Save</button>
                <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal">Delete</button>
            </div>
        </div>
        <div class="row controls" v-else>
            <div class="btn-group">
                <button class="btn btn-ctrl" :class="{ 'active': post.published }"  @click="post.published = !post.published, $forceUpdate()" >published</button>
                <button class="btn btn-ctrl" :class="{ 'active': post.shared }"  @click="post.shared = !post.shared, $forceUpdate()" >shared</button>
                <button class="btn btn-ctrl" :class="{ 'active': post.wip }"  @click="post.wip = !post.wip, $forceUpdate()" >wip</button>
                <button class="btn btn-ctrl" :class="{ 'active': post.feat }"  @click="post.feat = !post.feat, $forceUpdate()" >feat</button>
                <button class="btn btn-ctrl" :class="{ 'active': post.important }"  @click="post.important = !post.important, $forceUpdate()" >important </button>
                <button v-if="valid" type="button" class="btn" @click="save()">Save</button>
                <button v-else type="button" class="btn" disabled>Save</button>
            </div>
        </div> 

    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Datepicker from 'vuejs-datepicker'
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
    },
    components: {
        Datepicker,
    },
    updated() {
        var body = document.getElementById("blogPreviewChild")
        body.scrollTop = body.scrollHeight 
    },
}
</script>
