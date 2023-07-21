<template lang="">
    <div>
        <myBoardModifyForm v-if="board" :board="board" @submit="onSubmit"/>
        <p v-else>로딩중</p>
    </div>
</template>
<script>
import myBoardModifyForm from '@/components/board/myBoardModifyForm.vue';
import { mapActions, mapState } from 'vuex';
const BoardModule ="BoardModule"
export default {
    components:{
        myBoardModifyForm
    },
    props: {
      id: {
        type: Number,
        required: true,
      },
    },
    computed:{
        ...mapState(BoardModule, ['board'])
    },
    methods: {
        ...mapActions(BoardModule,[
            'requestBoardModifyToSpring',
            'requestBoardToSpring'

    ]),    
        async onSubmit(payload){
            const {boardTitle, boardInfo} = payload
           const id= this.id;
        
           await this.requestBoardModifyToSpring({
            boardTitle, boardInfo ,id
           });

           await this.$router.push({
          name: "myWalkBoardRead",
          params: { id: this.id },
        });
        }
    },
    created(){
        this.requestBoardToSpring(this.id)
    
    }
}
</script>
<style lang="">
    
</style>