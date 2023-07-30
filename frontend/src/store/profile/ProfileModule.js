import Vue from 'vue'
import Vuex from 'vuex'

import actions from "@/store/profile/actions.js"
import states from "@/store/profile/states.js"
import mutations from "@/store/profile/mutations.js"


Vue.use(Vuex)

const ProfileModule = {
    namespaced: true,
    actions,
    states,
    mutations
    

}

export default ProfileModule