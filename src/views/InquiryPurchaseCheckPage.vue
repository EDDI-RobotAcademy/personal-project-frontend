<template lang="">
    <div>
        <h3>구매내역 조회</h3>
        <table style="margin: 10px;">
            <tr>
                <!-- <th align="center" width="40%">상품 이미지</th> -->
                <th align="center" width="20%">상품 이름</th>
                <th align="center" width="30%">상품 가격</th>
                <th align="center" width="60%">상품 정보</th>
            </tr>
            
            <tr v-if="!orderList || (Array.isArray(orderList) && orderList.length === 0)">
                <td colspan="3">
                    현재 등록된 게시물이 없습니다!
                </td>
            </tr>
            <tr v-else v-for="order in orderList" :key="order.productId">
                <!-- <td align="center">
                  <v-img :src="require(`@/assets/uploadImgs/${order.imageResourcePath}`)"
                   :width="100"  @click="productRead(order)"> -->
                   <!-- <v-img :src="`@/home/ec2-user/deploy/kdt1-study-3-team3-front/image/${order.imageResourcePath}`"
                   :width="100"  @click="productRead(order)"> -->
                  <!-- </v-img>
                </td> -->
                <td align="center">
                    {{ order.productName }}
                </td>
                <td align="center">
                    {{ order.productPrice }}
                </td>
                <td align="center">
                    {{ order.productInfo }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>

import axiosInst from '@/utility/axiosInst';
export default {
  data() {
    return {
      orderList: [],
    }
  },
  async mounted() {
    const orderList = await axiosInst.get('/orders/list', {
      params: {
        userToken: localStorage.getItem("userToken"),
      },
    }).then((res) => {
      this.orderList = res.data
    })
    console.log('orderList: ' + JSON.stringify(this.orderList))
    //await this.setData (product.data)
    console.log('size: ' + this.orderList.length)
  }
}
</script>

<style></style>