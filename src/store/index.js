import { reactive } from 'vue'

const state = reactive({
    user: null
})

const methods = {
    setUser(payload) {
        state.user = payload ? payload.user : null
    },
    getUserId(){
        return state.user.id
    },
    getUser(){
        return state.user
    }

};

export default {
    state,
    methods
}