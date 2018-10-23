<template lang="html">
    <div id="note" class="admin">
        <section class="todoapp">
            <header class="header">
                <input class="new-note" autofocus autocomplete="off" placeholder="Keep a note of this" v-model="newNote" @keyup.enter="addNote">
            </header>
            <section class="main" v-show="notes.length" v-cloak>
                <ul class="todo-list">
                    <li v-for="(note, i) in loggedNotes" class="note todo" :key=" 'note' + i" :class="{  editing: note === editedNote }" >
                        <div class="view">
                            <label @dblclick="editNote(note)"> {{ note.title }} </label>
                            <i class="fa fa-tachometer" aria-hidden="true" :class="{ 'fa-done': note.overview }" @click="note.overview = !note.overview, $api.update( 'note', note )"></i>
                            <i class="fa fa-times" aria-hidden="true" @click="removeNote(note)"></i>
                        </div>
                        <input class="edit" type="text" v-model="note.title" v-todo-focus="note == editedNote" @blur="doneEdit(note)" @keyup.enter="doneEdit(note)" @keyup.esc="cancelEdit(note)">
                    </li>
                </ul>
            </section>
        </section>
        </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    name: 'note',
    data() {
        return {
            newNote: '',
            editedNote: null,
        }
    },
    computed: {
        loggedNotes: function() {
            return this.notes.filter( note => {
                return note.user_id === this.logged._id
            })
        },
        ...mapGetters([ 'notes', 'logged' ])
    },
    methods: {
        addNote: function() {
            const value = this.newNote && this.newNote.trim()
            const note = {
                title: value,
                overview: false,
                user_id: this.logged._id
            }
            const valid = this.$api.save( 'note', note )
            if( valid === undefined ) {
                this.newNote = ''
            }
        },
        removeNote: function( note ) {
            this.$api.del( 'note', note )
        },
        editNote: function( note ) {
            this.beforeEditCache = note.title
            this.editedNote = note
        },
        doneEdit: function( note ) {
            if( !this.editedNote ) return
            this.editedNote = null

            note.title = note.title.trim()
            if( !note.title ) this.removeNote( note._id )
            if ( this.beforeEditCache === note.title ) return
            else  {
                const valid = this.$api.update( 'note', note )

                if ( !valid && valid !== undefined ) {
                    note.title = this.beforeEditCache
                }
            }
        },
        cancelEdit: function() {
            this.editedNote = null,
            note.title = this.beforeEditCache
        }
    },
    directives: {
        'todo-focus': function( el, binding ) {
            if( binding.value ) el.focus()
        }
    },
    mounted() {
        this.$store.dispatch( 'setLocation', 'notes' )
    },
    destroyed() {
        this.$store.dispatch( 'setLocation', '' )
    }
}
</script>

<style lang="scss">
#note {
    .todoapp {
        .new-note{
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
            .toggle-all:before {
                content: '❯';
                font-size: 22px;
                color: #e6e6e6;
                padding: 10px 27px 10px 27px;
            }
            .toggle-all {
                position: absolute;
                top: -55px;
                left: -12px;
                width: 60px;
                height: 34px;
                text-align: center;
                border: none;
                -webkit-transform: rotate(90deg);
                transform: rotate(90deg);
                -webkit-appearance: none;
                appearance: none;
            }
            .toggle-all, .todo-list li .toggle {
                background: none;
            }
            .todo-list {
                margin: 0;
                padding: 0;
                list-style: none;
                .note {
                    padding-left: 10px;
                    position: relative;
                    font-size: 20px;
                    border-bottom: none;

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
                            font-size: 17px;
                            color: #333;
                            &:hover {
                                color: #ccc;
                            }
                        }
                        .fa-done {
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
                        width: 506px;
                        padding: 8px 8px;
                        padding: 8px 8px 8px 8px;
                        background: transparent;
                        color: #eee;
                        border:none;
                        letter-spacing: 1px;
                    }
                }
            }
        }
    }
}

</style>
