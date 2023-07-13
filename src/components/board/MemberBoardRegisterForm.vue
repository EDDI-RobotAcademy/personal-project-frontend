<template>
    <div>
        <form @submit.prevent="onSubmit">
            <h1 class="list_title_1">게시물 작성</h1>
            <table 
            style="margin: 10px; width:1000px; margin: 0 auto">
            <tbody>
                <tr>
                    <td>제목</td>
                    <td colspan="3">
                        <input type="text" v-model="title"/>
                    </td>
                </tr>
                <tr>
                    <td>닉네임</td>
                    <td colspan="3">
                        <p style="text-align: center; width:500px; margin-bottom: 0; " disabled> {{ nickName }} </p>
                    </td>
                </tr>
                <tr>
                    <td>본문</td>
                    <td colspan="3">
                        <textarea cols="20" rows="30" v-model="content"/>
                    </td>
                </tr>
                <tr>
                    <td>첨부파일</td>
                    <td style="width: 100px;">
                        <v-file-input v-model="awsFileList" multiple />
                    </td>    
                        
                </tr>
                <tr>
                    <td style="width: 50px; align-items: center; padding-right: 150PX;" colspan="4">
                        <div class="image-container">
                            <div v-for="(file, index) in awsFileList" :key="file.Key" class="image-item">
                                <img src="" alt="">
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

            <div style="float: right; position: relative; right: 200px; padding: 10px 0 10px 0;" >
                <v-btn type="submit" color="primary" text>등록</v-btn> 
                <router-link :to="{ name: 'MemberBoardListPage' }">
                <v-btn color="primary" text>취소</v-btn> 
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
import AWS from 'aws-sdk'
import { mapState } from 'vuex'
const memberModule='memberModule'

export default {
    data () {
        return {
            title: '제목을 입력하세요',
            content: '본문을 입력하세요',
            file: null,
            awsBucketName: process.env.VUE_APP_AWS_BUCKET_NAME,
            awsBucketRegion: process.env.VUE_APP_AWS_BUCKET_REGION,
            awsIdentityPoolId: process.env.VUE_APP_AWS_IDENTITY_POOLID,
            s3: null,
            awsFileList: [],
            startAfterAwsS3Bucket: null,
            awsS3NextToken: null, 
        }
    },
    methods: {
        onSubmit () {
            this.uploadAwsS3()
            let boardInfo = {
                title: this.title,
                nickName: this.nickName,
                content: this.content,
                awsFileList: this.awsFileList.map((imagePath)=>imagePath.name)
            }
            this.$emit('submit', boardInfo)
        },
        awsS3Config(){
            AWS.config.update({
                region: this.awsBucketRegion,
                credentials: new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: this.awsIdentityPoolId
                })
            })

            this.s3 = new AWS.S3({
                apiVersion: '2006-03-01',
                params: {
                    Bucket: this.awsBucketName
                }
            })
        },
        newFileName(){
            return Math.random().toString().slice()
        },
        uploadAwsS3(){
            this.awsS3Config()
            for(let i=0 ; i< this.awsFileList.length; i++ ){
            let f = this.awsFileList[i]    
            this.s3.upload({
                Key: f.name, 
                Body: f, 
                ACL: 'public-read'
            }, (err, data)=>{
                if(err){
                    console.log(err)
                    return alert('업로드 중 문제 발생(사진파일에 문제가 있음)' + err.message)
                }
                alert('업로드 성공')
                // this.getAwsS3Files()
                
            })}
        },
        deleteAwsS3File(key){
            this.awsS3Config()

            this.s3.deleteObject({
                Key: key
            }, (err, data) => {
                if(err){
                    return alert('AWS 버킷 데이터 삭제에 문제가 발생했습니다.: ' + err.message)
                }
            })
        }
    },
    created(){
        this.$store.state.nickName
    },
    computed: {
        ...mapState(memberModule, ['nickName'])
    },
    }

</script>

<style scoped>
input:focus,
textarea:focus {
  outline: none;
}

input, textarea{
    width:500px; 
    text-align: center;
}
textarea{
    height: 500px;
}

.list_title_1{
    min-height: 30px;
    margin: 40px 0 30px;
    text-align: center;
}
body {
  padding:1.1em;
  background: #f5f5f5
}

table {
  font-size: 1em;
  box-shadow: 0 2px 5px rgba(0,0,0,.25);
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
}
  
 td, th {
  padding: 1em;
  white-space: nowrap;
  vertical-align: middle;
}
  
 td {
  border-bottom: 1px solid rgba(0,0,0,.1);
  background: #fff;
}

.image-container {
  display: flex;
  flex-wrap: wrap;
}

.image-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
}
</style>