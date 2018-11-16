<template>
    <div id="images">
        <div class="row" v-for="(image, i) in filteredImages" :key="'image'+i">
            <section class="col" >
                <router-link :to="{ name: 'image', query: { id: image._id } }">
                    <small class="text-muted">
                        <span class="date" v-if="image.published">Published {{$moment(image.publishedAt).format('DD MMM - YYYY')}}</span>
                        <span class="date" v-else>{{$moment.unix(image.updatedAt).format('DD MMM - YYYY')}}</span>
                         
                    </small>
                    <div class="marks">
                        <span v-if="image.published" class="marked">published</span>
                        <span v-if="image.feat" class="marked">featured</span>  
                        <span v-if="image.shared" class="marked">shared</span> 
                    </div>
                    <h2>{{image.title}}</h2>
                    <p>{{image.summary}}</p>
                </router-link>
            </section>
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
import { keySort } from '../../../../util/helperFunc.js'
export default {
    name: 'images',
    page: 'IMAGE ALBUMS',
    computed: {
        ...mapGetters([ 'images', 'logged' ]),
        filteredImages() {
            const usersImages = this.images.filter( image => {
                return image.user_id === this.logged._id
            })
            return keySort(usersImages, 'updatedAt', true)
        }
    }
}
</script>

