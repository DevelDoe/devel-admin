<template>
    <div id="multipleImages">
        <form enctype="multipart/form-data" @submit.prevent="sendFile">
            <label for="file">Upload Image</label>
            <input
                multiple 
                type="file" 
                @change="selectFile"
                ref="files"
            >
            <button>Send</button>
        </form>
        <ul>
            <li v-for="(file, i) in files" :key="'file'+i" :class="{error: file.invalidMessage}">
                {{file.name}} 
                <span v-if="file.invalidMessage">{{file.invalidMessage}}</span> 
                <i class="fa fa-times" @click="files.splice(i, 1); uploadFiles.splice(i, 1)"></i></li>
        </ul>
    </div>
</template>

<script>
import store from '../../../store/store'
export default {

    name: 'multipleImages',

    data() {
        return {
            files: [],
            uploadFiles: []
        }
    },

    methods: {

        selectFile() {
            const files = this.$refs.files.files
            this.uploadFiles = [ ...this.uploadFiles, ...files ] 
            
            
            let list = []
            Object.keys(files).forEach(key => {
                list.push(files[key])
            })
            list.map(file => {
                file.invalidMessage = this.validate(file)
            })

            this.files = [ 
                ...this.files, 
                ...list 
            ] 
            
        },

        validate(file) {
            const MAX_IMAGE_SIZE = 1024 * 1024 * 5 // 5 MB
            const allowedType = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']

            if(file.size > MAX_IMAGE_SIZE) {
                return `Max size: ${MAX_IMAGE_SIZE / 1000000}Mb`
            }

            if(!allowedType.includes(file.type)) {
                return 'Not an image'
            }

            return ''
        },

        sendFile() {
            const formData = new FormData()
            for(var i = 0, len = this.uploadFiles.length; i<len; i++) {
                
                if(this.validate(this.uploadFiles[i]) === '') {
                    formData.append('files', this.uploadFiles[i])
                }
            }
            
            
            this.$api.upload('images', formData).then(res => {
                console.log(res)
                this.uploadFiles = []
                this.files = []
            })
        }
    }
}
</script>

<style lang="scss">
#multipleImages {
    .error {
        color: red;
    }
}
</style>


