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
                                    <input type="text" class="form-control" id="name" placeholder="Muscle Group" autocomplete="off" v-model="workout.group">
                                    <small id="nameHelp" class="form-text text-muted">Enter the muscle group of the workout, Ex: "Biceps" </small>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="workout">Workout</label>
                                    <input type="text" class="form-control" id="name" placeholder="Workout" autocomplete="off" v-model="workout.name">
                                    <small id="nameHelp" class="form-text text-muted">Enter the name of the workout you want to add. Ex: "Straight Leg Raises" </small>
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
                                    <label for="group">Muscle Group</label>
                                    <input type="text" class="form-control" id="name" placeholder="Muscle Group" autocomplete="off" v-model="updateWork.group">
                                    <small id="nameHelp" class="form-text text-muted">Enter the muscle group of the workout, Ex: "Biceps" </small>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="name">Workout</label>
                                    <input type="text" class="form-control" id="name" placeholder="Workout" autocomplete="off" v-model="updateWork.name">
                                    <small id="nameHelp" class="form-text text-muted">Enter the name of the workout you want to add. Ex: "Straight Leg Raises" </small>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="weight">Starting Weight</label>
                                    <input type="text" class="form-control" id="weight" placeholder="Enter weight" autocomplete="off" v-model="updateWork.weight">
                                    <small id="nameHelp" class="form-text text-muted">Enter the starting weight of the exersice in kilos. Ex: "45" </small>
                                </div>
                            </div>
                        </div>

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
                                    <p>You have reached your goal for this level!</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="weight">Next Level Weight</label>
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
        <div id="workouts" class="row padding paper" v-for="(ex, i) in uniqueWorkouts" :key="'workout'+i" >
            <div class="col-12">
                <h4>{{ex.group}}</h4>
                <h3>{{ex.name}} <b>{{ex.workout}}kg</b></h3>
                
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
                <button type="button" class="btn btn-danger" data-toggle="modal"  :data-target="'#deleteModal'" @click="delWork = ex">Delete</button>
                <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#updateModal'" @click="updateWork = ex">Edit</button>
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
import { keySort } from '../../../util/helperFunc.js'
export default {
    name: 'workouts',
    page: 'workouts',
    data() {
        return {
            workout: {},
            delWork: {},
            updateWork: {},
            lvWork: {}
        }
    },
    computed: {
        ...mapGetters([ 'workouts', 'logged' ]),
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
            return unique
        },

    },
    methods: {
        saveWorkout() {
            this.workout.user_id = this.logged._id
            this.workout.name = this.workout.name.trim() 
            this.$api.save('workout', this.workout )
            this.workout.name = ''
            this.workout.weight = ''
            this.workout.target = ''
        },
        delWorkout(workout) {
            this.$api.del( 'workout', workout )
            $('#deleteModal').modal('hide')
        },
        updateWorkout(workout) {
            this.$api.update( 'workout', workout )
        },
        setRepetition(ex, i) {
            ex.repetitions = i
            if(ex.target === i) {
                this.lvWork = JSON.parse(JSON.stringify(ex))
                this.lvWork.weight = ''
                $('#lvUpModal').modal('show')
            }
            this.updateWorkout(ex)
        },
        lvWorkout() {
            this.lvWork.level++
            this.$api.save('workout', this.lvWork )
        }
    },
    
}
</script>
<style lang="scss">
#workouts {
    .repetitions {
        float:left; 
        margin: 0 5px 10px 0; 
        padding: 10px 20px; 
        background-color: rgba(255,255,255,.01); 
        cursor:pointer;
    }
}

$particles: 50;
$width: 500;
$height: 500;

// Create the explosion...
$box-shadow: ();
$box-shadow2: ();
@for $i from 0 through $particles {
  $box-shadow: $box-shadow,
               random($width)-$width / 2 + px
               random($height)-$height / 1.2 + px
               hsl(random(360), 100, 50);
  $box-shadow2: $box-shadow2, 0 0 #fff
}
@mixin keyframes ($animationName) {
    @-webkit-keyframes #{$animationName} {
        @content;
    }

    @-moz-keyframes #{$animationName} {
        @content;
    }

    @-o-keyframes #{$animationName} {
        @content;
    }

    @-ms-keyframes #{$animationName} {
        @content;
    }

    @keyframes #{$animationName} {
        @content;
    }
}

@mixin animation-delay ($settings) {
    -moz-animation-delay: $settings;
    -webkit-animation-delay: $settings;
    -o-animation-delay: $settings;
    -ms-animation-delay: $settings;
    animation-delay: $settings;
}

@mixin animation-duration ($settings) {
    -moz-animation-duration: $settings;
    -webkit-animation-duration: $settings;
    -o-animation-duration: $settings;
    -ms-animation-duration: $settings;
    animation-duration: $settings;
}

@mixin animation ($settings) {
    -moz-animation: $settings;
    -webkit-animation: $settings;
    -o-animation: $settings;
    -ms-animation: $settings;
    animation: $settings;
}

@mixin transform ($settings) {
    transform: $settings;
    -moz-transform: $settings;
    -webkit-transform: $settings;
    -o-transform: $settings;
    -ms-transform: $settings;
}

.pyro > .before, .pyro > .after {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  box-shadow: $box-shadow2;
  @include animation((1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards));
}
    
.pyro > .after {
  @include animation-delay((1.25s, 1.25s, 1.25s));
  @include animation-duration((1.25s, 1.25s, 6.25s));
}
        
@include keyframes(bang) {
  to {
    box-shadow:$box-shadow;
  }
}
    
@include keyframes(gravity)  {
  to {
    @include transform(translateY(200px));
    opacity: 0;
  }
}
    
@include keyframes(position) {
  0%, 19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%, 39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%, 59.9% {  
    margin-top: 20%;
    margin-left: 70%
  }
  60%, 79.9% {  
    margin-top: 30%;
    margin-left: 20%;
  }
  80%, 99.9% {  
    margin-top: 30%;
    margin-left: 80%;
  }
}

</style>