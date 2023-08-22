<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <!-- Status Msesage -->
    <div v-if="statusMsg || errorMsg" class="mb-10 p-4 bg-light-grey rounded-md shadow-lg">
      <p v-if="statusMsg" class="">{{ statusMsg }}</p>
      <p v-if="errorMsg" class="text-red-500">{{ errorMsg }}</p>
    </div>
    <!-- Create -->
    <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
      <!-- Form -->
      <form @submit.prevent="productCreate" class="flex flex-col gap-y-5 w-full">
        <h1 class="text-2xl text-at-light-green">Sell Your Product</h1>
        <!-- Workout Name -->
        <div class="flex flex-col">
          <label for="product_name" class="mb-1 text-sm text-at-light-green">Product Name</label>
          <input type="text" required class="p-2 text-grey-500 focus:outline-none" id="product_name" v-model="productName">
        </div>
        <div class="flex flex-col">
          <label for="product_price" class="mb-1 text-sm text-at-light-green">Product Price</label>
          <input type="text" required class="p-2 text-grey-500 focus:outline-none" id="product_price" v-model="productPrice">
        </div>
        <div class="flex flex-col">
          <label for="product_description" class="mb-1 text-sm text-at-light-green">Description</label>
          <input type="text" required class="p-2 text-grey-500 focus:outline-none" id="product_description" v-model="productDescription">
        </div>
        <button type="submit">Record Product</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { supabase } from '../supabase/init';

export default {
  name: "create",
  setup() {
    // Create data
    const productName = ref('')
    const productPrice = ref('')
    const productDescription = ref('')
    const workoutType = ref('select-workout')
    const exercises = ref([])
    const statusMsg = ref(null)
    const errorMsg = ref(null)


    //Create product
    const productCreate = async() => {
      try{
        const { error } = await supabase.from('products').insert([
          {
            name: productName.value,
            price: productPrice.value,
            description: productDescription.value,
          }
        ])
        if (error) throw error
        productName.value = null;
        productPrice.value = null;
        productDescription.value = null;
        statusMsg.value = "Success create product"
        setTimeout(() => {
          statusMsg.value = false
        }, 5000)
      } catch(error) {
        errorMsg.value = `Error: ${error.message}`
        setTimeout(() => {
          errorMsg.value = false
        }, 5000);

      }
      
    }

    return {productName, productPrice, productDescription, workoutType, exercises, statusMsg, errorMsg, productCreate};
  },
};
</script>
