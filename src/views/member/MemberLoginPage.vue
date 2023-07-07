<template lang="">
    <div>
        <member-login-form @submit="onSubmit"/>
    </div>
</template>
<script>
import MemberLoginForm from '@/components/member/MemberLoginForm.vue';
import { mapActions } from "vuex";

const memberModule = 'memberModule'
export default {
    components:{
        MemberLoginForm
    },
    methods: {
        ...mapActions(memberModule, ['requestSpringToLogin']),
        async onSubmit (payload) {
            await this.requestSpringToLogin(payload)
              .then(()=>{
                this.$router.push('/')
              })
        }
    }
    
}
</script>
<style lang="">
    
</style>