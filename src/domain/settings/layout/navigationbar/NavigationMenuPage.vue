<template lang="">
    <v-app-bar color="grey lighten-4">
        <v-btn @click="goHome" color="grey">
            <v-toolbar-title class="text-uppercase">
                <span>stock & chat</span>
            </v-toolbar-title>
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn v-if="!isLogin" text @click="toLoginAndSignUpPage">
            <span>SignIn / SignUp</span>
            <v-icon right>mdi-login</v-icon>
        </v-btn>
        <v-btn v-if="isLogin" text @click="signOut">
            <span>로그아웃</span>
            <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
    </v-app-bar>
</template>


<script>

import 'vuetify/dist/vuetify.min.css'
import { mapActions} from 'vuex';

const accountModule = 'accountModule'

export default {
    data () {
        return {
            isLogin: false,
        }
    },
    methods: {
        ...mapActions(accountModule, ['requestLogOutAccountToSpring']),
        isLoggedIn() {
            if ( localStorage.getItem('userToken') == null ) {
                this.isLogin = false
            } else {
                this.isLogin = true
            }
        },
        toLoginAndSignUpPage () {
            this.$router.push("sign-in-page").catch(()=>{});
        },
        async signOut () {
            await this.requestLogOutAccountToSpring()
            location.reload()
        },
        goHome () {
            this.$router.push("/").catch(()=>{});
        },        
    },    
    computed: {
    },
    mounted () {
        this.isLoggedIn()      
    }
}
</script>
<style lang="">
    
</style>