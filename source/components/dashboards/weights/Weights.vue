<template>
    <div id="weights" class="admin">

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
                                    <label for="group">Muscle Group</label>
                                    <input type="text" class="form-control" id="name" placeholder="Muscle Group" autocomplete="off" v-model="exercise.group">
                                    <small id="nameHelp" class="form-text text-muted">Enter the muscle group of the exercise, Ex: "Biceps" </small>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="exercise">Exercise</label>
                                    <input type="text" class="form-control" id="name" placeholder="Exercise" autocomplete="off" v-model="exercise.name">
                                    <small id="nameHelp" class="form-text text-muted">Enter the name of the exercise you want to add. Ex: "Straight Leg Raises" </small>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="weight">Starting Weight</label>
                                    <input type="text" class="form-control" id="weight" placeholder="Enter weight" autocomplete="off" v-model="exercise.weight">
                                    <small id="nameHelp" class="form-text text-muted">Enter the starting weight of the exersice in kilos. Ex: "45" </small>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="target">Repetitions goal</label>
                                    <input type="text" class="form-control" id="weight" placeholder="Enter repetitions target" autocomplete="off" v-model="exercise.target">
                                    <small id="nameHelp" class="form-text text-muted">Enter how many repetitions is the goal of this exercise. This could vary, example for legs you would generaly have more repetitions, like 12 or 15 while upperbody parts is more common to do less repetitions like 8. </small>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-lg btn-primary" @click="saveExercise" data-dismiss="modal">Submit</button>
                    </div>
                    
                </div>
            </div>
        </div>

        <!-- /exercise modal -->

        <!-- updateModal -->

        <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModallLabel" aria-hidden="true">
            <div class="modal-dialog" role="dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="updateModalLabel">Update {{updateExer.name}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                    </div>

                    <div class="modal-body">

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="group">Muscle Group</label>
                                    <input type="text" class="form-control" id="name" placeholder="Muscle Group" autocomplete="off" v-model="updateExer.group">
                                    <small id="nameHelp" class="form-text text-muted">Enter the muscle group of the exercise, Ex: "Biceps" </small>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="exercise">Exercise</label>
                                    <input type="text" class="form-control" id="name" placeholder="Exercise" autocomplete="off" v-model="updateExer.name">
                                    <small id="nameHelp" class="form-text text-muted">Enter the name of the exercise you want to add. Ex: "Straight Leg Raises" </small>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="weight">Starting Weight</label>
                                    <input type="text" class="form-control" id="weight" placeholder="Enter weight" autocomplete="off" v-model="updateExer.weight">
                                    <small id="nameHelp" class="form-text text-muted">Enter the starting weight of the exersice in kilos. Ex: "45" </small>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="target">Repetitions goal</label>
                                    <input type="text" class="form-control" id="weight" placeholder="Enter repetitions target" autocomplete="off" v-model="updateExer.target">
                                    <small id="nameHelp" class="form-text text-muted">Enter how many repetitions is the goal of this exercise. This could vary, example for legs you would generaly have more repetitions, like 12 or 15 while upperbody parts is more common to do less repetitions like 8. </small>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-lg btn-primary" @click="updateExercise(updateExer)" data-dismiss="modal">Submit</button>
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
                        <h5 class="modal-title" id="deleteModallLabel">Delete {{delExer.name}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                    </div>
                    <div class="modal-body text-center">
                        <form class="form-signin" id="loginForm" onsubmit="return false;">
                            <h1>Warnign</h1>
                            <p>Are you shure you want to delete <b>{{delExer.name}}</b>! This action can not be undone!</p>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-lg btn-danger btn-block" type="submit" form="loginForm" @click="delExercise(delExer)" >DELETE</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- /deleteModal -->

        <!-- exercises -->
        <div id="exercises" class="row padding paper" v-for="(ex, i) in sortedExercises" :key="'exercise'+i" >
            <div class="col-12">
                <h4>{{ex.group}}</h4>
                <h3>{{ex.name}} <b>{{ex.weight}}kg</b></h3>
                
            </div>
            <div class="col-12" style="padding: 0 0 1rem 1rem;">
                <div v-for="i in ex.target">
                    <div v-if=" ex.repetitions && ex.repetitions >= i " @click="setRepetition(ex, i)" class="repetitions">
                        {{i}}
                    </div>
                    <div v-else  @click="setRepetition(ex, i)" class="repetitions" style="background-color: rgba(255,255,255,.1);">
                        {{i}}
                    </div>
                </div>
            </div>
            <div class="col-12" style="padding: 0 0 1rem 1rem;">
                <button type="button" class="btn btn-danger" data-toggle="modal"  :data-target="'#deleteModal'" @click="delExer = ex">Delete</button>
                <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#updateModal'" @click="updateExer = ex">Edit</button>
            </div>
            
        </div>
        <!-- /exercises  -->

        <!-- controls -->

        <div class="row controls">
            <div class="btn-group">
                <button type="button" class="btn" data-toggle="modal" data-target="#exerciseModal" >ADD EXERCISE</button>
            </div>
        </div>
        <!-- /controls -->

    </div>
    
</template>
<script>
import {mapGetters} from 'vuex'
import { keySort } from '../../../util/helperFunc.js'
export default {
    name: 'weights',
    page: 'weights',
    data() {
        return {
            exercise: {},
            delExer: {},
            updateExer: {}
        }
    },
    methods: {
        saveExercise() {
            this.$api.save('exercise', this.exercise )
            this.exercise.name = ''
            this.exercise.weight = ''
            this.exercise.target = ''
        },
        delExercise(exercise) {
            this.$api.del( 'exercise', exercise )
            $('#deleteModal').modal('hide')
        },
        updateExercise(exercise) {
            this.$api.update( 'exercise', exercise )
        },
        setRepetition(ex, i) {
            ex.repetitions = i
            this.updateExercise(ex)
        }
    },
    computed: {
        ...mapGetters([ 'exercises' ]),
        sortedExercises() {
            return  keySort(this.exercises, 'created_at', true)
        }
    },
}
</script>
<style lang="scss">
#weights {
    .repetitions {
        float:left; 
        margin: 0 5px 10px 0; 
        padding: 10px 20px; 
        background-color: rgba(255,255,255,.01); 
        cursor:pointer;
    }
}
</style>