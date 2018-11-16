<template>
    <div id="dropzone">
        <form enctype="multipart/form-data" @submit.prevent="sendFile">
            <div class="dropzone">
                <input 
                    type="file" 
                    class="input-field" 
                    ref="file" 
                    @change="sendFile"
                />
                <p v-if="!uploading" class="cta">
                    Drag your file here, or click to browse
                </p>
                
                
            </div>
            
            <div class="file-list">
                <div v-for="(file, i) in uploadedFiles" :key="'file'+i" class="file">
                    <div class="image-info">
                        
                        <h5 >{{file.name}}<i class="fa fa-times" @click="delImage(i)"></i></h5>
                        <img :src="'http://35.210.92.246:4000'+file.src" alt="" style="max-width:200px;">
                    </div>
                    <div v-if="file.uploading" class="progress">
                        <div class="progress-bar bg-info" role="progressbar" :style="'width:'+progress+'%'" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div v-else class="progress">
                        <div class="progress-bar bg-info" role="progressbar" :style="'width:100%'" :aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

    name: 'dropzone',

    props: [ 'images' ],
    
    data() {
        return {
            message: '',
            error: false,
            uploading: false,
            uploadedFiles: [
                ...this.images.map( image => {
                    const filename = image.substring(image.lastIndexOf('/')+1, image.length)
                    return { name: filename, src: image}
                })
            ],
            progress: 0
        }
    },

    computed: {
        ...mapGetters([ 'logged' ]),
    },

    methods: {
        async sendFile() {

            if(this.logged.sec_lv != 9) {

                const file = this.$refs.file.files[0]
                const formData = new FormData()
                formData.append('file', file)
                this.uploadedFiles.push(file)

                try {
                    this.uploading = true
                    file.uploading = true
                    const res = await this.$axios.post('http://35.210.92.246:4000/image', formData, {
                        onUploadProgress: e => this.progress = Math.round(e.loaded * 100 / e.total)
                    })
                    this.progress = 0
                    file.src = res.data.file
                    this.$bus.$emit('addImage', res.data.file )
                    this.uploading = false
                    file.uploading = false
                } catch (error) {
                    this.uploadedFiles.splice(this.uploadedFiles.length -1, 1)
                    this.$bus.$emit('toast', error.response.data.error )
                    setTimeout( () => { this.$bus.$emit('toast', '' ) }, 4000 )
                    this.error = true
                    this.uploading = false
                }
            } else {
                this.$bus.$emit('toast', 'no write permissions, your on a guest account.')
                setTimeout( () => { this.$bus.$emit('toast', '' ) }, 8000 )
            }
        },
        delImage(i) {
            this.uploadedFiles.splice(i,1)
            this.$bus.$emit('delImage', i )
        }
    }
} 
</script>

<style lang="scss">
#dropzone {
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
            padding: 30px 5px;
            position: relative;

            .image-info {
                padding: 20px;
                min-height: 150px;

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


