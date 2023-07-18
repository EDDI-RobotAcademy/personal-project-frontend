<template lang="">
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card class="mx-auto pa-12 pb-8" elevation="8" width="auto" rounded="lg">
          <h2 class="text-center mb-3">상품 상세 페이지</h2>

          <div class="text-subtitle-1 text-medium-emphasis">
            상품 이미지
            <div id="imagePreview">
              <img class="product-image" id="img" :src="getImageToS3(product.productImageName)" />
            </div>
          </div>

          <div class="text-subtitle-1 text-medium-emphasis">
            상품명
            <v-text-field
              outlined
              prepend-inner-icon="mdi-card-text-outline"
              :value="product.productName"
              readonly
            />
          </div>

          <div class="text-subtitle-1 text-medium-emphasis">
            가격
            <v-text-field
              outlined
              prepend-inner-icon="mdi-currency-krw"
              :value="product.productPrice"
              readonly
            />
          </div>

          <div class="text-subtitle-1 text-medium-emphasis">
            상품 설명
            <v-textarea
              outlined
              prepend-inner-icon="mdi-comment-text-outline"
              :value="product.productDescription"
              readonly
            />
          </div>

          <div class="text-subtitle-1 text-medium-emphasis">
            태그
            <v-text-field
              outlined
              prepend-inner-icon="mdi-label-outline"
              :value="product.productTags"
              readonly
            />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ProductReadForm",
  props: {
    product: {
      type: Object,
      required: true,
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
.product-image {
  text-align: center;
  object-fit: scale-down;
  max-width: 300px;
  max-height: 300px;
}
</style>
