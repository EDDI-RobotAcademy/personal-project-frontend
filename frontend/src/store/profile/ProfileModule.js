import Vue from 'vue'
import Vuex from 'vuex'

import actions from "@/store/profile/actions.js"


Vue.use(Vuex)

const ProfileModule = {
    namespaced: true,
    actions,
    

}

export default ProfileModule