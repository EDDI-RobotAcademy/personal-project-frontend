<template lang="">
  <div>
    <h1>문의 내역</h1>
    <table>
      <tr>
        <td>문의 제목</td>
        <td>
          <input type="text" :value="product.productName" readonly />
        </td>
      </tr>
      <tr>
        <td>휴대폰 번호</td>
        <td>
          <input type="number" :value="product.productPrice" readonly />
        </td>
      </tr>
      <tr>
        <td>문의 내용</td>
        <td>
          <input type="text" :value="product.productInfo" readonly />
        </td>
      </tr>
      <!-- <tr>
        <td>상품 이미지</td>
      </tr> -->
    </table>
    <!-- <v-carousel>
            <v-carousel-item v-for="(imagePath, idx) in product.productImagesPathList" :key="idx">
              <v-img :src="require(`@/assets/uploadImgs/${imagePath}`)" aspect-ratio="1" class="grey lighten-2"> -->
                <!-- <v-img :src="`@/home/ec2-user/deploy/kdt1-study-3-team3-front/image/${imagePath}`" aspect-ratio="1" class="grey lighten-2"> -->
                <!-- <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"/>
                  </v-row>
                </template>
              </v-img>
            </v-carousel-item>
          </v-carousel> -->
  </div>
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
};
</script>
<style lang=""></style>