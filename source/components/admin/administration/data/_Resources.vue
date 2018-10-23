<template lang="html">
    <div id="_resources" class="section">

        <!-- deleteModal -->
        <div class="modal fade" :id="'deleteModal' +  resource._id" tabindex="-1" role="dialog" aria-labelledby="deleteModallLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteModallLabel">Delete Data</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                    </div>
                    <div class="modal-body text-center">
                        <form class="form-signin" id="loginForm" onsubmit="return false;">
                            <h1>Warnign</h1>
                            <p>Are you shure you want to delete {{resource.name}}! This action can not be undone!

                            </p>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-lg btn-danger btn-block" type="submit" form="loginForm" @click="delResource(resource)" >DELETE</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- updateModal -->
        <div class="modal fade" :id="'updateModal' + resource._id" tabindex="-1" role="dialog" aria-labelledby="updateModallLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="updateModallLabel">Update {{ resource.name }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                    </div>
                    <div class="modal-body">

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="resource">Name</label>
                                    <input type="text" class="form-control" id="resource" placeholder="Resource name" autocomplete="off" v-model="resource.name">
                                    <small id="nameHelp" class="form-text text-muted">Update resource name.</small>
                                </div>
                            </div>

                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="uniqueCheck" v-model="resource.details">
                                    <label class="form-check-label" for="requiredCheck">Details</label>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col padding">
                                <label for="readeSelect">Read</label>
                                <select class="form-control" id="readeSelect" v-model="resource.read">
                                    <option value="" selected class="selectPlaceholder">level</option>
                                    <option v-for="lv in levels" :value="lv" >{{lv}}</option>
                                </select>

                            </div>
                            <div class="col">
                                <label for="readeSelect">Write</label>
                                <select class="form-control" id="readeSelect" v-model="resource.write">
                                    <option value="" selected class="selectPlaceholder">level</option>
                                    <option v-for="lv in levels" :value="lv" >{{lv}}</option>
                                </select>
                            </div>
                        </div>

                        <div v-for="(field, i) in resource.fields" class="fields" >

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
                        <button class="btn btn-lg  btn-block" @click="addField">add field</button>
                        <button class="btn btn-lg btn-primary" @click="updateResource" data-dismiss="modal">Save</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="accordion" :id="'accordionResource'+ resource._id">
          <div class="card">
            <div class="card-header" :id="'heading'+ resource._id">
              <h5 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" :data-target="'#collapse'+ resource._id" aria-expanded="true" aria-controls="collapseOne">
                  {{ resource.name }}
                </button>
              </h5>
            </div>
            <div :id="'collapse' + resource._id" class="collapse" :aria-labelledby="'heading'+ resource._id" :data-parent="'#accordionResource'+ resource._id">
              <div class="card-body text-left">
                  <div class="">

                      {{resource}}
                  </div>
                  <div class="controls">
                      <button type="button" class="btn btn-danger" data-toggle="modal" :data-target="'#deleteModal' +  resource._id">Delete</button>
                      <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#updateModal' +  resource._id">Edit</button>
                  </div>

              </div>

            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'resource',
    props: [ 'resource', 'inputTypes', 'dbTypes', 'levels' ],
    methods: {
        delResource( resource ) {
            this.$api.del( 'resource', resource )
            $('#deleteModal' + resource._id).modal('hide')
        },
        addField( field ) {
            this.resource.fields.push({
                name: '',
                inputType: '',
                dbType: '',
                unique: false,
                required: false
            })
        },
        updateResource() {
            this.$api.update( 'resource', this.resource )
        }
    }
}
</script>

<style lang="scss">
#_resources {
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
}

</style>
