<template>
     <div id="tickets">
          <div class="row " v-for="(ticket, i) in tickets" :key="'post'+i" v-if="!ticket.deleted">
               <section class="col paper" >
                    <router-link :to="{ name: 'ticket', query: { id: ticket._id } }">
                         <small class="text-muted">
                              <span class="date" v-if="ticket.updatede_at">{{$moment(ticket.updated_at).format('DD MMM - YYYY')}}</span>
                              <span class="date" v-else>{{$moment.unix(ticket.created_at).format('DD MMM - YYYY')}}</span>
                         </small>

                         <h3>{{ticket.title}}</h3>
                    </router-link>
               </section>
          </div>
          <div class="row controls">
               <div class="btn-group">
                    <button class="btn" @click="$router.push('ticket')">New Ticket</button>
               </div>
          </div>
     </div>
</template>
<script>
const debug = true
import config from '../../../../config'
import { mapGetters } from 'vuex'
export default {
     name: 'tickets',
     page: 'tickets',
     computed: {
        ...mapGetters([ 'tickets' ]),
    }
}
</script>

