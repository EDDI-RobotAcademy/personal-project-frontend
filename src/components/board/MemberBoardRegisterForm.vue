<template>
    <div>
        <form @submit.prevent="onSubmit">
            <h1 class="list_title_1">게시물 작성</h1>
            <table 
            style="margin: 10px; width:1000px; margin: 0 auto">
            <tbody>
                <tr>
                    <td class="table_title">제목</td>
                    <td colspan="3">
                        <input type="text" v-model="title"/>
                    </td>
                </tr>
                <tr>
                    <td  class="table_title">닉네임</td>
                    <td>
                        <p style="text-align: center; margin-bottom: 0; " disabled> {{ nickname }} </p>
                    </td>
                </tr>
                <tr>
                    <td  class="table_title">본문</td>
                    <td>
                        <textarea cols="20" rows="30" v-model="content"/>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">    
                        <div class="main-container">
                <div class="cafe-deal-information-container">
                    <div class="cafe-file-upload-wrapper">
                        <div v-if="!files.length" class="cafe-file-upload-example-container">
                            <div class="cafe-file-upload-example">
                                <div class="cafe-file-image-example-wrapper">이미지</div>
                                <div class="cafe-file-notice-item">
                                    추천하고싶으신 카페 실내, 외관 사진이나 메뉴판을 등록해주세요.
                                </div>
                                <div class="cafe-file-notice-item cafe-file-upload-button">
                                    <div class="image-box">
                                        <label for="file">사진 업로드</label>
                                        <input type="file" id="file" ref="files" @change="imageUpload" multiple />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="file-preview-content-container">
                            <div class="file-preview-container">
                                <div v-for="(file, index) in files" :key="index" class="file-preview-wrapper">
                                    <div class="file-close-button" @click="fileDeleteButton" :name="file.number">
                                        x
                                    </div>
                                    <img :src="file.preview" />
                                </div>
                                <div class="file-preview-wrapper-upload">
                                    <div class="image-box">
                                        <label for="file">추가 사진 등록</label>
                                        <input type="file" id="file" ref="files" @change="imageAddUpload" multiple />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        </td>
        </tr>
        </tbody>
            </table>
                <div style="margin: 10px; width:1100px; margin: 0 auto">
                    <div style="float:right; padding:1px">
                        <v-btn type="submit" color="primary" text>등록</v-btn> 
                        <router-link :to="{ name: 'MemberBoardListPage' }">
                        <v-btn color="primary" text>취소</v-btn> 
                        </router-link>
                    </div>
                
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

            randomFileName: [],
            files: [], 
            filesPreview: [],
            uploadImageIndex: 0 ,
            userToken: ''
        }
    },
    methods: {
            async onSubmit () {
            await this.uploadAwsS3()
            
            let boardInfo = {
                title: this.title,
                nickname: this.nickname,
                content: this.content,
                awsFileList: this.awsFileList,
                userToken: this.userToken
            }
            console.log(boardInfo.awsFileList)
            await this.$emit('submit', boardInfo)

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
            async uploadAwsS3(){
                this.awsS3Config()
                for(var i=0 ; i< this.$refs.files.files.length; i++ ){
                let f = this.$refs.files.files[i]
                const n = this.newFileName()+this.nickname+f.name   
                this.awsFileList.push(n)

                await this.s3.upload({
                    Key: n, 
                    Body: f, 
                    ACL: 'public-read'
                }, (err, data)=>{
                    if(err){
                        console.log(err)
                        return alert('업로드 중 문제 발생(사진파일에 문제가 있음)' + err.message)
                    }
                    // alert('업로드 성공')
                    
                })}
            },
            imageUpload() {
                let num = -1;
                for (let i = 0; i < this.$refs.files.files.length; i++) {
                    this.files = [
                        ...this.files,
                        {
                            file: this.$refs.files.files[i],
                            preview: URL.createObjectURL(this.$refs.files.files[i]),
                            number: i
                        }
                    ];
                    num = i;
                }
                this.uploadImageIndex = num + 1; 
                console.log(this.files);
            },
            newFileName(){
            return Math.random().toString().slice(2)
            },
            imageAddUpload() {
                let num = -1;
                for (let i = 0; i < this.$refs.files.files.length; i++) {
                    console.log(this.uploadImageIndex);
                    this.files = [
                        ...this.files,
                        {
                            file: this.$refs.files.files[i],
                            preview: URL.createObjectURL(this.$refs.files.files[i]),
                            number: i + this.uploadImageIndex
                        }
                    ];
                    num = i;
                }
                this.uploadImageIndex = this.uploadImageIndex + num + 1;

                console.log(this.files);
            },
            fileDeleteButton(e) {
                const name = e.target.getAttribute('name');
                this.files = this.files.filter(data => data.number !== Number(name));
            },
    },
    computed: {
        ...mapState(memberModule, ['nickname'])
    },
    created(){
        this.userToken=localStorage.getItem("userToken")
    }
};

</script>

<style scoped>
input:focus,
textarea:focus {
  outline: none;
}

input, textarea{
    width:900px; 
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
.table_title{
  font-weight: bold;
  border-right: 1px solid rgba(0,0,0,.1);
  text-align: center;
  width: 100px;
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
@import '../css/ImageRegisterTable.scss' 
</style>