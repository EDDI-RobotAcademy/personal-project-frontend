<template lang="">
  <div>
    <my-board-read-form v-if="board" :board="board" />
    <p v-else>로딩중 ...</p>

   
  </div>
</template>
<script>
import myBoardReadForm from '@/components/board/myBoardReadForm.vue';
const BoardModule = 'BoardModule';
import { mapActions, mapState } from 'vuex';
export default {
  name:"myWalkBoardRead",
  props:{
    id:{
      type: String,
      required:true
    }
  },
  components:{
    myBoardReadForm
  },
  computed:{
    ...mapState(BoardModule,['board'])
  },
  methods: {
    ...mapActions(BoardModule,['requestBoardToSpring']),
   

  },
  created(){
    this.requestBoardToSpring(this.id)
  }

  
}
</script>
<style lang="">
  
</style> 