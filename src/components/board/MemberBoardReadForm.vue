<template lang="">
    <div>
        <table 
        style="margin: 0 auto; width: 1000px;">
            <tbody>
                <tr>
                    <td class="table_title" >제목</td>
                    <td class="table_title_content">
                        <input type="text" :value="board?.title" readonly/>
                    </td>
                </tr>
                <tr>
                    <td class="table_title">닉네임</td>
                    <td class="table_title_content">
                        <input type="text" :value="board.member?.nickname" readonly/>
                    </td>
                </tr>
                <tr>
                    <td class="table_title">추천 카페</td>
                    <td class="table_title_content">
                        <input type="text" :value="board?.cafeTitle" readonly/>
                    </td>
                </tr>
                <tr>
                    <td class="table_title">등록일자</td>
                    <td class="table_title_content">
                        <input type="text" :value="board?.createDate" readonly/>
                    </td>
                </tr>
                <tr>
                    <td class="table_title">본문</td>
                    <td class="table_title_content">
                        <div contenteditable="true">
                            <v-img v-for="filePath in board?.filePathList" :key="filePath.fileId" :src="getImageUrl(filePath.imagePath)" style="width:20vw; aspect-ratio: auto"/>
                         </div>
                        <textarea cols="20" rows="30" :value="board?.content" readonly/>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
const memberModule='memberModule'

export default {
    props: { 
        board: {
            type: Object,
            required: true,
        },
        // filePathList: {
        //     type: Array,
        //     required: true,
        // }
    },
    data(){
        return{
            boardId: '',
            awsBucketName: process.env.VUE_APP_AWS_BUCKET_NAME,
            awsBucketRegion: process.env.VUE_APP_AWS_BUCKET_REGION,
            awsIdentityPoolId: process.env.VUE_APP_AWS_IDENTITY_POOLID,
            awsImagePath: ''
        }
    },
    methods:{
        getImageUrl(filePath){
        return `https://${this.awsBucketName}.s3.${this.awsBucketRegion}.amazonaws.com/${filePath}`
}
    },
    created(){
        this.$store.state.nickname
    },
    
    computed: {
        ...mapState(memberModule, ['nickname'])
    },
}
</script>

<style scoped>
input:focus,
textarea:focus {
  outline: none;
}

input, textarea{
    width:850px; 
    text-align: left;
}
textarea{
    height: 500px;
}
table {
  font-size: 1em;
  box-shadow: 0 2px 2px rgba(0,0,0,.15);
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  border: 1px solid rgba(0,0,0,.1);
}
  
 td, th {
  padding: 1em;
  /* white-space: nowrap;
  vertical-align: middle; */
}
  
 td {
  border-bottom: 1px solid rgba(0,0,0,.1);
  background: #fff;
}    

.table_title{
  font-weight: bold;
  border-right: 1px solid rgba(0,0,0,.1);
  text-align: center;
  width: 500px;
}
.table_title_content{
  /* width: 800px; */
  text-align: left;
}
</style>