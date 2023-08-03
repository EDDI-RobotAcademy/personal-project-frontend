<template lang="">
    <div>
      <inquiry-modify-form v-if="product" :product="product" @submit="onSubmit" />
      <p v-else>로딩중 ...</p>
    </div>
  </template>
  <script>
  import InquiryModifyForm from "@/components/service/InquiryModifyForm.vue";
  import { mapActions, mapState } from "vuex";
  
  const productModule = "productModule";
  
  export default {
    name: "ProductModifyPage",
    components: {
      InquiryModifyForm,
    },
    props: {
      id: {
        type: Number,
        required: true,
      },
    },
    computed: {
      ...mapState(productModule, ["product"]),
    },
    methods: {
      ...mapActions(productModule, [
        "requestProductToSpring",
        "requestModifyProductToSpring",
      ]),
      async onSubmit(payload) {
        const { productName, productPrice, productInfo } = payload;
        const id = this.id;
  
        await this.requestModifyProductToSpring({
          productName,
          productPrice,
          productInfo,
          id,
        });
        await this.$router.push({
          name: "InquiryReadPage",
          params: { id: this.id },
        });
      },
    },
    created() {
      this.requestProductToSpring(this.id);
    },
  };
  </script>
  <style lang=""></style>