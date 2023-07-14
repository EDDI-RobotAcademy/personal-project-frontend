<template lang="">
    <div>
        <myBoardRegisterForm @submit="onSubmit"/>
    </div>
</template>
<script>
import myBoardRegisterForm from '@/components/board/myBoardRegisterForm.vue'
const BoardModule = 'BoardModule'
import { mapActions } from 'vuex';
export default {
    components:{
        myBoardRegisterForm
    },
    methods: {
        ...mapActions(
            BoardModule,['requestBoardRegisterToSpring']
        ),
        async onSubmit(payload){
            const board = await this.requestBoardRegisterToSpring(payload)
            console.log('board : '+board);
        }
    },
}
</script>
<style lang="">
    
</style>