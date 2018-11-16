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
                    Drag your files here, or click to browse
                </p>
                <div v-else class="progress">
                    <div class="progress-bar bg-info progress-bar-striped progress-bar-animated" role="progressbar" :style="'width:'+progress+'%'" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                
            </div>
            
            <div class="file-list">
                <ul>
                    <li v-for="(file, i) in uploadedFiles" :key="'file'+i">{{file.originalname}}</li>
                </ul>
            </div>
        </form>
    </div>
</template>

<script>
import store from '../../../store/store'
export default {

    name: 'dropzone',
    
    data() {
        return {
            files: '',
            message: '',
            error: false,
            uploading: false,
            uploadedFile: '',
            progress: 0
        }
    },

    methods: {
        async sendFile() {

            const file = this.$refs.file.files[0]
            const formData = new FormData()
            formData.append('file', file)

            try {
                this.uploading = true 
                const res = await this.$axios.post('http://35.210.92.246:4000/dropzone', formData, {
                    onUploadProgress: e => this.progress = Math.round(e.loaded * 100 / e.total)
                })
                console.log(res)
                this.uploadedFile = res.data.file
                this.progress = 0
                this.uploading = false
            } catch (error) {
                this.$bus.$emit('toast', error.response.data.error )
                setTimeout( () => { this.$bus.$emit('toast', '' ) }, 4000 )
                this.error = true
                this.uploading = false
            }
            
        }
    }
} 
</script>

<style lang="scss">
#dropzone {
    .dropzone {
        min-height: 200px;
        height: 200px;
        position: relative;
        cursor: pointer;
        outline: 2px dashed grey;
        outline-offset: -10px;
        background: #2e3658;
        color: #eeeeee;

        &:hover {
            background: #39426b;
        }

        .input-field {
            opacity: 0;
            width: 100%;
            height: 200px;
            position: absolute;
            cursor: pointer;
        }

        .cta {
            text-align: center;
            display: inline-block;
            vertical-align: middle;
            line-height: 200px;
            width: 100%;
        }
    }
    .progress {
        height: 100%;
        background-color: #272d48;
        border-radius: 0rem;
    }
    .progress-bar-striped {
        background-color: #2e3658 !important;
    }
}
</style>


