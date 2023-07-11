<template>
  <main class="mt-3">
    <div class="container">
      <h2 class="text-center mb-3">상품 등록</h2>
      <div class="mb-3 row">
        <label>상품명</label>
        <div class="col-md-9">
          <input type="text" class="form-control" v-model="product.product_name" />
        </div>
      </div>
      <div class="mb-3 row">
        <label>상품 가격</label>
        <div class="col-md-9">
          <div class="input-group">
            <input type="number" class="form-control" v-model="product.product_price" />
            <span class="input-group-text">원</span>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label>상품 설명</label>
        <div class="col-md-9">
          <textarea class="form-control" rows="7" v-model="product.product_description"></textarea>
        </div>
      </div>
      <div class="mb-3 row">
        <label>태그</label>
        <div class="col-md-9">
          <input type="text" class="form-control" v-model="product.tags" />
        </div>
      </div>
      <div class="mb-3 row">
        <div class="d-flex justify-content-between align-items-center">
          <div class="col-6 d-grid p-1">
            <button type="button" class="btn btn-lg btn-outline-dark" @click="goToList">
              취소
            </button>
          </div>
          <div class="col-6 d-grid p-1">
            <button type="button" class="btn btn-lg btn-outline-dark" @click="productInsert">
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      product: {
        product_name: "",
        product_price: 0,
        product_description: "",
        tags: "",
      },
    };
  },
  computed: {
    ...mapState("accountModule", ["email"]),
  },
  mounted() {
    this.userToken = localStorage.getItem("userToken");
    if (this.userToken == null) {
      alert("로그인을 해야 이용할 수 있습니다.");
      this.$router.push("/").catch(() => {});
    }
  },
  methods: {
    goToList() {
      this.$router.push("/").catch(() => {});
    },
    productInsert() {
      if (this.product.product_name == "") {
        return this.$swal("제품명을 입력해주세요!");
      }
      if (this.product.product_price == "" || this.product.product_price == 0) {
        return this.$swal("제품가격을 입력해주세요!");
      }
      if (this.product.product_description == "") {
        return this.$swal("제품설명을 입력해주세요!");
      }
      this.$swal
        .fire({
          title: "상품을 등록하시겠습니까?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "등록",
          cancelButtonText: "취소",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.$swal.fire("상품이 등록되었습니다!", "", "success");
            this.$router.push("/").catch(() => {});
            // $swal.fire("승인 완료");
          }
        });
    },
  },
};
</script>

<style scoped></style>
