<template>
    <div id="images" >
        <div class="row" >
            <div class="album" :class="'col-md-'+cols" v-for="(image, i) in filteredImages" :key="'image'+i" >
                <router-link :to="{ name: 'image', query: { id: image._id } }" >
                    <div style="overflow:hidden">
                        <div class="cover" :src="api_url + image.images[0]" alt="" style="width:100%; height: 200px" :style="'background: url('+api_url + replaceWhiteSpace(image.images[0])+'); background-size: cover; background-position: 50% 50%'" :title="image.title"></div>
                    </div>
                    <h3>{{image.title}}</h3> 
                    <h4 v-if="image.summary">{{image.summary}}</h4>
                    <h5 v-if="logged.sec_lv < 4">by {{author(image.user_id)}}</h5>
                    
                    <!-- <small class="text-muted">
                        <span class="date" v-if="image.published">Published {{$moment(image.publishedAt).format('DD MMM - YYYY')}}</span>
                        <span class="date" v-else>{{$moment.unix(image.updatedAt).format('DD MMM - YYYY')}}</span>
                         
                    </small>
                    <div class="marks">
                        <span v-if="image.published" class="marked">published</span>
                        <span v-if="image.feat" class="marked">featured</span>  
                        <span v-if="image.shared" class="marked">shared</span> 
                    </div> -->
                   
                </router-link>
            </div>
        </div>
        <div class="row controls">
            <div class="btn-group">
                <button class="btn" @click="$router.push('image')">New Album</button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import config from '../../../../../config'
var filters = {
    all: function ( images ) {
        return images
    },
    user: function (images ) {
        return images.filter( image => { return image.user_id === this.logged._id } )
    }
}
export default {
    name: 'images',
    page: 'images',
    data() {
        return {
            api_url: config.api_url,
            filter: 'all'
        }
    },
    computed: {
        ...mapGetters([ 'images', 'logged', 'users' ]),
        filteredImages() {
            let images
            // sec_lv 3 = operator
            if(this.logged.sec_lv < 4 || this.logged.sec_lv == 9) {
                images = this.images
            } else {
                images = this.images.filter( image => { return image.user_id === this.logged._id })
            }
            return images.sort((a,b)=>{ return b.createdAt - a.createdAt})
        },
        cols() {
            let cols = 6
            if ( this.filteredImages.length > 2 ) cols = 4
            if ( this.filteredImages.length > 3 ) cols = 3
            return cols
        }
    },
    methods: {
        author(id) {
            let author = this.users.find(user => user._id === id)
            if(author.username) return author.username 
            else return author.email
        },
        replaceWhiteSpace( url ) {
            var replaced = url.split(' ').join('%20');
            return replaced
        }
    }
}
</script>

<style lang="scss">
#images {
    .album {

        h3, 
        h4,
        h5 {
            background: #212740;
            color: #b0b0d4;
            margin:0;
            padding: 10px;
            width: 100%;
        }


        h3 {
            font-size: 1.2rem;
        }

        h4 {
            font-size: .8rem;
            padding-top: 0;
        }

        h5 {
            font-size: .6rem;
            padding-top: 0;
        }

        .cover {
            transform: scale(1);
            transition: transform 0.3s ease-in-out;
            overflow: hidden;

            &:hover {
                transform: scale(1.1);
            }
        }
    }
}
</style>
