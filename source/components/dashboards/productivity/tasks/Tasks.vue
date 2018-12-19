<template lang="html">
    <div id="tasks" >
        <section class="taskapp">
            <header class="header">
                <input class="new-task" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo">
            </header>
            <section class="main" v-show="tasks.length" v-cloak>
                <ul class="task-list">
                    <li v-for="(task, i) in filteredTodos" class="task" :key=" 'task' + i" :class="{ completed: task.completed, editing: task === editedTodo }" >
                        <div class="view">
                            <label @dblclick="editTodo(task)"> {{ task.title }} </label>
                            <i class="fa fa-check" aria-hidden="true" :class="{ 'fa-check-done': task.completed }" @click="toggleCompleted(task), $api.update( 'task', task )"></i>
                            <i class="fa fa-times" aria-hidden="true" @click="removeTodo(task)"></i>
                        </div>
                        <input class="edit" type="text" v-model="title" v-task-focus="task == editedTodo" @blur="doneEdit(task)" @keyup.enter="doneEdit(task)" @keyup.esc="cancelEdit(task)">
                    </li>
                </ul>
            </section>
            <footer class="footer" >
                <span class="task-count"> <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left</span>
                <ul class="filters">
                    <li :class="{ selected: visibility == 'all' }" @click="visibility = 'all'">All</li>
                    <li :class="{ selected: visibility == 'active' }" @click="visibility = 'active'">Active</li>
                    <li :class="{ selected: visibility == 'completed' }" @click="visibility = 'completed'">Completed</li>
                </ul>
                <button class="clear-completed" @click="removeCompleted()" v-show="filteredTodos.length > remaining" v-cloak>Clear completed</button>
            </footer>
        </section>
    </div>
</template>

<script>

var filters = {
    all: function( tasks ) {
        return tasks
    },
    active: function( tasks ) {
        return tasks.filter( task => {
            return !task.completed
        })
    },
    completed: function ( tasks ) {
        return tasks.filter( task => {
            return task.completed
        })
    }
}

import { mapGetters } from 'vuex'

export default {
    name: 'tasks',
    page: 'tasks',
    data() {
        return {
            newTodo: '',
            editedTodo: null,
            visibility: 'active',
            title: ''
        }
    },
    computed: {
        loggedTodos: function() {
            return this.tasks.filter( task => {
                return task.user_id === this.logged._id
            })
        },
        filteredTodos: function() {
            let f = filters[this.visibility]( this.loggedTodos )
            return f.sort((a, b) => a.title.localeCompare(b.title))
        },
        remaining: function() {
            return filters.active( this.filteredTodos ).length
        },
        ...mapGetters([ 'tasks', 'logged' ])
    },
    filters: {
        pluralize: function( n ) {
            return n === 1 ? 'item' : 'items'
        }
    },
    methods: {
        addTodo: function() {
            const value = this.newTodo && this.newTodo.trim()
            const task = {
                title: value,
                completed: false,
                user_id: this.logged._id
            }
            const valid = this.$api.save( 'task', task )
            if( valid === undefined ) {
                this.newTodo = ''
            }
        },
        removeTodo: function( task ) {
            this.$api.del( 'task', task )
        },
        editTodo: function( task ) {
            this.beforeEditCache = task.title
            this.title = task.title
            this.editedTodo = task
        },
        doneEdit: function( task ) {
            if( !this.editedTodo ) return
            this.editedTodo = null

            task.title = this.title.trim()
            if( !task.title ) this.removeTodo( task._id )
            if ( this.beforeEditCache === this.title ) return
            else  {
                const valid = this.$api.update( 'task', task )

                if ( !valid && valid !== undefined ) {
                    task.title = this.beforeEditCache
                }
            }
        },
        cancelEdit: function( task ) {
            this.editedTodo = null
            task.title = this.beforeEditCache
        },
        removeCompleted: function() {
            this.tasks = filters.active( this.tasks )
        },
        toggleCompleted(task) {
            if(this.logged.sec_lv < 9) task.completed = !task.completed
        }
    },
    directives: {
        'task-focus': function( el, binding ) {
            if( binding.value ) el.focus()
        }
    },
}
</script>

<style lang="scss">
.taskapp {
    .new-task{
        padding: 1rem ;
        border: none;
        background: rgba(0, 0, 0, 0.04);
        width: 100%;
        color: #eee;
        font-size: 24px;
    }

    .main {
        position: relative;
        z-index: 2;
        border:none;
        padding-left: 25px;
        margin-top: 15px;

        .task-list {
            margin: 0;
            padding: 0;
            list-style: none;
            .task {
                padding-left: 0px;
                position: relative;
                font-size: 24px;
                border-bottom: none;
                padding: .5rem;
                
                .toggle {
                    text-align: center;
                    width: 40px;
                    height: auto;
                    margin: auto 0;
                    border: none;
                }
                .view {
                    label {
                        margin: .5rem;
                    }
                    .fa {
                        font-size: 20px !important;
                        color:#3e3261 !important;
                        &:hover {
                            color: #ccc !important;
                        }
                    }
                    .fa-check-done {
                        color: #eee;
                    }
                }
                .edit {
                    display: none;
                }
            }
            .completed {
                label {
                    text-decoration: line-through;
                    color: #777;
                }
            }
            .editing {
                .view {
                    display: none;
                }
                .edit {
                    display: block;
                    width: 90%;
                    padding: 8px 8px 8px 8px;
                    margin: 0 0 0 0px !important;
                    background: transparent;
                    color: #eee;
                    border:none;
                    letter-spacing: 1px;
                }
            }
        }
    }
    .footer {
        color: #777;
        padding: 10px 15px;
        height: 20px;
        text-align: center;
        background: transparent;
        .task-count {
            float: left;
            text-align: left;
        }
        .filters {
            margin: 0;
            padding: 0;
            list-style: none;
            position: absolute;
            right: 0;
            left: 0;
            li {
                display: inline;
                color: inherit;
                margin: 3px;
                padding: 3px 7px;
                text-decoration: none;
                border: 1px solid transparent;
                border-radius: 3px;
                cursor: pointer;
            }
            .selected {
                border-color: #1ec2ff;
            }
        }
        button {
            float: right;
            position: relative;
            line-height: 20px;
            text-decoration: none;
            cursor: pointer;
            margin: 0;
            padding: 0;
            border: 0;
            background: none;
            font-size: 100%;
            vertical-align: baseline;
            font-family: inherit;
            font-weight: inherit;
            color: inherit;
            -webkit-appearance: none;
            appearance: none;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    }
}
</style>
