<template lang="">
    <div>
        <form @submit.prevent="onSubmit">
            <h1수정폼</h1>
            <table class="detailbox1">
                <tr>
                    <td class="textstyle1">문의 번호</td>
                    <td>
                        <input type="number" :value="product.id" disabled/>
                    </td>
                </tr>
                <tr>
                    <td class="textstyle1">문의 제목</td>
                    <td>
                        <input type="text" v-model="productName"/>
                    </td>
                </tr>
                <tr>
                    <td class="textstyle1">휴대폰 번호</td>
                    <td>
                        <input type="number" v-model="productPrice">
                    </td>
                </tr>
                <tr>
                    <td class="textstyle1">문의 내용</td>
                    <td>
                        <input type="text" v-model="productInfo">
                    </td>
                </tr>
            </table>
            <div>
                <button type="submit" class="detailbox1" color="#f18893">수정완료</button>
                <v-btn @click="cancelBnt" class="detailbox1" color="#f18893">수정완료</v-btn>
                <router-link :to="{
                    name: 'ProductReadPage',
                    params: { id: product.id }
                }">
                취소
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: true,
        }
    },
    data () {
        return {
            productName: '',
            productPrice: 0,
            productInfo: '',
        }
    },
    created () {
        this.productName = this.product.productName
        this.productPrice = this.product.productPrice
        this.productInfo = this.product.productInfo
    },
    methods: {
        onSubmit () {
            const { productName, productPrice, productInfo } = this
            this.$emit('submit', { productName, productPrice, productInfo})
        },
        cancelBnt() {
            this.router.push({
                name: 'ProductReadPage',
                params: {id: product.id}
            })
        }
    }
}
</script>
<style scoped>
    .detailbox1 {
    margin: 70px;
    }
    table td {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 5px;
    }
    .textstyle1 {
    color: #f18893;
    font-weight: bold;
    }
    
</style>