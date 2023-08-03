<template>
  <div>
    <v-data-table :items="findProduct" :headers="tableHeaders">
    <!-- eslint-disable-next-line -->
    <!-- <template v-slot:item.productImagePath = "{ item }">
      <v-img :src="require(`@/assets/uploadImgs/${item.productImagePath}`)" 
        :width="50" :heigth="50" @click="productRead(item)"></v-img> -->
        <!-- <img :src="`@/home/ec2-user/deploy/kdt1-study-3-team3-front/image/${item.productImagePath}`" alt="이미지없다"
	        :width="50" :heigth="50" @click="productRead(item)"/> -->
    <!-- </template> -->
    <!-- eslint-disable-next-line -->
    <template v-slot:item.productName="{ item }">
      <td @click="handleCellClick(item)">{{ item.productName }}</td>
    </template>
    </v-data-table>
    <!-- <div>
      <input type="text" :value="searchTerm"
      @change="searchTerm = $event.target.value" placeholder="문의 제목을 입력하세요"/>
      <v-btn :small=true color="#f18893" raised @click="findProduct">검색</v-btn>
    </div> -->
    <!-- <div>
      <v-btn @click="accountCheck">상품 등록</v-btn>
    </div> -->
  </div>
</template>

<script>
import axiosInst from '@/utility/axiosInst';
import { mapActions, mapState } from 'vuex';

const productModule='productModule'

export default {
  methods:{
    ...mapActions(productModule, ['requestProductListToSpring']),
    productRead(item){
          this.$router.push({name: 'InquiryReadPage', params: {id:item.id}})
    },
    handleCellClick(item) { 
          this.$router.push({name: 'InquiryReadPage', params: {id:item.id}})
    },
    accountCheck(){
      const{ userToken } = this

      axiosInst.post('/account/businessCheck', { userToken })
      .then((res)=>{
        console.log("돌아오는 값: " + res.data)
        if(res.data === true){
          this.$router.push({ name: 'InquiryRegisterPage'})
        } else {
            alert("당신은 사업자가 아닙니다!") 
          }
      })
    },
  },
  mounted() {
    this.requestProductListToSpring()
    // 리스트 가져오는 거 실행
    this.userToken = localStorage.getItem("userToken")
    //로컬 스토리지의 유저 토큰 가져와라
  },
  computed:{
    ...mapState(productModule, ['products']),
    findProduct() {
      return this.products.filter((product) =>
        product.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  data() {
    return {
      userToken:'',
      tableHeaders: [
        // {text:'추가 이미지', value:'productImagePath'},
        {text:'문의 제목', value:'productName'},
        {text:'휴대폰 번호', value:'productPrice'},
        {text:'문의 내용', value:'productInfo'}], // 테이블 헤더 배열
      searchTerm:'',
    };
  }, 
}
</script>