<template>
    <div id="settings">
        <div class="row">
            <div class="col-6">
                <form>
                    <div class="form-group">
                        <h3 for="website">Websites</h3>


                        <span v-for="(site, i) in setting.sites" :key="'site'+i">

                            <label for="name">Domain</label>
                            <div class="row" style="margin-bottom: 5px">
                                <div class='col-10'>
                                    <input type="text" class="form-control"  rows="4" aria-describedby="ingressHelp" placeholder="Name of website" v-model="setting.sites[i].name" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="ingress">Port</label>
                                <input type="text" class="form-control"  rows="4" aria-describedby="portHelp" placeholder="Port" v-model="setting.sites[i].port" />
                                <small id="portHelp" class="form-text text-muted">Enter port of database</small>
                            </div>

                            <div class="form-group">
                                <label for="ingress">Introduction</label>
                                <textarea class="form-control" id="ingress" rows="4" aria-describedby="ingressHelp" placeholder="Enter introduction" v-model="setting.sites[i].ingress"></textarea>
                                <small id="ingressHelp" class="form-text text-muted">Enter an awesome introduction to your website!</small>
                            </div>

                            <div class="form-group">
                                <label for="image">Jumbatron Image</label>
                                <uploadImage :image="setting.sites[i].image" :index="i" aria-describedby="imageHelp"/>
                                <small id="imageHelp" class="form-text text-muted">Choose an image to be on the jumbatron section your front page. Don't forget to hit <b>update</b> after image is loaded or image wont be saved!</small>
                            </div>


                            <button class="btn btn-lg  btn-block" @click="removeSite(i)" >delete</button>
                            
                        </span>

                        
                        
                        <!-- <input type="text" class="form-control"  aria-describedby="websiteHelp" placeholder="" v-model="setting.website">
                        <small id="websiteHelp" class="form-text text-muted">Enter name of your website.</small> -->
                    </div>
                    
                    <!-- controls -->
                    <div class="row controls">
                        <div class="btn-group">
                            <button class="btn btn-lg  btn-block" @click="addSite" >ADD NEW SITE</button>
                            <button type="button" class="btn" @click="update()" >save</button>
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
            res ?  null : res = {}
            return res
        }
    },
    methods: {
        update() {
            if( !this.setting.user_id ) {
                this.setting.user_id = this.logged._id
                this.$api.save('setting', this.setting )
            } else {
                this.$api.update('setting', this.setting )
            }
        },
        addSite( ) {
            if( !this.setting.sites ) this.setting.sites =  []
            this.setting.sites.push({
                image: ''
            })
            this.$forceUpdate()
        },
        removeSite(i) {
            this.setting.sites.splice(i , 1)
            this.$forceUpdate()
        },
    },
    mounted() {
        this.$bus.$on('addImage', payload => {
            this.setting.sites[payload[1]].image = payload[0] })
    },
}
</script>