<template>
    <div id="exercise" >

        <!-- updateModal -->
        <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModallLabel" aria-hidden="true" v-if="exercise">
            <div class="modal-dialog" role="dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="updateModalLabel">Update {{exercise.name}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                    </div>

                    <div class="modal-body">

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="instructions">Instructions</label>
                                    <span v-for="(instruction, i) in exercise.instructions" :key="'instruciton'+i">
                                        <div class="row" style="margin-bottom: 5px">
                                            <div class='col-10'>
                                                <textarea class="form-control"  rows="4" aria-describedby="ingressHelp" :placeholder="'Instruction '+ (i+1)" v-model="exercise.instructions[i]"></textarea>
                                            </div>
                                            <div class='col-2'>
                                                <i style="line-height: 41px" class="fa fa-trash-o" aria-hidden="true" @click="exercise.instructions.splice( i , 1)"></i>
                                            </div>
                                        </div>
                                    </span>
                                    <small id="exerciseHelp" class="form-text text-muted">Step by step instructions.</small>
                                </div>
                            </div>
                        </div>

                        <button class="btn btn-lg  btn-block" @click="addField" >add field</button>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="group">Muscle Group</label>
                                    <select id="group" class="form-control"  v-model="exercise.group" @blur="$forceUpdate()">
                                        <option v-for="(g, i) in srtMuscle_groups" :value="g" >{{g}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="equipment">Equipment</label>
                                    <select id="group" class="form-control"  v-model="exercise.equipment" @blur="$forceUpdate()">
                                        <option v-for="(e, i) in equipments" :value="e" >{{e}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="type">Exercise Type</label>
                                    <select id="group" class="form-control"  v-model="exercise.type" @blur="$forceUpdate()">
                                        <option v-for="(t, i) in types" :value="t" >{{t}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="mechanic">Mechanic Type</label>
                                    <select id="group" class="form-control"  v-model="exercise.mechanic" @blur="$forceUpdate()">
                                        <option v-for="(m, i) in mechanics" :value="m" >{{m}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="video">Demonstration Video</label>
                                    <input type="text" class="form-control" id="video" placeholder="Video url" autocomplete="off" v-model="exercise.video">
                                    <small id="exerciseHelp" class="form-text text-muted">Enter url of a video that demonstrates the exercise. Ex: "https://www.youtube.com/watch?v={id_number}".</small>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <label for="image">Add Images</label>
                                <small id="imageHelp" class="form-text text-muted">Add 2 images of the exercise. One at start and one at end of the exercise movement.</small>
                                <uploadImages :images="exercise.images" />
                            </div>
                        </div>

                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-lg btn-primary" @click="updateExercise(exercise)" data-dismiss="modal">Save</button>
                    </div>
                    
                </div>
            </div>
        </div>
        <!-- /updateModal -->

        <!-- deleteModal -->

        <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModallLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteModallLabel">Delete {{exercise.name}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                    </div>
                    <div class="modal-body text-center">
                        <form class="form-signin" id="loginForm" onsubmit="return false;">
                            <h1>Warnign</h1>
                            <p>Are you shure you want to delete <b>{{exercise.name}}</b>! This action can not be undone!</p>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-lg btn-danger btn-block" type="submit" form="loginForm" @click="delExercise" >DELETE</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- /deleteModal -->

        <div class="row">
            <div class="col">
                <h2>{{exercise.name}}</h2>
            </div>
        </div>
        <div class="row meta">
            <div class="col">
                <span>{{exercise.group}}</span> 
                <span>{{exercise.equipment}}</span> 
                <span>{{exercise.type}}</span> 
                <span>{{exercise.mechanic}}</span>
            </div>
        </div>
        <div class="row images" v-if="exercise.images[0]">
            <div class="col-12">
                <img :src="api_url + exercise.images[0]" alt="exersice images"  style="width:100%; max-width:275px "/>
                <img v-if="exercise.images[1]" :src="api_url + exercise.images[1]" alt="exersice images"  style="width:100%; max-width:275px "/>
            </div>
        </div>
        <div class="row video" v-if="exercise.video">
            <div class="col-12">
                <video :src="exercise.video+'#t=0.4'"  controls width="100%" style="max-width: 556px; "></video>
            </div>
        </div>
        <div class="row instructions" v-if="exercise.instructions[0]">
            <div class="col-12" v-for="(ins, i) in exercise.instructions" :key="'ins'+i">
                <P><b>{{i+1}}</b> {{ins}}</P>
            </div>
        </div>
        <!-- controls -->
        <div class="row controls">
            <div class="btn-group">
                <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#updateModal'">Edit</button>
                <button type="button" class="btn btn-danger" data-toggle="modal" :data-target="'#deleteModal'" >Delete</button>
            </div>
        </div>
        <!-- /controls -->
    </div>
</template>
<script>
import config from '../../../../../config'
export default {
    name: 'exercise',
    page() {
        return this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1).replace(/_/g,' ')
    },
    data() {
        return {
            api_url: config.api_url,
            show_video_title: true,
            equipments: [ 'Dumbbell', 'Barbell', 'Cable', 'Machine', 'Bands', 'Foam Roll', 'Kettlebells', 'Body Only', 'Medicine Ball', 'Exercise Ball', 'E-Z Curl Bar', 'None', 'Other' ],
            types: [ 'Cardio', 'Olympic Weightlifting', 'Plyometrics', 'Powerlifting', 'Strength', 'Stretching', 'Strongman' ],
            mechanics: [ 'Compound', 'Isolation', 'N/A' ],
            muscle_groups: [ 'Neck', 'Traps', 'Shoulders', 'Chest', 'Biceps', 'Forearm', 'Abs',  'Calves', 'Triceps', 'Lats', 'Middle Back', 'Lower Back', 'Glutes', 'Quads', 'Hamstrings', 'Adductors', 'Abductors' ],

        }
    },
    computed: {
        exercise() {
            return this.$store.getters.exercises.find( ex => ex.name === this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1).replace(/_/g,' '))
        },
        srtMuscle_groups() {
            return this.muscle_groups.sort()
        },
    },
    methods: {
        delExercise() {
            this.$api.del( 'exercise', this.exercise )     
            $('#deleteModal').modal('hide') 
            this.$router.push('/exercises')
        },
        updateExercise() {
            this.$api.update( 'exercise', this.exercise )
            this.$router.push('/exercises/'+ this.exercise.name)
        },
        addField( ) {
            this.exercise.instructions.push('')
        },
    }
}
</script>