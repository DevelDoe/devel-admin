<template lang="html">
    <div id="gform" >

        <!-- deleteModal -->
        <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModallLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteModallLabel">Delete</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                    </div>
                    <div class="modal-body text-center">
                        <form class="form-signin" id="loginForm" onsubmit="return false;">
                            <h1>Warnign</h1>
                            <p>Are you shure you want to delete {{schema}}!
                            This action can not be undone!</p>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-lg btn-danger btn-block" type="submit" form="loginForm" @click="remove(data)" >DELETE</button>
                    </div>
                </div>
            </div>
        </div>


        <div class="row parent">
            <div class="col child">

                <form id="userForm" class="needs-validation" :class="{ 'needs-validation': !valid }" novalidate onsubmit="return false;">
                    <span  v-for="(item, i) in fields" :key="i">

                        <div class="form-group" v-if="item.inputType === 'date' && data.published">
                            <label>{{item.label}}</label>
                            <datepicker :placeholder="`enter a ${item.label} here`" v-model="data[item.name]"></datepicker>
                        </div>

                        <div class="form-group" v-if="item.inputType === 'text'">
                            <label>{{item.label}}</label>
                            <input type="text" class="form-control" :id="item.name"  :placeholder="`enter a ${item.label} here`" v-model="data[item.name]" @keydown="$forceUpdate()">
                        </div>

                        <div class="form-group" v-if="item.inputType === 'password'">
                            <label>{{item.label}}</label>
                            <input type="password" class="form-control" :id="item.name"  :placeholder="`enter a ${item.label} here`" v-model="data[item.name]">
                        </div>

                        <div class="form-group" v-if="item.inputType === 'email'">
                            <label>{{item.label}}</label>
                            <input type="email" class="form-control" :id="item.name" :placeholder="`enter a ${item.label} here`" v-model="data[item.name]"  >
                        </div>

                        <div class="form-group" v-if="item.inputType === 'textarea'">
                            <label>{{item.label}}</label>
                            <textarea class="form-control" :id="item.name" :placeholder="`enter a ${item.label} here`" v-model="data[item.name]" @keydown="$forceUpdate()" ></textarea>
                        </div>

                        <div class="form-group" v-if="item.inputType === 'select' ">
                            <label>{{item.label}}</label>
                            <select class="form-control"  v-model="data[item.name]" @blur="$forceUpdate()">
                                <option disabled value="">{{item.label}}</option>
                                <option v-for="(key, i) in select[item.name]" :value="key" >{{key}}</option>
                            </select>
                        </div>

                        <div class="form-group" v-if="item.inputType === 'array'">
                            <label>{{item.label}}</label>
                            <input type="text" class="form-control" :id="item.name" :placeholder="`enter a ${item.label} here`" v-model="data[item.name]" @blur="split(item.name)" @keyup.enter="split(item.name)">
                        </div>

                        <div class="form-group" v-if="item.inputType === 'sec_lv' && ( data._id !== logged._id && logged.sec_lv < data.sec_lv ) || (item.inputType === 'sec_lv' && data.sec_lv === '') ">
                            <label>{{item.label}}</label>
                            <select class="form-control"  v-model="data.sec_lv">
                                <option v-for="(key, i) in Object.keys(accelSecLv)" :value="accelSecLv[key]" >{{key}}</option>
                            </select>
                        </div>

                        <!-- image -->
                        <uploadImages v-if="item.inputType === 'images'" :images="data.images"/>
                        <uploadImage v-if="item.inputType === 'image'" :image="data.img_src"/>
                        <uploadAvatar v-if="item.inputType === 'avatar'" :image="data.img_src"/>

                        <div class="form-group" v-if="item.inputType === 'adder'">
                            <label>{{item.label}}</label><br>
                            <div class="row" v-for="(step, index) in data[item.name]" :key="'item'+ index">
                                <div class="col-md-10" >
                                    <input type="text" class="form-control" :placeholder="`enter a ${item.label} here`" v-model="step.step" >
                                </div>
                                <div class="col-md-2">
                                    <button class="btn btn-primary" @click="data[item.name].splice(index, 1); $forceUpdate()" >&#xd7;</button>
                                </div>
                            </div>
                            
                            <button class="btn btn-primary" @click="data[item.name].push({step: ''}); $forceUpdate()">add step</button>
                        </div>


                    </span>
                </form>

            </div>

            <!-- BLOG -->
            <div class="col-lg-6" id="blogPreview" v-if="schema === 'post'">
                <div class="child" id="blogPreviewChild">
                    <header id="header">
                        <h1>{{ data.category}} - {{ data.title }}</h1>
                    </header>
                    <div id="summary">
                        <small>{{ data.summary }}</small>
                    </div>
                    <div id="blogPreviewBody" >
                        <p v-html="$markdown.render(data.body)"></p>
                    </div>
                </div>
            </div>

            <!-- USER -->
            <div class="col-4 toggleFeatures" v-if="schema === 'user' && logged.sec_lv <= 4" >
                <div class="row padding" v-if="logged.sec_lv <= 4 || logged.sec_lv == 9"> 
                    <div class="col">
                        <h3>Applications</h3>
                        <span v-for="(app, i) in apps">
                            <button type="button" class="btn btn-dark" :class="{ 'active': data.applications.indexOf(app) !== -1 } " @click="toggleApplication(app)"  style="margin-bottom:10px;">{{app}}</button>
                        </span>
                    </div>
                </div>
                <div class="row padding" v-if="logged.sec_lv <= 2 || logged.sec_lv == 9">
                    <div class="col">
                        <h3>Administration</h3>
                        <span v-for="(admin, i) in admins">
                            <button type="button" class="btn btn-dark" :class="{ 'active': data.administrations.indexOf(admin) !== -1 } " @click="toggleAdministrations(admin)" style="margin-bottom:10px;">{{admin}}</button>
                        </span>
                    </div>
                </div>
                <div class="row padding" v-if="logged.sec_lv <= 2 || logged.sec_lv == 9">
                    <div class="col">
                        <h3>Support</h3>
                        <span v-for="(support, i) in supports">
                            <button type="button" class="btn btn-dark" :class="{ 'active': data.supports.indexOf(support) !== -1 } " @click="toggleSupports(support)" style="margin-bottom:10px;">{{support}}</button>
                        </span>
                    </div>
                </div>
                <div class="row padding" v-if="logged.sec_lv <= 2 || logged.sec_lv == 9">
                    <div class="col">
                        <h3>Forum</h3>
                        <span v-for="(room, i) in forums">
                            <button type="button" class="btn btn-dark" :class="{ 'active': data.forums && data.forums.indexOf(room) !== -1 }" @click="toggleForums(room)" style="margin-bottom:10px;">{{room}}</button>
                        </span>
                    </div>
                </div>
            </div>

        </div>


        <div class="row controls" v-if="data._id">
            <div class="btn-group">
                
                <span v-for="(item, i) in fields" :key="'btn'+i">
                    <button v-if="item.inputType === 'button'" class="btn btn-ctrl" :class="{ 'active': data[item.name] }"  @click="data[item.name] = !data[item.name], $forceUpdate()" >{{item.label}}</button>
                </span>
                
                <button type="button" class="btn btn" @click="update()">Save</button>
                <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal">Delete</button>
            </div>
        </div>
        <div class="row controls" v-else>
            <div class="btn-group">
                <span v-for="(item, i) in fields" :key="'btn'+i">
                    <button v-if="item.inputType === 'button'" class="btn btn-ctrl" :class="{ 'active': data[item.name] }"  @click="data[item.name] = !data[item.name], $forceUpdate()" >{{item.label}}</button>
                </span>
                <button v-if="valid" type="button" class="btn" @click="save()">Save</button>
                <button v-else type="button" class="btn"  disabled>Save</button>
            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
