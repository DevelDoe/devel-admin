<template>
    <div id="newImgAlbum">
        <gForm :schema="'image'" :data="image" />
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'newImgAlbum',
    page: 'new image',
    computed: {
        ...mapGetters([ 'images', 'logged' ]),
        image() {
            if(this.$route.query.id)
                return this.images.find( image => image._id === this.$route.query.id ) || null
            else {
                return {
                    title: '',
                    summary: '',
                    tags: [],
                    published: false,
                    user_id: this.logged._id,
                    private: false,
                    feat: false,
                    images: []
                }
            }
        },
    }
}
</script>
