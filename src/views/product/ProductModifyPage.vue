<template lang="">
  <div>
    <h2>상품 수정</h2>
    <product-modify-form v-if="product" :product="product" :product-id="productId" />
    <p v-else>상품 정보를 불러오는 중...</p>
  </div>
</template>

<script>
import ProductModifyForm from "@/components/product/ProductModifyForm.vue";
import { mapState } from "vuex";
const productModule = "productModule";

export default {
  components: {
    ProductModifyForm,
  },
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(productModule, ["product"]),
  },
};
</script>

<style lang=""></style>
