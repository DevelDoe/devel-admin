<!-- <DevelToast :toast="toast"/> -->
<template lang="html">
    <transition name="slide-fade" :duration="{ enter: 500, leave: 800 }" >
    <section id="toast" v-if="toast">
        {{ toast }}
    </section>
    </transition>
</template>

<script>
export default {
    name: 'DevelToast',
    props: [ 'toast' ]
}
</script>

<style media="screen">
    #toast {
        position: fixed;
        bottom:0;
        right:0;
        z-index: 9999;
        background: #212740;
        color: #b0b0d4;
        padding: 1rem 2rem;
        border: 1px solid #b0b0d4;
        margin: 1rem;
    }
</style>
