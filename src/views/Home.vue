<template>
  <p v-if="errorMsg != false" class="text-red">{{ errorMsg }}</p>
  <div v-if="dataLoaded" class="container flex">
    <div v-for="(item, index) in workouts" class="card w-98 bg-green-100 py-10 px-5 shadow-xl m-5" :key="index">
      <div class="">
        <img v-if="item.workoutType == 'strength'" class="mx-auto" src="../assets/images/dumbbell-light-green.png" alt="" width="100">
        <img v-if="item.workoutType == 'cardio'" class="mx-auto" src="../assets/images/running-light-green.png" alt="" width="70">
        <h2 class="font-bold text-green-500 text-lg mt-5">{{ item.workoutName }}</h2>
        <p class="text-center">{{ item.exercises.length + ' Exercises'}}</p>
        <div class="mt-4 flex justify-center">
          <router-link :to="'/workout/' + item.id" class="font-semibold text-white px-10 py-2 bg-green-500 rounded-lg">Detail</router-link>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container">
    <p class="mx-auto">Loading Data</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { supabase } from '../supabase/init'
import store from '../store/index'
export default {
  
  name: "Home",
  components: {},
  setup() {
    // Create data / vars
    const workouts = ref([])
    const dataLoaded = ref(null)
    const files = ref(null)
    const errorMsg = ref(null)
    // Get data
    const getWorkouts = async() => {
      try{
        const {data, error} = await supabase.from('workouts').select('*').eq('user_id', store.methods.getUserId())
        if(error) throw error
        workouts.value = data
        dataLoaded.value = true
      }catch(error){
        console.log(error.message)
      }
    }

    const uploadImage = (evt) => {
      files.value = evt.target.files
      try{
        if (files.value[0].size > 500000) {
          throw new Error("File cannot more than 500kb")
        }
        
      } catch (error) {
        errorMsg.value = error.message
        setTimeout(() => {
          errorMsg.value = false
        }, 5000);
      }
    }
    // Run data function
    getWorkouts()
    return {workouts, dataLoaded, uploadImage, errorMsg};
  },
};
</script>
