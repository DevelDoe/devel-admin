<template>
    <div id="exercises" class="admin">

        <!-- exercise modal -->
        <div class="modal fade" id="exerciseModal" tabindex="-1" role="dialog" aria-labelledby="exerciseModallLabel" aria-hidden="true">
            <div class="modal-dialog" role="dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="exerciseModalLabel">Add new exercise</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                    </div>

                    <div class="modal-body">

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="exercise">Exercise</label>
                                    <input type="text" class="form-control" id="exercise" placeholder="Exercise name" autocomplete="off" v-model="exercise.name">
                                    <small id="exerciseHelp" class="form-text text-muted">Enter the name of the exercise you want to add. Ex: "Straight Leg Raises" </small>
                                </div>
                            </div>
                        </div>

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
                        <button class="btn btn-lg btn-primary" @click="saveExercise" data-dismiss="modal">Save</button>
                    </div>
                    
                </div>
            </div>
        </div>
        <!-- /exercise modal -->

        <!-- exercises -->
        <div class='row exercises' v-for="(e,i) in exercises" :key="'e'+i">
            <div class="col-4 col-lg-1 image" v-if="e.images[0]">
                <img :src="api_url + e.images[0]" alt="exersice images" />
            </div>
            <div class="col-8 info" >
                <a :href="'#/exercises/' + e.name.replace(/ /g,'_')" >
                    <h3 >{{e.name}}</h3>
                    <div class="row meta">
                        <div class="col">
                            <span>{{e.group}}</span> 
                            <span>{{e.equipment}}</span> 
                            <span>{{e.type}}</span> 
                            <span>{{e.mechanic}}</span>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <!-- /exercises  -->

        <!-- controls -->

        <div class="row controls">
            <div class="btn-group">
                <button type="button" class="btn" data-toggle="modal" data-target="#exerciseModal" >ADD Exercise</button>
            </div>
        </div>
        <!-- /controls -->

    </div>
    
</template>
<script>
import {mapGetters} from 'vuex'
import { keySort, cap } from '../../../../util/helperFunc.js'
import store from '../../../../store/store'
import config from '../../../../../config'
export default {
    name: 'exercises',
    page: 'exercises',
    data() {
        return {
            exercise: { images: [], type: 'Strength', mechanic: 'Compound', instructions: [] },
            equipments: [ 'Dumbbell', 'Barbell', 'Cable', 'Machine', 'Bands', 'Foam Roll', 'Kettlebells', 'Body Only', 'Medicine Ball', 'Exercise Ball', 'E-Z Curl Bar', 'None', 'Other' ],
            types: [ 'Cardio', 'Olympic Weightlifting', 'Plyometrics', 'Powerlifting', 'Strength', 'Stretching', 'Strongman' ],
            mechanics: [ 'Compound', 'Isolation', 'N/A' ],
            muscle_groups: [ 'Neck', 'Traps', 'Shoulders', 'Chest', 'Biceps', 'Forearm', 'Abs',  'Calves', 'Triceps', 'Lats', 'Middle Back', 'Lower Back', 'Glutes', 'Quads', 'Hamstrings', 'Adductors', 'Abductors' ],
            api_url: config.api_url,
        }
    },
    computed: {
        ...mapGetters([ 'exercises', 'logged' ]),
        srtMuscle_groups() {
            return this.muscle_groups.sort()
        },
    },
    methods: {
        saveExercise() {
            this.exercise.name = cap(this.exercise.name)
            this.$api.save('exercise', this.exercise )
            this.exercise.name = ''
            this.exercise.instructions = []    
            this.exercise.group = ''
            this.exercise.equipment = ''
            this.exercise.tupe = ''
            this.exercise.mechanic = ''
            this.exercise.video = ''
            this.exercise.images = []
        },
        addField( ) {
            this.exercise.instructions.push('')
        },

        delWorkout(workout) {
            this.$api.del( 'workout', workout )
            this.workouts.forEach( w => {
                if(w.name === workout.name) {
                    store.dispatch( `delWorkout`, w._id )
                }
            })
            
            $('#deleteModal').modal('hide')
        },
        updateWorkout(workout) {
            workout.name = cap(workout.name)
            this.$api.update( 'workout', workout )
        },
    },
    created() {
        this.$bus.$on('addImages', payload => { this.exercise.images.push(payload) })
        this.$bus.$on('delImages', payload => { this.exercise.images.splice(payload, 1) })
    },
    
}
</script>