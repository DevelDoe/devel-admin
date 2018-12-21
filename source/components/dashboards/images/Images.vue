<template>
    <div id="images" >
        <div class="row" v-if="logged.sec_lv < 4">
            <div class="col">
                <ul class="filters" style="padding: 0; margin:0">
                    <li :class="{ active: filter == 'all' }" @click="filter = 'all'">all</li>
                    <li :class="{ active: filter == 'user' }" @click="filter = 'user'">my</li>
                </ul>
            </div>
        </div>
        <div class="row" >
            <div class="album" :class="'col-md-'+cols" v-for="(image, i) in filteredImages" :key="'image'+i" >
                <router-link :to="{ name: 'image', query: { id: image._id } }" >
                    <div style="overflow:hidden">
                        <div class="cover" :src="api_url + image.images[0]" alt="" style="width:100%; height: 200px" :style="'background: url('+api_url + image.images[0]+'); background-size: cover; background-position: 50% 50%'" :title="image.title"></div>
                    </div>
                    <h3>{{image.title}}</h3> 
                    <h4 v-if="image.summary">{{image.summary}}</h4>
                    <h5 v-if="logged.sec_lv < 4">by {{author(image.user_id)}}</h5>
                   
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
import config from '../../../../config'
var filters = {
    all: function ( images ) {
        return images
    },
    user: function (images, id) {
        return images.filter( image => { return image.user_id === id } )
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
                images = filters[this.filter](this.images, this.logged._id)
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

    .filters {

        li {
            float: left;
            margin-right: 5px;
            list-style: none;
            color: #b0b0d4;

            &:hover {
                color: #d1d1e4;
                cursor: pointer;
            }
        }

        .active {
            color: #eee;
        }
    }
}
</style>
