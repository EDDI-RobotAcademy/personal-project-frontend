<template lang="">
    <div>
        <h1 class="list_title">나만의 카페 공유</h1>
            <div class="btn_router_div">
                <v-container class="btn_container">
                    <input autocomplete="off" 
                        placeholder="Search" type="text"
                        v-model="keyword" 
                        @keyup.enter="searchToSpring"
                        />
                       <v-btn
                        outlined
                        color="black"
                        @click="writeBoard"
                        style="float: right"
                        >게시글 쓰기
                        </v-btn>
                </v-container>
            </div>
        <div>
            <member-board-list-form :boards="boards"/>
        </div>
    </div>
</template>

<script>
import MemberBoardListForm from '../../components/board/MemberBoardListForm.vue';

import { mapActions, mapState } from 'vuex';

const boardModule = 'boardModule'

export default {
    data(){
        return{
            keyword:'',
            userToken: ''
        }
    },
    components:{
        MemberBoardListForm
    },
    computed: { 
        ...mapState(boardModule, ['boards']),
    },
    mounted () {
        this.requestBoardListToSpring()
        this.userToken = localStorage.getItem("userToken")
    },
    methods: {
        ...mapActions(
            boardModule, ['requestBoardListToSpring','requestSearchTextToSpring']
        ),
        searchToSpring(){
            const payload = { params: { keyword: this.keyword } };
            this.requestSearchTextToSpring(payload)
        },
        writeBoard(){
            if(this.userToken){
                this.$router.push('/member-board-register-page')
            }
            else{
                alert("로그인 후 이용하세요") 
            }
        },

    },
}
</script>
<style scoped>
.list_title{
    min-height: 30px;
    margin: 40px 0 0px;
    text-align: center;
}
.btn_router_div{
    justify-content: center; 
    display: flex;
}
.btn_container{
    display: inline-block; 
    width:1000px;
}
input:focus{
  outline: none;
}
input{
    width: 200px;
    border-radius: 5px;
    padding: 10px;
    /* border: rgb(173, 173, 173) solid; */
}
</style>