<template>

  <div class="max-w-screen-md mx-auto px-4 py-10">
    <div v-if="errorMsg" class="px-8 py-4 mb-8 bg-light-grey rounded-md shadow-lg">
      <p class="text-red-500">Error {{ errorMsg }}</p>
    </div>
    <div class="p-8 mb-8 bg-light-grey rounded-md shadow-lg">
      <img v-if="workout.workoutType == 'cardio'" class="block" src="../assets/images/running-light-green.png" alt="" width="80">
      <img v-if="workout.workoutType == 'strength'" class="block" src="../assets/images/dumbbell-light-green.png" alt="" width="100">
      <h1 class="font-semibold text-2xl text-at-light-green">{{ workout.workoutName }}</h1>
      <button v-if="!editable" @click="editMode" class="py-1 px-5 mr-5 bg-green-500 rounded-lg text-white font-semibold">Edit</button>
      <button class="py-1 px-5 mr-5 font-semibold bg-green-100 rounded-lg text-green-500 border-solid border-2 border-green-500" @click="editable=false" :hidden="!editable">Cancel Edit</button>
      <button class="py-1 px-5 mr-5 bg-red-500 rounded-lg text-white font-semibold" @click="deleteWorkout">Delete</button>
    </div>

    <!-- Create -->
    <div v-if="!dataLoaded">
      <p class="text-center">Loading ...</p>
    </div>
    <div v-else class="p-8 mb-8 flex items-start bg-light-grey rounded-md shadow-lg">
      <!-- Form -->
      <form @submit.prevent="updateWorkout" class="flex flex-col gap-y-5 w-full">
        <!-- Workout Name -->
        <div class="flex flex-col">
          <label for="workout-name" class="mb-1 text-sm text-at-light-green">Workout Name</label>
          <input type="text" required class="p-2 text-grey-500 focus:outline-none" id="workout-name" :value="workout.workoutName" :disabled="!editable">
        </div>
        <!-- Workout Type -->
        <div class="flex flex-col">
          <label for="workout-type" class="mb-1 text-sm text-at-light-green">Workout Type</label>
          <select id="workout-type" class="p-2 focus:outline-none" :disabled="!editable">
            <option value="select-workout" >Select Workout</option>
            <option value="strength" :selected="workout.workoutType == 'strength'" >Strength Training</option>
            <option value="cardio" :selected="workout.workoutType == 'cardio'">Cardio</option>
          </select>
        </div>
        <!-- Strength Training Inputs -->
        <div v-if="workout.workoutType == 'strength'" class="flex flex-col gap-y-4">
          <div class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row" v-for="(item, index) in workout.exercises" :key="index">
            <div class="flex flex-col md:w-1/3">
              <label for="exercise-name" class="mb-1 text-sm text-at-light-green">Exercise</label>
              <input required type="text" class="p-2 w-full focus:outline-none" v-model="item.exercise" :disabled="!editable">
            </div>
            <div class="flex flex-col flex-1">
              <label for="sets" class="mb-1 text-sm text-at-light-green">Sets</label>
              <input required type="text" class="p-2 w-full focus:outline-none" v-model="item.sets" :disabled="!editable">
            </div>
            <div class="flex flex-col flex-1">
              <label for="reps" class="mb-1 text-sm text-at-light-green">Reps</label>
              <input required type="text" class="p-2 w-full focus:outline-none" v-model="item.reps" :disabled="!editable">
            </div>
            <div class="flex flex-col flex-1">
              <label for="weigth" class="mb-1 text-sm text-at-light-green">Weight (Lb's)</label>
              <input required type="text" class="p-2 w-full focus:outline-none" v-model="item.weight" :disabled="!editable">
            </div>
            <img src="@/assets/images/trash-light-green.png" class="h-4 w-auto absolute -left-5 cursor-pointer" alt="" @click="deleteExercise(item.id)" :hidden="!editable">
          </div>
          <button type="button" @click="addExercise" :hidden="!editable" class="font-semibold">Add exercise</button>
        </div>

        <!-- Cardio Inputs -->
        <div v-if="workout.workoutType == 'cardio'" class="flex flex-col gap-y-4">
          <div class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row" v-for="(item, index) in workout.exercises" :key="index">
            <div class="flex flex-col md:w-1/3">
              <label for="cardio-type" class="mb-1 text-sm text-at-light-green">Type</label>
              <select id="cardio-type" class="p-2 w-full focus:outline-none" :disabled="!editable" v-model="item.cardioType">
                <option value="#">Select Type</option>
                <option value="run" :selected="item.cardioType == 'run'">Runs</option>
                <option value="walk" :selected="item.cardioType == 'walk'">Walks</option>
              </select>
            </div>
            <div class="flex flex-col flex-1">
              <label for="distance" class="mb-1 text-sm text-at-light-green">Distance</label>
              <input required type="text" class="p-2 w-full focus:outline-none" v-model="item.distance" :disabled="!editable" > 
            </div>
            <div class="flex flex-col flex-1">
              <label for="duration" class="mb-1 text-sm text-at-light-green">Duration</label>
              <input required type="text" class="p-2 w-full focus:outline-none" v-model="item.duration" :disabled="!editable">
            </div>
            <div class="flex flex-col flex-1">
              <label for="pace" class="mb-1 text-sm text-at-light-green">Pace</label>
              <input required type="text" class="p-2 w-full focus:outline-none" v-model="item.pace" :disabled="!editable">
            </div>
            <img src="@/assets/images/trash-light-green.png" class="h-4 w-auto absolute -left-5 cursor-pointer" alt="" @click="deleteExercise(item.id)" :hidden="!editable">
          </div>
          <button type="button" :hidden="!editable" class="font-semibold" @click="addExercise">Add exercise</button>
        </div>
        <div class="flex justify-center">
        </div>
        <button class="py-2 px-5 font-semibold bg-green-500 rounded-lg text-white" :hidden="!editable" type="submit">Update Workout</button>
      </form>
    </div>

    <div class="p-8 mb-8 bg-light-grey rounded-md shadow-lg">
      <label for="workout-name" class="mb-1 text-sm text-at-light-green">My Progress</label>
      <div v-if="progressImages.length != 0" class="flex flex-wrap justify-between">
        <img class="w-2/5 h-auto m-1" v-for="(item, index) in progressImages" :key="index" :src="'https://wyntpguqruuohlkekssl.supabase.co/storage/v1/object/public/workoutapp/' + userId + '/wrkt-' + idWorkout + '/' +item.name" alt="">
      </div>
      <div v-else class="text-center">
        <p>No Progress Yet</p>
      </div>
    </div>

    <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
      <!-- Form -->
      <form @submit.prevent="createProgress" class="flex flex-col gap-y-5 w-full">
        <!-- Workout Name -->
        <div class="flex flex-col">
          <label for="workout-name" class="mb-1 text-sm text-at-light-green">Upload Progress</label>
          <input type="file" @change="uploadImage">
        </div>
        <button class="py-2 px-5 font-semibold bg-green-500 rounded-lg text-white" type="submit">Update Progress</button>

        
        <div class="flex justify-center">
        </div>
        <button class="py-2 px-5 font-semibold bg-green-500 rounded-lg text-white" :hidden="!editable" type="submit">Update Workout</button>
      </form>
    </div>
    
    <!-- <img src="https://wyntpguqruuohlkekssl.supabase.co/storage/v1/object/sign/workoutapp/074709e8-1ca6-46e7-9d17-a15b823bf2b8/1692287563288?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3b3Jrb3V0YXBwLzA3NDcwOWU4LTFjYTYtNDZlNy05ZDE3LWExNWI4MjNiZjJiOC8xNjkyMjg3NTYzMjg4IiwiaWF0IjoxNjkyMzY2OTk0LCJleHAiOjE3MjM5MDI5OTR9.J-2vjxHVseu2Thu3HDUupRkX7bWN5Mf4SwtVFqZPW9s&t=2023-08-18T13%3A56%3A34.756Z" alt=""> -->
  </div>
</template>

<script>
import { ref } from 'vue';
import { supabase } from '../supabase/init'
import { useRouter } from 'vue-router';
import { uid } from 'uid';
import store from '../store/index'

export default {
  name: "view-workout",
  setup() {
    // Create data / vars
    const workout = ref(null)
    // const exercise = ref([])
    const router = useRouter()
    const dataLoaded = ref(null)
    const editable = ref(false)
    const errorMsg = ref(null)
    const file = ref(null)
    const progressImages = ref()
    const userId = ref()

    userId.value = store.methods.getUserId()

    // Get current Id of route
    const idWorkout = router.currentRoute.value.params.id
    const getWorkoutById = async() => {
      try{
        const {data, error} = await supabase.from('workouts').select("*").eq('id', idWorkout)
        if (error) throw error
        workout.value = data[0]
        dataLoaded.value = true
      } catch (error){
        console.log(error)
      }

    }

    // Get workout data
    getWorkoutById()

    // Delete workout
    const deleteWorkout = async() => {
      try {
        const {error} = await supabase.from('workouts').delete().eq('id', idWorkout)
        if (error) throw error
        router.push('/')
      } catch (error){
        errorMsg.value = error
        setTimeout(() => {
          errorMsg.value = false
        }, 5000);
      }
    }
    // Edit mode
    const editMode = () => {
      editable.value = !editable.value
    }
    // Add exercise
    const addExercise = () => {
      if (workout.value.workoutType == 'strength') {
        workout.value.exercises.push({
          id: uid(),
          exercise: '',
          reps: '',
          sets: '',
          weigth: ''
        })
        return
      }
      workout.value.exercises.push({
        id: uid(),
        cardioType: '',
        distance: '',
        duration: '',
        pace: ''
      })
    }
    // Delete exercise
    const deleteExercise = (exerciseId) => {
      if(workout.value.exercises.length > 1){
        workout.value.exercises = workout.value.exercises.filter((e)=> e.id != exerciseId)
        return
      }
      errorMsg.value = "Exercise cannot less than 1"
      setTimeout(() => {
        errorMsg.value = false
      }, 5000);
    }


    // Update Workout
    const updateWorkout = async() => {
      try {
        const { error } = await supabase.from('workouts').update({ exercises: workout.value.exercises }).eq('id', idWorkout).select()
        if(error) throw error
        editable.value = false
      } catch (error) {
        errorMsg.value = error
        setTimeout(() => {
          errorMsg.value = false
        }, 5000);
      }
    }

    //get image
    const uploadImage = (evt) => {
      file.value = evt.target.files
      try {
        if(file.value[0].size > 500000) {
          throw new Error("File tidak boleh melebihi 500kb")
        }
      } catch (error) {
        errorMsg.value = error.message
        setTimeout(() => {
          errorMsg.value = false
        }, 5000)
      }
    }

    //create progress
    const createProgress = async() => {
      try{
        const {error} = await supabase
        .storage
        .from('workoutapp')
        .upload(store.methods.getUserId() + '/wrkt-' + idWorkout + '/' + Date.now(), file.value[0])
        if (error) throw error
      } catch (error) {
        errorMsg.value = error.message
        setTimeout(() => {
          errorMsg.value = false
        }, 5000)
      }
    }

    const getListProgress = async() => {
      const {data} = await supabase
    .storage.from('workoutapp').list(store.methods.getUserId() + '/wrkt-' + idWorkout)
    progressImages.value = data
    }
    
    getListProgress()
    return {workout, userId, dataLoaded, editable, errorMsg, idWorkout, addExercise, progressImages, deleteWorkout, editMode, deleteExercise, updateWorkout, uploadImage, createProgress};
  },
  // mounted(){
  //   const getListProgress = async() => {
  //     const {data} = await supabase
  //   .storage.from('workoutapp').list('074709e8-1ca6-46e7-9d17-a15b823bf2b8/wrkt-12')
  //   this.progressImages.value = data
  //   }
  //   getListProgress()
  // }
};
</script>
