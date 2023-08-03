<template lang="">
  <div>
    <!-- Displaying product information if available -->
    <inquiry-read-form v-if="product" :product="product" />
    
    <!-- Display a loading message while waiting for the product data -->
    <p v-else>로딩중 ...</p>
    
    <!-- Buttons container -->
    <v-container fluid>
      <v-row justify="center">
        <!-- Delete Button -->
        <v-col cols="auto">
          <v-btn @click="productDelete" color="error" dark>삭제</v-btn>
        </v-col>
        
        <!-- Modify Button -->
        <v-col cols="auto">
          <v-btn @click="productModifyPage" color="primary" dark>수정</v-btn>
        </v-col>
      </v-row>
      
      <!-- Back to List Button -->
      <v-row justify="center">
        <v-col cols="1">
          <v-btn @click="productListPage" color="primary" dark>목록으로</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import InquiryReadForm from "@/components/service/InquiryReadForm.vue";

import { mapActions, mapState } from "vuex";
import router from "@/router";
import axiosInst from "@/utility/axiosInst";

const productModule = "productModule";

export default {
  name: "InquiryReadPage",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  components: {
    InquiryReadForm,
  },
  computed: {
    ...mapState(productModule, ["product"]),
  },
  methods: {
    ...mapActions(productModule, [
      "requestProductToSpring",
      "requestDeleteProductToSpring",
    ]),
    productListPage() {
      router.push("/InquiryListPage");
    },
    productModifyPage() {
      this.$router.push({ name: "InquiryModifyPage", params: { id: this.id } });
    },
    async productDelete() {
      if (!confirm("정말 삭제하시겠습니까?")) {
        console.log("삭제하지 않습니다.");
      } else {
        await alert("확인(예)을 누르셨습니다.");
        await this.requestDeleteProductToSpring(this.id);
        await this.productListPage();
      }
    },
    productOrder() {
      axiosInst
        .post("/orders/register", {
          productId: this.id,
          userToken: localStorage.getItem("userToken"),
        })
        .then((res) => {
          if (res.data === true) {
            router.push("/InquiryPurchaseCheckPage");
          } else {
            alert("사업자는 구매가 불가합니다!");
          }
        });
    },
  },
  created() {
    this.requestProductToSpring(this.id);
  },
};
</script>

<style lang=""></style>
