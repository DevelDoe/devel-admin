<template lang="html">
    <div id="gSearch" v-show="showSearch" v-cloak scroll="no" style="overflow: hidden">
        <div class="search">
            <input type="search"  value="" placeholder="Search" class="search-input" ref='search' autofocus v-model="search" @keydown.esc="$store.dispatch('toggleSearch'), search = ''">
        </div>
        <transition name="fade" mode="out-in" >
        <div class="results" v-show="search">
            <div v-for="(obj, i) in filterData" class="result">
                <span v-if="obj._id">
                    <a :href=" '#' + obj.path.substr(0, obj.path.length-1) + '?id=' + obj._id" @click="$store.dispatch('toggleSearch'), search = ''">
                        <span v-if="obj.field.length > 40">
                            {{ obj.field.substring(0, 40) + '...' }}
                        </span>
                        <span v-else>
                            {{ obj.field}}
                        </span>
                    </a>
                </span>
                <span v-else>
                    <a :href="'#'+obj.path" @click="$store.dispatch('toggleSearch'), search = ''">
                        <span v-if="obj.field.length > 40">
                            {{ obj.field.substring(0, 40) + '...' }}
                        </span>
                        <span v-else>
                            {{ obj.field}}
                        </span>
                    </a>
                </span>
            </div>
            <div class="noResults" v-show="filterData.length == 0">
                No results...
            </div>
        </div>
        </transition>
        <i class="fa fa-times" aria-hidden="true" @click="$store.dispatch('toggleSearch'), search = ''"></i>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import routes from '../../util/routes'
export default {
    name: 'gSearch',
    data() {
        return {
            searching: false,
            search: '',
            keys: {37: 1, 38: 1, 39: 1, 40: 1}
        }
    },
    computed: {
        ...mapGetters( [ 'logged', 'showSearch' ]),
        data() {
            var resources = this.$store.getters.resources
            var list = []

            // for every resource
            resources.forEach( resource => {
                
                // get the dataset e.g dataset => user = [{ name: 'bla', username: 'vla' }, { name: 'bla', username: 'vla' }]
                var dataset = this.$store.getters[`${resource.name}s`]

                // get the route to this resource
                var route = routes.find( route => { return route.name === `${resource.name}s` })

                
                // for every object in dataset 
                dataset.forEach( obj => {
                    
                    // for every field in this resource => { "_id": "5bcbc3c4c9458972099f6783", "name": "note", "read": 9, "write": 9, "__v": 5, "details": false,  "fields": [ { "name": "title", "inputType": "text", "dbType": "String", "unique": true, "required": true, "label": "Title", "search": true }, { "name": "user_id", "inputType": "none", "dbType": "String", "unique": false, "required": true }, { "name": "overview", "inputTypes": "", "dbTypes": "", "unique": false, "required": true, "inputType": "checkbox", "dbType": "Boolean", "label": "Overview" } ]}
                    resource.fields.forEach(field => {
                        
                        // if this field is searchable
                        if(field.search) {

                            var newObj = {}

                            // parse every key in this field
                            for(var key in obj) {
                                // is the field the searchable field
                                if(key === field.name ) {
                                    // is there an user associated to this field, is so check if its the current user and add only those
                                    // Check if the logged sec_lv is lower than the sec_lv of a user
                                    if( ( (obj.user_id && obj.user_id === this.logged._id) || !obj.user_id ) && ( obj.sec_lv && this.logged.administrations.indexOf('users') !== -1 && this.logged.sec_lv <= obj.sec_lv || !obj.sec_lv ) ) {
                                        newObj['field'] = obj[key]
                                    } else {
                                        newObj['field'] = ''
                                    }
                                }
                                // is this the key id and has this resource a details page?
                                if(key === '_id' && resource.details) {
                                    newObj[key] = obj[key]
                                }
                                newObj['path'] = route.path
                            }

                            if(newObj.field) list.push(newObj)

                        }
                    })

                })
            })

            return list
        },
        filterData() {
            return this.data.filter( key => {
                return key.field.toLowerCase().indexOf( this.search.toLowerCase().trim() ) > -1
            })
        },
    },
    methods: {
        preventDefault(e) {
            e = e || window.event
            if (e.preventDefault) e.preventDefault()
            e.returnValue = false  
        },

        preventDefaultForScrollKeys(e) {
            if (this.keys[e.keyCode]) {
                this.preventDefault(e)
                return false
            }
        },

        disableScroll() {
            if (window.addEventListener) window.addEventListener('DOMMouseScroll', this.preventDefault, false) // older FF
            window.onwheel = this.preventDefault // modern standard
            window.onmousewheel = document.onmousewheel = this.preventDefault // older browsers, IE
            window.ontouchmove  = this.preventDefault // mobile
            document.onkeydown  = this.preventDefaultForScrollKeys
        },
        
        enableScroll() {
            if (window.removeEventListener) window.removeEventListener('DOMMouseScroll', this.preventDefault, false)
            window.onmousewheel = document.onmousewheel = null
            window.onwheel = null
            window.ontouchmove = null
            document.onkeydown = null
        }
    },
    updated() {
        if(this.showSearch)  this.$nextTick(() => this.$refs.search.focus())
        if(this.showSearch) this.disableScroll()
        else this.enableScroll()
        document.getElementById('gSearch').style.height = window.innerHeight  + "px"
    },
}
</script>

<style lang="scss">
#gSearch {
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, .9) 100%, transparent);
    z-index: 9998;
    width: 100%;
    overflow: hidden;

    .search {
        position: relative;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        margin-top: 5%;
        margin-left: 10%;

        .search-input {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            font-size: 6rem;
            background: none;
            color: #ccc;
            box-shadow: none !important;
            border: 0;
            padding: 0;
            font-weight: 800;
        }
    }
    .results {
        color: #ccc;
        padding: 1% 17%;
        height: 100%;
        width: 100%;
        overflow: hidden;

        .result {
            font-size:24px;
            margin: 10px;
            a{
                color: #ccc;
                cursor: pointer;
                &:hover {
                    color:#eee;
                }
            }
        }
    }

    .fa {
        color: #666;
        cursor: pointer;
        font-size: 30px;
        &:hover {
            color: #ccc;
        }
    }

    .fa-times {
        position: absolute;
        top: 14px;
        right: 35px;
        z-index: 9999;
    }
}
</style>