import Datepicker from 'vuejs-datepicker'
import uploadImages from './form/uploadImages.vue'
import uploadImage from './form/uploadImage.vue'
import uploadAvatar from './form/uploadAvatar.vue'
export default {
    name: 'gForm',
    props: [ 'schema', 'data', 'select'],
    data() {
        return {
            valid: true,
            newPassword:'',
            sec_lvs:  { root: 0, admin: 1, owner: 2, operator: 3, super: 4, user: 5, pleab: 6, anonymous: 7, special: 8, guest: 9 },
            apps: [ 'tasks', 'notes', 'posts', 'images', 'workouts', 'settings', 'overview', 'exercises' ],
            admins: [ 'users', 'data' ],
            supports: [ 'tickets' ],
            forums: [ 'general' ]
        }
    },
    computed: {
        ...mapGetters([ 'logged' ]),
        fields() {
            let res = this.$store.getters.resources.find( resource => resource.name === this.schema )
            return res.fields
        },
        accelSecLv() {
            const loggedLevel = this.logged.sec_lv
            if(loggedLevel === '0') return this.sec_lvs
            let acces = {}
            for(var prop in this.sec_lvs) {
                if(this.sec_lvs[prop] >= loggedLevel){
                    acces[prop] = this.sec_lvs[prop]
                }
            }
            return acces
        }
    },
    methods: {
        toggleApplication( app ) {
            if(this.logged.sec_lv <= 1) {
                if(this.data.applications.indexOf( app ) !== -1) this.data.applications.splice(this.data.applications.indexOf( app ), 1)
                else this.data.applications.push( app )
                this.$forceUpdate()
            } else {
                this.$bus.$emit('toast', 'no write permissions, please contact administrator.')
                setTimeout( () => { this.$bus.$emit('toast', '' ) }, 8000 )
            }
        },
        toggleAdministrations( admin ) {
            if(this.logged.sec_lv <= 1) {
                if(this.data.administrations.indexOf( admin ) !== -1) this.data.administrations.splice(this.data.administrations.indexOf( admin ), 1)
                else this.data.administrations.push( admin )
                this.$forceUpdate()
            } else {
                this.$bus.$emit('toast', 'no write permissions, please contact administrator.')
                setTimeout( () => { this.$bus.$emit('toast', '' ) }, 8000 )
            }
        },
        toggleSupports( support ) {
            if(this.logged.sec_lv <= 1) {
                if(this.data.supports.indexOf( support ) !== -1) this.data.supports.splice(this.data.supports.indexOf( support ), 1)
                else this.data.supports.push( support )
                this.$forceUpdate()
            } else {
                this.$bus.$emit('toast', 'no write permissions, please contact administrator.')
                setTimeout( () => { this.$bus.$emit('toast', '' ) }, 8000 )
            }
        },
        toggleForums( room ) {
            if( !this.data.forums ) this.data.forums = []
            if(this.logged.sec_lv <= 1) {
                if(this.data.forums.indexOf( room ) !== -1) this.data.forums.splice(this.data.forums.indexOf( room ), 1)
                else this.data.forums.push( room )
                this.$forceUpdate()
            } else {
                this.$bus.$emit('toast', 'no write permissions, please contact administrator.')
                setTimeout( () => { this.$bus.$emit('toast', '' ) }, 8000 )
            }
        },
        update() {
            if(this.logged.sec_lv != 9) {
                if( this.logged._id === this.data._id ) {
                    this.$store.dispatch('delLogged')
                    this.$store.dispatch('setLogged', this.data)
                }
                const valid = this.$api.update( this.schema, this.data )
                if( valid === undefined ) {
                    this.$router.push(`${this.schema}s`)
                } else {
                    this.valid = false
                }
            } else {
                this.$bus.$emit('toast', 'no write permissions, your on a guest account.')
                setTimeout( () => { this.$bus.$emit('toast', '' ) }, 8000 )
            }
        },
        remove: function() {
            if(this.logged.sec_lv != 9) {
                if( this.data.deleted === false ) {
                    this.data.deleted = true
                    this.$store.dispatch('delTicket', this.data._id)
                    this.update()
                } else {
                    this.$api.del( this.schema, this.data )
                }
                $('#deleteModal').modal('hide')
                this.$router.push(`${this.schema}s`)
            } else {
                this.$bus.$emit('toast', 'no write permissions, your on a guest account.')
                setTimeout( () => { this.$bus.$emit('toast', '' ) }, 8000 )
                $('#deleteModal').modal('hide')
            }
        },
        save: function () {
            if(this.logged.sec_lv != 9) {
                const valid = this.$api.save( this.schema, this.data )
                console.log(valid)
                if( valid === undefined ) {
                    this.$router.push(`${this.schema}s`)
                } else {
                    this.valid = false
                }
            } else {
                this.$bus.$emit('toast', 'no write permissions, your on a guest account.')
                setTimeout( () => { this.$bus.$emit('toast', '' ) }, 8000 )
            }
        },
        filesChange(fieldName, fileList) {
            const formData = new FormData()
            if (!fileList.length) return
            Array.from(Array(fileList.length).keys()).map(x => {
                formData.append(fieldName, fileList[x], fileList[x].name)
            })
            this.upload(formData)
        },
        split(itemName) {
            this.data[itemName] = this.data[itemName].split(',')
        }
    },
    created() {
        this.$bus.$on('addImages', payload => { this.data.images.push(payload) })
        this.$bus.$on('delImages', payload => { this.data.images.splice(payload, 1) })
        this.$bus.$on('addImage', payload => { this.data.img_src = payload })
        this.$bus.$on('delImage', () => { this.data.img_src = '' })
        this.$bus.$on('invalid', () => { this.valid = false })
        this.$bus.$on('valid', () => { this.valid = true })
    },
    updated() {
        if(document.getElementById("blogPreviewChild")) {
            var body = document.getElementById("blogPreviewChild")
            body.scrollTop = body.scrollHeight 
        }
    },
    components: {
        Datepicker,
        uploadImages,
        uploadImage,
        uploadAvatar,
    }
}
</script>

