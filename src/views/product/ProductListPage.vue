<template lang="">
  <div>
    <h2>상품 목록 페이지</h2>
    <div style="text-align: left; margin: 15px">
      <router-link :to="{ name: 'ProductRegisterPage' }"> 상품 등록 </router-link>
    </div>
    <product-list-form :products="products" />
    <p>{{ output }}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ProductListForm from "@/components/product/ProductListForm.vue";
const productModule = "productModule";

export default {
  components: { ProductListForm },
  data() {
    return {};
  },
  computed: {
    ...mapState(productModule, ["products"]),
    output() {
      console.log("이런식으로 활용도 가능");
    },
  },
  mounted() {
    this.requestProductListToSpring();
  },
  methods: {
    ...mapActions(productModule, ["requestProductListToSpring"]),
  },
};
</script>

<style lang=""></style>
