<template>
    <div id="settings">
        <div class="row">
            <div class="col-6">
                <form>
                    <div class="form-group">
                        <label for="website">Website Name</label>
                        <input type="text" class="form-control" id="website" aria-describedby="websiteHelp" placeholder="Enter website" v-model="setting.website">
                        <small id="websiteHelp" class="form-text text-muted">Enter name of your website.</small>
                    </div>
                    <div class="form-group">
                        <label for="ingress">Introduction</label>
                        <textarea class="form-control" id="ingress" rows="4" aria-describedby="ingressHelp" placeholder="Enter introduction" v-model="setting.ingress"></textarea>
                        <small id="ingressHelp" class="form-text text-muted">Enter an awesome introduction to your website!</small>
                    </div>
                    <label for="image">Jumbatron Image</label>
                    <uploadImage :image="setting.image" aria-describedby="imageHelp"/>
                    <small id="imageHelp" class="form-text text-muted">Choose an image to be on the jumbatron section your front page. Don't forget to hit <b>update</b> after image is loaded or image wont be saved!</small>
                    <!-- controls -->
                    <div class="row controls">
                        <div class="btn-group">
                            <button type="button" class="btn" @click="update()" >update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name: 'settings',
    page: 'settings',
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters([ 'logged', 'settings' ]),
        setting() {
            let res = {}
            res = this.settings.find( set  => set.user_id === this.logged._id )
            if(res.image === undefined) res.image =  '' 
            return res
        }
    },
    methods: {
        update() {
            if( !this.setting.user_id ) {
                this.setting.user_id = this.logged._id
                this.setting.port = 4006 + this.settings.length
                if(this.setting.image === undefined) this.setting.image = ''
                this.$api.save('setting', this.setting )
            } else {
                this.$api.update('setting', this.setting )
            }
        }
    },
    created() {
        this.$bus.$on('addImage', payload => { this.setting.image = payload })
    }
}
</script>