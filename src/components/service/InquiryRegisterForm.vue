<template lang="">
    <v-container class="container">
      <v-card id="productRegisterCard" justify-center>
      <h2>문의 등록</h2>
    <div>
      <v-card-text>
        <form @submit.prevent="onSubmit">
        <table id="productRegisterTable">
        <tr>
          <td style="font-weight: bold">문의 제목</td>
          <td>
            <v-text-field color="#f18893" type="text" class="inputValue" 
            v-model="productName" placeholder="제목을 입력하세요"/>
          </td>
        </tr> 
        <tr>
          <td style="font-weight: bold">전화번호</td>
          <td>
            <v-text-field type="text" class="inputValue" v-model="productPrice" step="10"
            color="#f18893" placeholder="번호를 입력하세요"/>
          </td>
        </tr>
        <tr>
          <td style="font-weight: bold">문의 내용</td>
          <td>
            <v-textarea class="inputValue" rows="4" v-model="productInfo" 
            color="#f18893" placeholder="내용을 상세히 입력하세요"/>
          </td>
        </tr>
        <p></p>
        <!-- <tr>
          <td style="font-weight: bold">이미지</td>
          <td>
            <input type="file" id="files" ref="files"
                    multiple @change="handleFileUpload"/>
          </td>
        </tr></br> -->
        <p></p>
        </table>
        <v-btn raised type="submit" color="#c4a7e7">등록</v-btn></br>
    </form>
  </v-card-text>
  </div>
  </v-card>

  </v-container>
</template>

<script>

import { mapActions } from 'vuex';

const productModule = 'productModule'

export default {
  data() {
    return {
      productName: '',
      productPrice: '',
      productInfo: '',
      files: '',
    }
  },
  methods: {
    ...mapActions(
      productModule, ['requestProductRegisterToSpring']
    ),

    async onSubmit() {
      let formData = new FormData()
      let aboutProduct = {
        productName: this.productName,
        productPrice: this.productPrice,
        productInfo: this.productInfo,
        userToken: localStorage.getItem("userToken")
      }

      for (let idx = 0; idx < this.files.length; idx++) {
        formData.append('productImg', this.files[idx])
      }

      formData.append(
        "aboutProduct",
        new Blob([JSON.stringify(aboutProduct)], { type: "application/json" })
      )

      this.$emit("submit", formData)
      await this.$router.push({ name: 'mainPage' })

    },
    handleFileUpload() {
      this.files = this.$refs.files.files
    },
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

#productRegisterCard {
  width: 600px;
  height: 550px;
  margin-top: 60px;
  padding-top: 20px;
}

.inputValue {
  outline: none;
  color: gray;
  width: 270px;
  font-weight: 300;
  font-size: 15px;
  padding: 8px 10px;
}
</style>