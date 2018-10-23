<template lang="html">
    <div id="dashboard" class="admin">

        <div class="row padding">
            <div class="col-lg-6" v-if="logged.applications.indexOf('tasks') !== -1" v-for="(note, index) in filterNotes">
                <div class="paper">
                    <h3> {{ note.title }}</h3>
                </div>
            </div>
            <div class="col-12">
                <div class="paper">
                    <h3>Order History</h3>
                    <canvas ref="orderHistoryCanvas" width="400" height="100" ></canvas>
                </div>
            </div>
            <div class="col-lg-6" v-if="logged.applications.indexOf('tasks') !== -1 && filterTasks.length > 0">
                <div class="paper">
                    <h3>Tasks</h3>
                    <ul class="todo-list">
                        <li v-for="(todo, index) in filterTasks" class="todo" :key=" 'todo' + index"  >
                            {{ todo.title }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'dashboard',
    computed: {
        ...mapGetters([ 'tasks', 'logged', 'notes' ]),
        filterTasks() {
            return this.loggedTasks.filter( todo => { return todo.completed === false  })
        },
        filterNotes() {
            return this.loggedNotes.filter( note => { return note.overview === true  })
        },
        loggedTasks: function() {
            return this.tasks.filter( todo => {
                return todo.user_id === this.logged._id
            })
        },
        loggedNotes: function() {
            return this.notes.filter( note => {
                return note.user_id === this.logged._id
            })
        },
    },
    mounted() {
        this.$store.dispatch( 'setLocation', 'overview' )
        var chart = new Chart(this.$refs.orderHistoryCanvas, {
            type: 'line',
            data: {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                datasets: [{
                    label: '# orders',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: 'RGBA(30, 194, 255, 1)',
                    borderColor: 'RGBA(161, 223, 247, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        })
    },
    destroyed() {
        this.$store.dispatch( 'setLocation', '' )
    }
}
</script>

<style lang="css">
</style>
