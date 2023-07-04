<template lang="">
    <v-app-bar color="primary" app dark height="64">
        <!-- <v-app-bar-nav-icon @click="navigation_drawer = !navigation_drawer"/> -->
        <v-btn @click="goHome">
            <v-toolbar-title class="text-uppercase text--darken-4">
                <span>STOCK & CHAT</span>
            </v-toolbar-title>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn v-if="!isLogin" text @click="toLoginAndSignUpPage">
        <!-- <v-btn v-if="!isLogin" text @click="toLoginAndSignUpPage"></v-btn> -->
            <span>SignIn / SignUp</span>
            <v-icon right>mdi-login</v-icon>
        </v-btn>
        <v-btn v-if="isLogin" text @click="signOut">
        <!-- <v-btn v-if="isLogin" text @click="signOut"> -->
            <span>로그아웃</span>
            <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>

    </v-app-bar>
</template>

<script>

import 'vuetify/dist/vuetify.min.css'
import { mapActions, mapState } from 'vuex';

const accountModule = 'accountModule'

export default {
    data () {
        return {
            // navigation_drawer: false,
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
        // ...mapState(AccountModule, 'isLogin')
        
    },
    mounted () {
        this.isLoggedIn()      
    }
}
</script>
<style lang="">
    
</style>