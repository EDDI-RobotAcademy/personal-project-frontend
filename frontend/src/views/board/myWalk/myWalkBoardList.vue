<template lang="html">
    <v-container class="boardList">
        <h3 style="text-align: center;">나만의 산책로</h3>
        <v-btn @click="goRegister">등록</v-btn>
        <v-row v-if="boards && boards.length > 0">
            <v-col v-for="(item, index) in boards" :key="index" cols="3">
                <v-card class="card-item" @click="goRead(item.id)" style="height: 250px; width: 250px;"> 
                    <v-img src="https://korean.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=47563&fileTy=MEDIA&fileNo=1" height="66%"/>
                    <v-card-text height="34%">
                        {{ item.boardTitle }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <div v-else>
            데이터 로딩 중...
        </div>
    </v-container>
</template>
<script>
import router from '@/router';
const BoardModule = 'BoardModule';
import { mapActions, mapState } from 'vuex';

export default {
    computed:{
        ...mapState(BoardModule,['boards'])
    },
    data() {
        return {
            prevBoards: [] 
        }
    },
    methods: {
        ...mapActions(BoardModule, ['requestBoardListToSpring']),
        goRead(id) {
            router.push({
                name: 'myWalkBoardRead',
                params: { id }
            });},
        goRegister(){
            router.push('/myBoardRegister')
        },  
        consoleBoard(){
            console.log("보드 정보야 :"+this.boards)
        }
    },
    async created() {
        await this.requestBoardListToSpring()
  .then((data) => {
    this.consoleBoard()
  })
  .catch((error) => {
    throw(error)
  });


    },
    
    
}
</script>
<style lang="css">

.card-item:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
    transition: box-shadow 0.3s, transform 0.3s;
}
.boardList{
    max-width: 1000px;
}
</style>