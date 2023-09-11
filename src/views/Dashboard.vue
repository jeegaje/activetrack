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
    <div class="container p-8 mb-8 bg-light-grey rounded-md shadow-lg">
      <h1 class="mb-1 text-lg font-bold text-at-light-green">Active Track Store</h1>
      <div class="flex">
        <div class="p-5 flex-1 bg-white m-1 rounded-lg" v-for="(item, index) in products" :key="index">
          <h2 class="font-semibold mb-5">{{ item.name }}</h2>
          <p>{{ item.description }}</p>
          <p>Price : {{ item.price }}</p>
          <button class="bg-green-500 px-10 py-2 bg-green-500 rounded-lg font-semibold text-white mt-5" @click="makeOrder(item.name, item.price, item.id)">Beli Sekarang</button>
        </div>
      </div>
    </div>

    <div class="container p-8 mb-8 bg-light-grey rounded-md shadow-lg">
      <h1 class="mb-1 text-lg font-bold text-at-light-green">My Order</h1>
      <div class="flex flex-col">
        <div class="p-5 bg-white m-1 rounded-lg" v-for="(item, index) in orders" :key="index">
          <p>Order Id :: {{ item.id }}</p>
          <div class="my-2">
            <p class="font-semibold">{{ item.product_id.name }}</p>
            <p class="">{{ item.product_id.price }}</p>
          </div>
          <p v-if="item.transaction_history.transaction_status == 'pending'" >Charge Now !! <br>VA Number :: {{ item.transaction_history.va_numbers[0].va_number }} {{ item.transaction_history.va_numbers[0].bank }}</p>
          <p v-if="item.transaction_history.transaction_status == 'settlement'" >Charge Success !!</p>

          <button v-if="item.transaction_history.transaction_status == 'settlement'" class="bg-green-500 rounded-lg py-2 px-8 text-white font-semibold">{{ item.transaction_history.transaction_status }}</button>
          <button v-if="item.transaction_history.transaction_status == 'pending'" class="bg-yellow-500 rounded-lg py-2 px-8 text-white font-semibold">{{ item.transaction_history.transaction_status }}</button>
          <button v-if="item.transaction_history.transaction_status == 'expire'" class="bg-red-500 rounded-lg py-2 px-8 text-white font-semibold">{{ item.transaction_history.transaction_status }}</button>

        </div>
      </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { supabase } from '../supabase/init'
import store from '../store/index'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
export default {
  
  name: "Home",
  components: {},
  setup() {
    // Create data / vars
    const workouts = ref([])
    const dataLoaded = ref(null)
    const errorMsg = ref(null)
    const products = ref([])
    const orders = ref([])
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

    //get products
    const getProducts = async() => {
      try{
        const {data, error} = await supabase
        .from('products')
        .select('*')
        if (error) throw error
        products.value = data
      } catch (error) {
        errorMsg.value = error.message
        setTimeout(() => {
          errorMsg.value = false
        }, 5000);
      }
    }

    //get products
    const getOrders = async() => {
      try{
        const {data, error} = await supabase
        .from('orders')
        .select('*,product_id(*)')
        .eq('buyer_id', store.methods.getUserId())
        if (error) throw error
        orders.value = data
      } catch (error) {
        errorMsg.value = error.message
        setTimeout(() => {
          errorMsg.value = false
        }, 5000);
      }
    }
    
    console.log(store.methods.getUser())
    const makeOrder = async(name, price, itemId) => {
      try{
        const {data, error} =  await axios.post('https://active-track-be.vercel.app/make-transaction', {
          payment_type: "bank_transfer",
          transaction_details: {
              gross_amount: price,
              order_id: uuidv4()
          },
          customer_details: {
              id: store.methods.getUserId(),
              email: store.methods.getUser().email,
              first_name: "budi",
              last_name: "utomo",
              phone: store.methods.getUser().phone
          },
          item_details: [
          {
            id: itemId,
            price: price,
            quantity: 1,
            name: name
          },
        ],
        bank_transfer:{
          bank: "bca",
          va_number: "12345678901",
          free_text: {
                inquiry: [
                      {
                          id: "Your Custom Text in ID language",
                          en: "Your Custom Text in EN language"
                      }
                ],
                payment: [
                      {
                          id: "Your Custom Text in ID language",
                          en: "Your Custom Text in EN language"
                      }
                ]
          }
        }
      }, {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Basic U0ItTWlkLXNlcnZlci1RT3laaVdQS3puc3paalpmb05FWHZoMzM6'
        }
      })
      if (error) throw error
      console.log(data)
      } catch (error) {
        console.log(error)
        errorMsg.value = error
        setTimeout(() => {
          errorMsg.value = false
        }, 5000);
      }
      
    }
    // Run data function
    getWorkouts()
    getProducts()
    getOrders()
    return {workouts, products, orders, dataLoaded, errorMsg, makeOrder};
  },
};
</script>
