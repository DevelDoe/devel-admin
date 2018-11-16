function getPage(vm) {
    const { page } = vm.$options 
    if (page) return typeof page === 'function' ? page.call(vm) : page
}
export default {
    mounted() {
        const page = getPage(this)
        if (page) this.$store.dispatch('setLocation', page)
    },
    destroyed() {
        const page = getPage(this)
        if (page) this.$store.dispatch('setLocation', '')
    },
}