<style lang="scss">
#gform {
    position: relative;
    padding-bottom: 50px;

    .form-group {
        padding: 20px;

        .form-control {
            color: #ccc;
            background-color: rgba(255, 255, 255, 0.01);
            border: none;
            padding: 20px;
            border-radius: 0;
        }
        select {
            padding: 17px !important;
            height: 59px;
        }
        label {
            font-weight: 300;
        }
        option {
            color:  #252830;
            font-weight:bold;
            padding:5px
        }
        ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
            text-transform: lowercase;
        }
        ::-moz-placeholder { /* Firefox 19+ */
        text-transform: lowercase;
        }
        :-ms-input-placeholder { /* IE 10+ */
            text-transform: lowercase;
        }
        :-moz-placeholder { /* Firefox 18- */
            text-transform: lowercase;
        }
        #summary {
            height: 66px;
            padding: 20px;
        }
        #body {
            height: 450px;
        }
    }
    
    .toggleFeatures {
        button {
            margin-left: 10px;
        }
    }
    .dropbox {
        outline: 2px dashed grey; /* the dash box */
        outline-offset: -10px;
        color: #ccc;
        min-height: 150px;
        position: relative;
        cursor: pointer;

        &:hover {
            background: #5c6577; /* when mouse over to the drop zone, change color */
        }

        p {
            font-size: 1.2em;
            text-align: center;
            padding: 54px 0;
        }
    }
    .dropbox-success {
        color: #96d696;
        a {
            z-index: 9999;
        }
        img {
            max-width: 50px;
            float: left;
            margin-right: 10px;
            margin-bottom: 10px;
        }
    }
    .dropbox-fail {
        color: #965252;
    }
    .input-file {
        opacity: 0; /* invisible but it's there! */
        width: 100%;
        height: 150px;
        position: absolute;
        cursor: pointer;
    }
    .uploading {
        font-size: 1.2em;
        text-align: center;
        padding: 54px 100px;
        color: #777;
        -moz-animation-duration: 400ms;
        -moz-animation-name: blink;
        -moz-animation-iteration-count: infinite;
        -moz-animation-direction: alternate;

        -webkit-animation-duration: 400ms;
        -webkit-animation-name: blink;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-direction: alternate;

        animation-duration: 400ms;
        animation-name: blink;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }

    

    @-moz-keyframes blink {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }

    @-webkit-keyframes blink {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }

    @keyframes blink {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }

    .vdp-datepicker  {
        width: 100%;
        background-color: rgba(255, 255, 255, 0.01);
         color: #eee;
        input {
            width: 100%;
            padding: 15px;
            color: #eee;
            background-color: rgba(255, 255, 255, 0.01);
            border: none;
        }
        .vdp-datepicker__calendar {
            position: absolute;
            top: -400%;
            left: 10%;
            width: 100%;
            z-index: 100;
            background-color: rgb(39, 45, 72);
            width: 80%;
            border: none;
        }
    }
    #blogPreview {
        padding-top: 0;
        min-height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;

        .child {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: -17px; /* Increase/Decrease this value for cross-browser compatibility */
            overflow-y: scroll;

            header {
                margin-bottom: 10px;
            }
            #summary {
                margin-bottom: 10px;
                font-style: italic;
            }
            #blogPreviewBody {
                padding-right: 40px;
            }
        }
    }
}
</style>
