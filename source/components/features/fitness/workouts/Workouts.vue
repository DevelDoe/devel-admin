<template>
    <div id="workouts" class="admin">

        <!-- workout modal -->

        <div class="modal fade" id="workoutModal" tabindex="-1" role="dialog" aria-labelledby="workoutModallLabel" aria-hidden="true">
            <div class="modal-dialog" role="dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="workoutModalLabel">Add new workout</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                    </div>

                    <div class="modal-body">

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="group">Muscle Group</label>
                                    <select id="group" class="form-control"  v-model="workout.group" @blur="$forceUpdate()">
                                        <option v-for="(g, i) in srtMuscle_groups" :value="g" >{{g}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="exerciseId">Exercise</label>
                                    <select id="exerciseId" class="form-control"  v-model="workout.exercise_id" @blur="$forceUpdate()">
                                        <option v-for="(e, i) in filteredExercises" :value="e._id" >{{e.name}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="weight">Starting Weight</label>
                                    <input type="text" class="form-control" id="workout" placeholder="Enter weight" autocomplete="off" v-model="workout.weight">
                                    <small id="nameHelp" class="form-text text-muted">Enter the starting workout of the exersice in kilos. Ex: "45" </small>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="target">Repetitions goal</label>
                                    <input type="text" class="form-control" id="target" placeholder="Enter repetitions target" autocomplete="off" v-model="workout.target">
                                    <small id="nameHelp" class="form-text text-muted">Enter how many repetitions is the goal of this workout. This could vary, example for legs you would generaly have more repetitions, like 12 or 15 while upperbody parts is more common to do less repetitions like 8. </small>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-lg btn-primary" @click="saveWorkout" data-dismiss="modal">Submit</button>
                    </div>
                    
                </div>
            </div>
        </div>

        <!-- /workout modal -->

        <!-- updateModal -->

        <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModallLabel" aria-hidden="true">
            <div class="modal-dialog" role="dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="updateModalLabel">Update {{updateWork.name}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                    </div>

                    <div class="modal-body">


                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="target">Repetitions goal</label>
                                    <input type="text" class="form-control" id="target" placeholder="Enter repetitions target" autocomplete="off" v-model="updateWork.target">
                                    <small id="nameHelp" class="form-text text-muted">Enter how many repetitions is the goal of this workout. This could vary, example for legs you would generaly have more repetitions, like 12 or 15 while upperbody parts is more common to do less repetitions like 8. </small>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-lg btn-primary" @click="updateWorkout(updateWork)" data-dismiss="modal">Submit</button>
                    </div>
                    
                </div>
            </div>
        </div>

        <!-- /updateModal -->

        <!-- deleteModal -->

        <div class="modal fade" :id="'deleteModal'" tabindex="-1" role="dialog" aria-labelledby="deleteModallLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteModallLabel">Delete {{delWork.name}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                    </div>
                    <div class="modal-body text-center">
                        <form class="form-signin" id="loginForm" onsubmit="return false;">
                            <h1>Warnign</h1>
                            <p>Are you shure you want to delete <b>{{delWork.name}}</b>! This action can not be undone!</p>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-lg btn-danger btn-block" type="submit" form="loginForm" @click="delWorkout(delWork)" >DELETE</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- /deleteModal -->

        <!-- lvUpModal -->

        <div class="modal fade" :id="'lvUpModal'" tabindex="-1" role="dialog" aria-labelledby="lvUpModallLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    
                    <div class="modal-header">
                        <h5 class="modal-title" id="lvUpModalLabel">Level Up</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                    </div>
                    <div class="modal-body text-center">
                        <form class="form-signin" id="loginForm" onsubmit="return false;">
                            <div class="row">
                                <div class="col">
                                    <h2>Congratulations</h2>
                                    <p>You have reached your level {{lvWork.level}} goal ({{levelOldWeight}} kg)</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="weight">Enter the next levels goal</label>
                                        <input type="text" class="form-control" id="weight" placeholder="Enter weight" autocomplete="off" v-model="lvWork.weight" style="text-align:center">
                                        <small id="nameHelp" class="form-text text-muted">Enter the weight to step up to.</small>
                                    </div>
                                </div>
                            </div>
                            <div class="pyro">
                                <div class="before"></div>
                                <div class="after"></div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-lg btn-primary" @click="lvWorkout" data-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- !lvUpModal -->

        <!-- workouts -->

        <div class="accordion" :id="'accordionGroup'">
            <div class="card" v-for="(group, i) in groups" :key="'g'+i">

                <div class="card-header" :id="'heading'">
                    <h5 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" :data-target="'#collapse'+i"
                            aria-expanded="true" aria-controls="collapseOne">
                            {{group}}
                        </button>
                    </h5>
                </div>

                <div :id="'collapse'+i " class="collapse" :aria-labelledby="'heading' " :data-parent="'#accordionGroup' ">
                    <div class="card-body text-left">



                        <div class="accordion" :id="'accordionWorkout'">
                            <div class="card" v-for="(ex, i) in uniqueWorkouts" v-if="ex.group === group" :key="'workout'+i">

                                <div class="card-header" :id="'heading'">
                                    <h5 class="mb-0">
                                        <button style="font-size: .6rem; padding-left: 30px;" class="btn btn-link" type="button" data-toggle="collapse" :data-target="'#collapseW'+i" aria-expanded="true" aria-controls="collapseOne">
                                            {{ex.name}} <b>{{ex.weight}}kg</b>
                                        </button>
                                    </h5>
                                </div>

                                <div :id="'collapseW'+i " class="collapse" :aria-labelledby="'heading' " :data-parent="'#accordionWorkout' ">
                                    <div class="card-body text-left">
                                        <div class="row" style="width: 100%;">
                                            <div class="col-12" style="padding: 27px 20px 12px 42px;">
                                                <h5>Repetitions</h5>
                                                <div v-for="i in ex.target">
                                                    <div v-if=" ex.repetitions && ex.repetitions >= i " @click="setRepetition(ex, i)" class="repetitions"> {{i}} </div>
                                                    <div v-else @click="setRepetition(ex, i)" class="repetitions" style="background-color: rgba(255,255,255,.1);"> {{i}} </div>
                                                </div>
                                            </div>
                                            <div class="col-12" style="padding: 0px 20px 20px 42px;">
                                                <button type="button" class="btn btn-danger" data-toggle="modal" :data-target="'#deleteModal'" @click="delWork = ex">Delete</button>
                                                <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#updateModal'" @click="updateWork = ex">Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <!-- /workouts  -->

        <!-- controls -->

        <div class="row controls">
            <div class="btn-group">
                <button type="button" class="btn" data-toggle="modal" data-target="#workoutModal" >ADD WORKOUT</button>
            </div>
        </div>
        <!-- /controls -->

    </div>
    
</template>
<script>
import {mapGetters} from 'vuex'
import { keySort, cap } from '../../../../util/helperFunc.js'
import store from '../../../../store/store'
var filters = {
    all : function (exercises) { return exercises} ,
    group: function ( exercises, group ) { return exercises.filter( ex => ex.group === group ) }
}
export default {
    name: 'workouts',
    page: 'workouts',
    data() {
        return {
            workout: {},
            delWork: {},
            updateWork: {},
            lvWork: {},
            levelOldWeight: undefined,
            muscle_groups: [ 'Neck', 'Traps', 'Triceps', 'Shoulders', 'Chest', 'Biceps', 'Forearm', 'Abs', 'Calves', 'Triceps', 'Lats', 'Middle Back', 'Lower Back', 'Glutes', 'Quads', 'Hamstrings', 'Adductors', 'Abductors'  ],
        }
    },
    computed: {
        ...mapGetters([ 'workouts', 'logged', 'exercises' ]),
        sortedWorkouts() {
            return keySort(this.workouts, 'created_at', true)
        },
        uniqueWorkouts() {
            var unique = []
            this.sortedWorkouts.map(ex => {
                let isInWorkouts = '' 
                isInWorkouts = unique.find(e => e.name === ex.name )
                if(!isInWorkouts) unique.push(ex)
            })
            return keySort(unique, 'name', false)
        },
        groups() {
            var unique = []
            for(var i = 0, len = this.uniqueWorkouts.length; i < len; i++) {
                if(!unique.includes(this.uniqueWorkouts[i].group)) {
                    unique.push(this.uniqueWorkouts[i].group)
                }
            }
            return unique.sort()
        },
        srtMuscle_groups() {
            return this.muscle_groups.sort()
        },
        filteredExercises() {
            return this.exercises.filter( ex => ex.group === this.workout.group )
        }
    },
    methods: {
        saveWorkout() {
            this.workout.user_id = this.logged._id
            this.workout.name = this.exercises.find( ex => ex._id === this.workout.exercise_id ).name
            this.$api.save('workout', this.workout )
            this.workout.name
            this.workout.exercise_id = ''
            this.workout.weight = ''
            this.workout.target = ''
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
            this.$api.update( 'workout', workout )
        },
        setRepetition(ex, i) {
            ex.repetitions = i
            if(ex.target === i) {
                this.lvWork = JSON.parse(JSON.stringify(ex))
                this.levelOldWeight = ex.weight
                this.lvWork.weight = ''
                $('#lvUpModal').modal('show')
            }
            this.updateWorkout(ex)
        },
        lvWorkout() {
            this.lvWork.level++
            this.$api.save('workout', this.lvWork )
        }
    }
    
}
</script>