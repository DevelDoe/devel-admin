<template>
    <div id="add_modal">
        <!-- add modal -->

        <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModallLabel" aria-hidden="true">
            <div class="modal-dialog" role="dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="addModalLabel">Add {{workout.name}} to workout</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                    </div>

                    <div class="modal-body">

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

        <!-- /add modal -->
    </div>
</template>
<script>
export default {
    name: 'addmodal',
    props: [ 'workoutEx', 'lId' ],
    data() {
        return {
            workout: {}
        }
    },
    methods: {
        saveWorkout() {
            this.workout.group  = this.workoutEx.group
            this.workout.exercise_id   = this.workoutEx._id
            this.workout.user_id = this.lId
            this.workout.name = this.workoutEx.name
            this.$api.save('workout', this.workout )
            this.workout.name = ''
            this.workout.group = ''
            this.workout.exercise_id = ''
            this.workout.weight = ''
            this.workout.target = ''
        },
    }
}
</script>