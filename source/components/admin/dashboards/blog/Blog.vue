<template>
    <div id="blog">
        hello blog
    </div>
</template>
<script>
export default {
    name: 'blog',
    mounted() {
        this.$store.dispatch( 'setLocation', 'blog' )
    },
    destroyed() {
        this.$store.dispatch( 'setLocation', '' )
    }
}
</script>
