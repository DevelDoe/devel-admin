<template>
     <div id="ticket">
          <gForm :schema="'ticket'" :data="ticket" :select="select" />
     </div>
</template>
<script>
const debug = true
import config from '../../../../config'
import { mapGetters } from 'vuex'
export default {
     name: 'ticket',
     page: 'ticket',
     data() {
        return {
            select: {
                category: [ 'Bug', 'Feature request', 'Help', 'Other' ],
                repro: [ 'Always', 'Frequently', 'Often', 'Sometimes', 'Rarely' ]
            }
        }
    },
    computed: {
        ...mapGetters([ 'tickets', 'logged' ]),
        ticket() {
            if(this.$route.query.id)
                return this.tickets.find(ticket => ticket._id === this.$route.query.id ) || null
            else {
                return {
                    title: '',
                    category: '',
                    steps: [],
                    result: '',
                    expected: '',
                    workaround: '',
                    repro: ''
                }
            }
        },
    }
}
</script>

