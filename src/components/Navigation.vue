<template>
  <header>
    <nav class="flex items-center justify-between flex-wrap bg-green-400 p-6">
      
      <div class="flex items-center flex-shrink-0 mr-6">
        <img class="w-14 mr-4" src="../assets/images/dumbbell-light.png" alt="">
        <h1 class="font-semibold text-xl text-white">Active Tracker</h1>
      </div>

      <div class="flex flex-row">
        <div class="flex flex-row text-sm">
          <router-link class="block text-white font-semibold lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" :to="{ name: 'Home'}">Home</router-link>
          <router-link v-if="user" class="block text-white font-semibold lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" :to="{ name: 'Create'}">Create</router-link>
          <router-link v-if="!user" class="block text-white font-semibold lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" :to="{ name: 'Login' }">Login</router-link>
          <a  v-if="user" @click="logout" href="#responsive-header" class="block text-white font-semibold lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Logout
          </a>
        </div>
      </div>

    </nav>
  </header>
</template>

<script>
import { computed } from "vue"
import { useRouter } from 'vue-router';
import { supabase } from '../supabase/init'
import store from "../store/index";


export default {
    setup() {
        // Get user from store
        const user = computed(() => store.state.user)
        // Setup ref to router
        const router = useRouter();
        // Logout function
        const logout = async () => {
          await supabase.auth.signOut()
          router.push({ name: 'Home'})
        }
        return {logout, user};
    },

};
</script>
