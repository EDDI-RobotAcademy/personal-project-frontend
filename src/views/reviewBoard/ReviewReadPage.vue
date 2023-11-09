<template lang="">
    <div>
        <NaviTest />
        <div style="padding-top: 90px;"></div>
        <h4 style="text-align: center; margin: 30px; font-weight: bold; color: #83c1e7;;">Review</h4>
        <table class="table table-light" style="width: 800px; margin: auto; font-weight: 700;">
            <colgroup>
                <col width=20%>
                <col width=80%>
            </colgroup>
            <tbody>
                <tr>
                    <td class="table-warning">작성번호</td>
                    <td> {{ reviewBoard.id }} </td>
                </tr>
                <tr>
                    <td class="table-warning">작성자</td>
                    <td> {{ reviewBoard.userEmail }} </td>
                </tr>
                <tr>
                    <td class="table-warning">수질</td>
                    <td> {{ reviewBoard.starRating1 }}점 </td>
                </tr>
                <tr>
                    <td class="table-warning">시설</td>
                    <td> {{ reviewBoard.starRating2 }}점 </td>
                </tr>
                <tr style="height: 200px;">
                    <td class="table-warning">내용</td>
                    <td> {{ reviewBoard.content }} </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import NaviTest from "@/components/NaviTest.vue"
import { mapActions, mapState } from 'vuex';
const reviewModule = 'reviewModule'
export default {

    name: "ReviewReadPage",
    components: {
        NaviTest,
    },
    computed: {
        ...mapState(reviewModule, ['reviewBoard'])
    },
    methods: {
        ...mapActions(
            reviewModule, ['requestReviewBoardToSpring']
        ),
    },
    mounted() {
        const id = this.$route.params.id;
        console.log(id)
        this.requestReviewBoardToSpring(id)
    }
}
</script>
<style lang="">
    
</style>