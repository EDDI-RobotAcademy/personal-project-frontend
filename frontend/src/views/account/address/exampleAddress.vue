<template lang="">
    <div>
       <form> 
        <input type="text" placeholder="우퍈반허" v-model="zonecode" readonly/>
        <v-btn id="postcode" @click="openPostcode">검색</v-btn><br/>
        <input type="text" v-model="roadAddress" placeholder="주소" readonly/><br/>
        <input type="text" v-model="detailAddress" placeholder="상세주소"/>
        <v-btn @click="showAddress">주소 보여줘!</v-btn>
        <span v-if="totalAddress!=null">{{totalAddress}}</span>
       </form></div>
</template>
<script>
export default {
    data() {
        return {
            zonecode: '',
            roadAddress:'',
            detailAddress:'',
            totalAddress:null
        }
    },
    methods: {
        openPostcode(){
            new window.daum.Postcode({
                oncomplete: (data)=>{
                    this.zonecode= data.zonecode;
                    this.roadAddress=data.roadAddress;
                },
            }).open()
        },
        showAddress(){
            this.totalAddress=this.zonecode+this.roadAddress
        }
    },
}
</script>
<style lang="">
    
</style>