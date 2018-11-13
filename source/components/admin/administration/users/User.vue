<template lang="html">
    <div class="admin" id="user">
        <gForm :schema="'user'" :data="user" />
        <div class="row user-data" >
            <div class="col-6">
                <canvas ref="pagesCanvas" width="400" height="150" ></canvas>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'user',
    computed: {
        ...mapGetters([ 'users', 'visitors' ]),
        user() {
            if(this.$route.query.id)
                return this.users.find(user => user._id === this.$route.query.id ) || null
            else {
                return {
                    fname: '',
                    lname: '',
                    username: '',
                    email: '',
                    password: '',
                    img_src: '',
                    sec_lv: '',
                    applications: [],
                    administrations: []
                }
            }
        },
        getPages(){
            let pages = {}
            for(var i = 0, len = this.visitors.length; i<len; i++) {
                
                if(this.visitors[i].page !== undefined &&  this.visitors[i].user_id == this.$route.query.id && this.visitors[i].user_id != undefined ) {
 
                    var page = this.visitors[i].page
                    var seconds = this.visitors[i].seconds
                    var user_id = this.visitors[i].user_id
                    if(page && page.indexOf('-') > 0) page = page.replace('-', '')
                    if( !pages[page] ) {
                        pages[page] = {}
                        pages[page].views = 0
                        pages[page].seconds = 0
                        pages[page].user_id = ''
                    } 
                    pages[page].views++
                    pages[page].seconds += seconds
                    pages[page].user_id = user_id
                }
            }
            Object.keys(pages).forEach(key => {
                pages[key].avg = pages[key].seconds / pages[key].views
            })
            const filtered = Object.keys(pages).forEach(page => { 
                console.log(page)
                return 
                })
            return pages
        },
    },
    mounted() {
        // pages viewd chart

        // sort by views
        let sortableArray = []
        Object.keys(this.getPages).forEach( key => {
            sortableArray.push({'name': key, 'views': this.getPages[key].views, 'seconds': this.getPages[key].seconds, 'avg': this.getPages[key].avg})
        })

        let pages = sortableArray.sort((a, b) => b.views - a.views)
        let pages_name = []
        let pages_views = []
        let pages_backgrounds = []

        pages.forEach( page => {
            pages_name.push(page.name)
            pages_views.push(page.views)
        })

        pages.forEach((page, i) => {
            pages_backgrounds.push(`rgba(176,176,212,${1/(i+1)})`)
        })

        var users = new Chart(this.$refs.pagesCanvas, {
            type: 'horizontalBar',
            data: {
                labels: pages_name,
                datasets: [
                    {
                        backgroundColor: pages_backgrounds,
                        data: pages_views
                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                         ticks: {
                            beginAtZero:true,
                        },
                        display: false,
                        gridLines: {
                            display: false,
                            color: "white"
                        },
                    }],
                    yAxes: [{
                        display: true,
                        gridLines: {
                            color: "transparent",
                        },
                    }]
                },
                legend: { display: false },
                title: {
                    display: true,
                    text: 'PAGE VIEWS'
                }
            }
        })
    },
}
</script>
<style lang="scss">
#user {
    .user-data {
        height: 100%;
        margin-top: -60px;
        padding: 20px 20px 20px 0;
    }
}
</style>
