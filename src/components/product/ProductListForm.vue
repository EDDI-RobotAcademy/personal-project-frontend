<template lang="">
  <div class="data_table">
    <h3>상품 목록</h3>
    <table style="margin: 10px">
      <tr>
        <th align="center" width="10%">상품 번호</th>
        <th align="center" width="30%">상품 이미지</th>
        <th align="center" width="10%">상품명</th>
        <th align="center" width="10%">상품 가격</th>
      </tr>
      <tr v-if="!products || (Array.isArray(products) && products.length === 0)">
        <td align="center" colspan="4">현재 등록된 게시물이 없습니다!</td>
      </tr>

      <tr v-else v-for="product in products" :key="product.productId">
        <td align="center">
          {{ product.productId }}
        </td>
        <td align="center">
          <router-link
            :to="{
              name: 'ProductReadPage',
              params: { productId: product.productId.toString() },
            }"
          >
            <img class="image-preview" :src="getImageToS3(product.productImageName)" />
          </router-link>
        </td>
        <td align="center">
          {{ product.productName }}
        </td>
        <td align="center">
          {{ product.productPrice }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
    },
  },
  methods: {
    getImageToS3(imageName) {
      return `https://vue-s3-3737.s3.ap-northeast-2.amazonaws.com/${imageName}`;
    },
  },
  async mounted() {
    this.getImageToS3();
  },
};
</script>

<style scoped>
.image-preview {
  object-fit: scale-down;
  max-width: 150px;
  max-height: 150px;
}
</style>
