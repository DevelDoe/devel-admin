<template>
    <div id="uploadImage">
        <form enctype="multipart/form-data" @submit.prevent="sendFile"  >
            <div class="dropzone" v-if="file === ''">
                <input 
                    type="file" 
                    class="input-field" 
                    ref="file" 
                    @change="sendFile"
                />
                <p v-if="!uploading" class="cta" >
                    Drag your image here, or click to browse
                </p>
                
                
            </div>
            
            <div class="file-list" >
                <div class="file" v-if="file">
                    <div class="image-info">
                        <h5 >{{img.name}}<i v-if="img.name" class="fa fa-times" @click="delImage"></i></h5>
                        <img :src="api_url+img.img_src" alt="" style="max-width:100%; ">
                    </div>
                    <div class="progress" >
                        <div class="progress-bar bg-info" role="progressbar" :style="'width:'+progress+'%'" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import config from '../../../../config'
export default {
    name: 'uploadImage',
    props: [ 'image' ],
    data() {
        return {
            uploading: false,
            progress: 0,
            file: this.image,
            api_url: config.api_url
        }
    },
    computed: {
        ...mapGetters([ 'logged' ]),
        img() {
            return {
                name    : this.image.substring(this.image.lastIndexOf('/')+1, this.image.lastIndexOf('.')),
                img_src : this.image
            }
        }
    },
    methods: {
        async sendFile() {

            if(this.logged.sec_lv != 9) {

                const file = this.$refs.file.files[0]
                this.file = file
                const formData = new FormData()
                formData.append('file', file)
                this.img.name = null
                this.img.img_src = null

                try {
                    this.uploading = true
                    this.$axios.defaults.headers.common['Authorization'] = `${this.$store.getters.token}`
                    const res = await this.$axios.post(`${this.api_url}/image`, formData, {
                        onUploadProgress: e => this.progress = Math.round(e.loaded * 100 / e.total)
                    })
                    this.img.img_src = res.data.file
                    this.img.name = res.data.file.substring(res.data.file.lastIndexOf('/')+1, res.data.file.length)
                    this.$bus.$emit('addImage', res.data.file )
                    this.uploading = false
                    file.uploading = false
                    this.$forceUpdate()
                } catch (error) {
                    this.$bus.$emit('toast', error.response.data.error )
                    setTimeout( () => { this.$bus.$emit('toast', '' ) }, 4000 )
                    this.uploading = false
                }
            } else {
                this.$bus.$emit('toast', 'no write permissions, your on a guest account.')
                setTimeout( () => { this.$bus.$emit('toast', '' ) }, 8000 )
            }
        },
        delImage() {
            this.file = ''
            this.progress = 0
            this.$bus.$emit('delImage' )
        }
    }
} 
</script>

<style lang="scss">
#uploadImage {
    .dropzone {
        min-height: 50px;
        height: 50px;
        position: relative;
        cursor: pointer;
        outline: 2px dashed #384373;
        outline-offset: -10px;
        background: #2e3658;
        color: #eeeeee;
        

        &:hover {
            background: #39426b;
        }

        .input-field {
            opacity: 0;
            width: 100%;
            height: 50px;
            position: absolute;
            cursor: pointer;
        }

        .cta {
            text-align: center;
            display: inline-block;
            vertical-align: middle;
            line-height: 50px;
            width: 100%;
            font-size: .8rem;
        }
    }
    .file-list {

        .file {
            padding: 20px 0px;
            position: relative;

            .image-info {
                padding: 20px;
                min-height: 20px;

                h5 {
                    margin: 12px 0;
                    position: absolute;
                    bottom: 30px;
                    right: 24px;
                    font-size: 1rem;

                    .fa {
                        position: absolute;
                        line-height: 20px;
                        font-size: 20px;
                        right: -20px;
                    }
                }

                img {
                    padding-bottom: 40px;
                }

            }

            .progress {
                background-color: #272d48;
                height: 2px;
                border-radius: 0rem;

                .bg-info {
                    background-color: #384373 !important;
                }
            }
        }
    }
}
</style>


