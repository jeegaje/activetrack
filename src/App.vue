<template>
  <div v-if="appReady" class="min-h-full font-Poppins box-border">
    <Navigation />
    <router-view /> 
  </div>
  <div v-if="!appReady" class="h-screen flex flex-col justify-evenly items-center">
    <Loading />
    <p>Active Tracker</p>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import Loading from './components/Loading.vue'
import {ref} from 'vue'
import {supabase} from './supabase/init'
import store from './store/index'

export default {
  components: {
    Navigation,
    Loading
  },
  setup() {
    // Create data / vars
    const appReady = ref(false)
    // Check to see if user is already logged in
    const checkUser = async() => {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    }
    const user = checkUser()
    
    // If user does not exist, need to make app ready
    if (!user){
      appReady.value = false
      setTimeout(() => {
        appReady.value = true
      }, 2000);

    }
    // Runs when there is a auth state change
    // if user is logged in, this will fire
    supabase.auth.onAuthStateChange((_, session) => {
      store.methods.setUser(session);
      appReady.value = false
      setTimeout(() => {
        appReady.value = true
      }, 2000);
    })
    return {appReady};
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>
