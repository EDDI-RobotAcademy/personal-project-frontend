<template lang="">
    <div>
        <form @submit.prevent="onSubmit">
        <table 
        style="margin: 0 auto; width: 1000px;">
            <tbody>
                <tr>
                    <td class="table_title" >제목</td>
                    <td class="table_title_content">
                        <input type="text" v-model="board.title"/>
                    </td>
                </tr>
                <tr>
                    <td class="table_title">닉네임</td>
                    <td class="table_title_content">
                        <input type="text" :value="board.member?.nickname" disabled/>
                    </td>
                </tr>
                <tr>
                    <td class="table_title" >추천 카페</td>
                    <td class="table_title_content">
                        <input type="text" v-model="board.cafeTitle"/>
                    </td>
                </tr>
                <tr>
                    <td class="table_title">등록일자</td>
                    <td class="table_title_content">
                        <input type="text" :value="board.createDate" disabled/>
                    </td>
                </tr>
                <tr>
                    <td class="table_title">본문</td>
                    <td class="table_title_content">
                         <div v-for="filePath in board?.filePathList" :key="filePath.fileId" class="file-preview-wrapper">
                                    <div class="file-close-button" @click="fileDeleteButton" :name="filePath.fileId">
                                        x
                                    </div>
                                    <img :src="getImageUrl(filePath.imagePath)" style="width:20vw; aspect-ratio: auto" />
                                </div>
                        <textarea cols="20" rows="30" v-model="board.content"/>
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
                                                카페 실내, 외관 사진이나 메뉴판을 등록해주세요.
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
                                                <div class="file-close-button" @click="fileDeleteButton2" :name="file.number">
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
        </form>
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
        userToken:{
            type: String,
            required: true,
        }
    },
    data(){
        return{
            boardId: '',
            awsBucketName: process.env.VUE_APP_AWS_BUCKET_NAME,
            awsBucketRegion: process.env.VUE_APP_AWS_BUCKET_REGION,
            awsIdentityPoolId: process.env.VUE_APP_AWS_IDENTITY_POOLID,
            awsImagePath: '',
            title: '',
            content: '',
            nickname: '',
            createDate: '',
            cafeTitle: '',
            awsFileList: [],

            randomFileName: [],
            files: [], 
            filesPreview: [],
            uploadImageIndex: 0 ,
            deleteFileList: [],
            // userToken:''

        }
    },
    methods:{
        getImageUrl(filePath){
        return `https://${this.awsBucketName}.s3.${this.awsBucketRegion}.amazonaws.com/${filePath}`
        },
        async onSubmit () {
            await this.uploadAwsS3()
            await this.s3fileDelete()
            
            let boardInfo = {
                title: this.board.title,
                nickname: this.board.member.nickname,
                content: this.board.content,
                awsFileList: this.awsFileList,
                userToken: this.userToken,
                cafeTitle: this.board.cafeTitle
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
        async uploadAwsS3(){
                if (!this.$refs.files) {
                    console.log("File input not found.");
                    return;
                }
                this.awsFileList.push(...(this.board.filePathList.map((file)=>file.imagePath)))
                console.log("수정전 이미지", this.awsFileList)
                this.awsS3Config()
                for(var i=0 ; i< this.$refs.files.files.length; i++ ){
                let newfileList = this.$refs.files.files[i]
                const newImgName = this.newFileName()+this.board.member.nickname+newfileList.name
                // console.log("합치기전",Object.values(f))
                this.awsFileList.push(newImgName)
                console.log("이미지 추가", this.awsFileList)
                await this.s3.upload({
                    Key: newImgName, 
                    Body: newfileList, 
                    ACL: 'public-read'
                }, (err, data)=>{
                    if(err){
                        console.log(err)
                        return alert('업로드 중 문제 발생(사진파일에 문제가 있음)' + err.message)
                    }
                    // alert('업로드 성공')
                })}
            },
        async fileDeleteButton(e) {
            const a = e.target.getAttribute("name")
            this.deleteFileList = await this.board.filePathList.filter(filePath=>filePath.fileId === Number(a))
            //기존 이미지에서 지울 사진
            this.board.filePathList = await this.board.filePathList.filter(filePath => filePath.fileId !== Number(a));
            //기존 이미지에서 남은 사진
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
        },
        fileDeleteButton2(e) {
            const name = e.target.getAttribute('name');
            this.files = this.files.filter(data => data.number !== Number(name));
        },
        s3fileDelete(){
            this.awsS3Config()
            for(let i=0 ; i< this.deleteFileList.length; i++ ){
                console.log("aws3에서 사진 지우기", this.deleteFileList[i].imagePath)
            this.s3.deleteObject({
                Key: this.deleteFileList[i].imagePath
            }, (err, data) => {
                if(err){
                    return alert('AWS 버킷 데이터 삭제에 문제가 발생했습니다.: ' + err.message)
                }
            })
        }
    }
    },
    created(){
        this.filePathList=this.board.filePathList
        this.nickname = this.board.nickname
        this.title = this.board.title
        this.content = this.board.content
        this.createDate = this.board.createDate
        this.cafeTitle = this.board.cafeTitle
        this.$EventBus.$on('fetchData', () => {
        this.onSubmit();
    })
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
.main-container {
            width: 1000px;
            height: 400px;
            margin: 0 auto;
}
        
.cafe-deal-information-container {
    color: #222222;
    border: 1px solid #dddddd;
    
}

.cafe-deal-information-title {
    text-align: center;
    font-size: 18px;
    line-height: 60px;
    border-bottom: 1px solid #dddddd;
}

.cafe-deal-information-content-wrapper {
    min-height: 50px;
    display: flex;
}

.cafe-deal-informtaion-content-title {
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    background-color: #f9f9f9;
}

.cafe-deal-information-content {
    width: 100%;
    font-size: 14px;
}

.cafe-deal-option-selector {
    display: flex;
    align-items: center;
    padding: 15px;
}

.cafe-deal-option-item {
    width: 100px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #cccccc;
    border-radius: 5px;
    cursor: pointer;
}

.cafe-deal-option-item:last-child {
    margin-left: 10px;
}

.cafe-deal-option-notice {
    margin-left: auto;
    font-size: 14px;
    color: #888888;
}

.cafe-deal-option-item-deposit {
    margin-left: 10px;
}

.cafe-deal-information-wrapper {
    display: flex;
    flex-direction: column;
}

.cafe-deal-information-option {
    padding: 10px;
    display: flex;
    align-items: center;
}

.cafe-deal-information-option:last-child {
    border-bottom: 1px solid #dddddd;
}

.cafe-deal-information-item-type {
    font-size: 13px;
    color: #fff;
    background-color: #61b6e5;
    min-width: 50px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
}

.cafe-deal-information-item-wrapper {
    display: flex;
    align-items: center;
    margin-left: 10px;
    height: 46px;
    width: 100%;
}

.cafe-deal-information-item-wrapper>input {
    border: 1px solid #dddddd;
    width: 140px;
    height: 100%;
    padding: 0 15px;
    font-size: 15px;
}

.cafe-deal-inforamtion-won {
    margin: 0 10px;
}

.cafe-deal-information-example {
    color: #888888;
}

.cafe-deal-information-option:not(:first-child) {
    margin-top: 10px;
}

.cafe-deal-inforamtion-divide {
    font-size: 22px;
    margin: 0 8px;
    color: #222222;
    font-weight: 100;
}

.cafe-deal-close-button-wrapper {
    margin-left: auto;
    cursor: pointer;
}

.cafe-deal-close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    background-color: #666666;
    color: rgb(220, 220, 220);
}

.cafe-deal-cliked {
    background-color: rgb(235, 235, 235);
    color: rgb(170, 170, 170);
}

.cafe-file-upload-example {
    height: 100%;
}

.cafe-write-content-container {
    border-top: 1px solid #dddddd;
    min-height: 260px;
}

.cafe-picture-notice {
    margin: 20px;
    padding: 20px 40px;
    border: 1px solid #dddddd;
}

.file-preview-content-container {
    height: 100%;
}

.cafe-file-upload-wrapper {
    margin: 20px;
    border: 1px solid #dddddd;
    background-color: #f4f4f4;
    min-height: 350px;
    font-size: 15px;
    color: #888888;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.cafe-file-upload-example-container {
    display: flex;
    align-items: center;
    justify-content: center;
    /* height: 100%;
width: 100%; */
}

.cafe-file-image-example-wrapper {
    text-align: center;
}

.cafe-file-notice-item {
    margin-top: 5px;
    text-align: center;
}

.cafe-file-notice-item-red {
    color: #ef4351;
}

.image-box {
    margin-top: 30px;
    padding-bottom: 20px;
    text-align: center;
}

.image-box input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
}

.image-box label {
    display: inline-block;
    padding: 10px 20px;
    background-color: #232d4a;
    color: #fff;
    vertical-align: middle;
    font-size: 15px;
    cursor: pointer;
    border-radius: 5px;
}

.file-preview-wrapper {
    padding: 10px;
    position: relative;
}

.file-preview-wrapper>img {
    position: relative;
    width: 190px;
    height: 130px;
    z-index: 10;
}

.file-close-button {
    position: absolute;
    /* align-items: center; */
    line-height: 18px;
    z-index: 99;
    font-size: 18px;
    right: 5px;
    top: 10px;
    color: #fff;
    font-weight: bold;
    background-color: #666666;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
}

.file-preview-container {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
}

.file-preview-wrapper-upload {
    margin: 10px;
    padding-top: 20px;
    background-color: #888888;
    width: 190px;
    height: 130px;
}

.cafe-write-button-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #222222;
}

.cafe-write-button-wrapper>div {
    width: 160px;
    height: 50px;
    border: 1px solid #dddddd;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    cursor: pointer;
}

.cafe-write-button {
    margin-left: 15px;
    color: #fff;
    background-color: #1564f9;
}

.cafe-write-button:hover {
    opacity: 0.8;
}
</style>