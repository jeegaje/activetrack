<template>
  <div class="w-full max-w-xs mx-auto">
    <p class="text-red-500">{{ errorMsg }}</p>
  <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="email" id="email" type="text" placeholder="Email">
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="password" id="password" type="text" placeholder="Password">
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Login
      </button>
    </div>
    <router-link :to="{ name: 'Register' }">Belum punya akun? Register</router-link>
  </form>
  <p class="text-center text-gray-500 text-xs">
    &copy;2020 Acme Corp. All rights reserved.
  </p>
</div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '../supabase/init'
import { useRouter } from 'vue-router';
export default {
  name: "login",
  setup() {
    // Create data / vars
    const router = useRouter()
    const email = ref(null)
    const password = ref(null)
    const errorMsg = ref(null)
    // Login function
    const login = async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })
      if (error) {
        errorMsg.value = error.message
        setTimeout(() => {
          errorMsg.value = null
        }, 5000);
      } else {
        router.push({name: 'Dashboard View'})
      }
    }
    return {email, password, errorMsg, login};
  },
};
</script>
