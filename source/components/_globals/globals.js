import gForm from './gForm.vue'
import gSearch from './gSearch.vue'
import uploadImage from './form/uploadImage.vue'
import uploadImages from './form/uploadImages.vue'

const Globals = {
    install(Vue, options) {
        Vue.component( gForm.name, gForm)
        Vue.component( gSearch.name, gSearch)
        Vue.component( uploadImage.name, uploadImage)
        Vue.component( uploadImages.name, uploadImages)
    }
}

export default Globals
