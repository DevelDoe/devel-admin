<template lang="html">
    <div id="data" class="admin">

        <!-- resourceModal -->
        <div class="modal fade" id="resourceModal" tabindex="-1" role="dialog" aria-labelledby="resourcModallLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="resourcModalLabel">Add new resource</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                    </div>
                    <div class="modal-body">

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="resource">Name</label>
                                    <input type="text" class="form-control" id="resource" placeholder="Resource name" autocomplete="off" v-model="newResource.name">
                                    <small id="nameHelp" class="form-text text-muted">Enter the name of the resource you want to add.</small>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="uniqueCheck" v-model="newResource.details">
                                    <label class="form-check-label" for="requiredCheck">Details</label>
                                </div>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col">
                                <label for="readeSelect">Read</label>
                                <select class="form-control" id="readeSelect" v-model="newResource.read">
                                    <option value="" selected class="selectPlaceholder">level</option>
                                    <option v-for="lv in levels" :value="lv" >{{lv}}</option>
                                </select>

                            </div>
                            <div class="col">
                                <label for="readeSelect">Write</label>
                                <select class="form-control" id="readeSelect" v-model="newResource.write">
                                    <option value="" selected class="selectPlaceholder">level</option>
                                    <option v-for="lv in levels" :value="lv" >{{lv}}</option>
                                </select>
                            </div>
                        </div>
                        <div v-for="(field, i) in newResource.fields" class="fields" >

                            <div class="form-row align-items-center">

                                    <div class="form-group">
                                        <input type="text" class="form-control" id="fieldName" placeholder="Field name" autocomplete="off" v-model="field.name">
                                    </div>


                                    <div class="form-group">
                                        <select v-model="field.dbType" class="form-control" id="typeSelect">
                                            <option value="" selected class="selectPlaceholder">DBType</option>
                                            <option v-for="dbType in dbTypes" :value="dbType" >{{dbType}}</option>
                                        </select>
                                    </div>



                                    <div class="form-group">
                                        <input type="text" class="form-control" id="label" placeholder="label" autocomplete="off" v-model="field.label">
                                    </div>


                                    <div class="form-group">
                                        <select v-model="field.inputType" class="form-control" id="typeSelect">
                                            <option value="" selected class="selectPlaceholder">Type</option>
                                            <option v-for="inputType in inputTypes" :value="inputType" >{{inputType}}</option>
                                        </select>
                                    </div>


                            </div>

                            <div class="form-row align-items-left checkboxes">

                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="requiredCheck" v-model="field.required">
                                        <label class="form-check-label" for="requiredCheck">Required </label>
                                    </div>

                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="uniqueCheck" v-model="field.unique">
                                        <label class="form-check-label" for="requiredCheck">Unique</label>
                                    </div>

                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="uniqueCheck" v-model="field.search">
                                        <label class="form-check-label" for="requiredCheck">Search</label>
                                    </div>


                                    <i class="fa fa-trash-o" aria-hidden="true" @click="resource.fields.splice( i , 1)"></i>

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-lg  btn-block" @click="addField" >add field</button>
                        <button class="btn btn-lg btn-primary" @click="saveResource" data-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-7">
                <h4 class="mb-3">General settings</h4>
               
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="row">
                    <div class="col">
                        <h4 class="mb-3">Data Schema Types</h4>
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <Resources v-for="(resource, i) in resources" :key="'resource'+i" :resource="resource" :inputTypes="inputTypes" :levels="levels" :dbTypes="dbTypes"/>
                    </div>
                </div>
                
                <div class="row controls">
                    <div class="btn-group">
                        <button type="button" class="btn" data-toggle="modal" data-target="#resourceModal" >Add Resource</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Resources from './_Resources.vue'
export default {
    name: 'data-',
    page: 'data',
    data() {
        return {
            newResource : {
                name : '',
                details: false,
                fields: [],
            },
            inputTypes: [ 'none', 'text', 'textarea', 'select', 'checkbox', 'password', 'email', 'sec_lv', 'button', 'array', 'date', 'image', 'images', 'avatar', 'adder' ],
            dbTypes: [ 'String', 'Boolean', 'Number', 'Date', 'Buffer', 'Mixed', 'ObjectId', 'Array', 'Decimal128', 'Map' ],
            levels: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
        }
    },
    computed: {
        ...mapGetters([ 'appName', 'resources' ])
    },
    methods: {
        addField( field ) {
            this.newResource.fields.push({
                name: '',
                inputType: '',
                dbType: '',
                unique: false,
                required: false
            })
        },
        saveResource() {
            this.$api.save( 'resource', this.newResource )
            this.newResource.name = '',
            this.newResource.fields = []
        }
    },
    components: {
        Resources
    }
}
</script>

<style lang="scss">
#data {
    .modal {
        color: #666;

        .form-row {
            margin: 1rem 0;
        }

        .form-group {
            margin-right: 1rem;
        }

        .form-check {
            position: relative;
            display: block;
            padding-left: 1.6rem;
        }

        .fa-trash-o {
            font-size: 24px;
            margin-bottom: 10px;
            padding-left: 5px;
            color: #ccc;
            &:hover {
                color: #777;
            }
        }

    }
    .card {
        background-color: #ffffff05;
        position: relative;
        border: none;

        .btn {
            width: 100%;
            text-decoration: none;
            text-align: left;
            text-transform: uppercase;
            color: #777;
        }
        .fa-trash-o {
            position: absolute;
            top: 17px;
            right: 27px;
            font-size: 28px;
            color: #777;
            &:hover {
                color: #fff;
            }
        }
        .card-body {
            .controls {
                margin-top: 1rem;

                .btn {
                    width: auto;
                    text-decoration: none;
                    text-align: left;
                    text-transform: none;
                    color: #292d35;
                }
            }

        }
    }
}
</style>
