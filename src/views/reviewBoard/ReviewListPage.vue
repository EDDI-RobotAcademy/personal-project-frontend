<template>
    <div>
        <navi-test />
        <div style="padding-top: 90px;"></div>
        <h4 style="text-align: center; margin: 30px; font-weight: bold; color: #83c1e7;;">Reviews</h4>
        <hr />
        <review-list-form :reviewBoards="reviewBoards" />
        <hr />
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

const reviewModule = 'reviewModule'

import NaviTest from "@/components/NaviTest.vue"
import ReviewListForm from "@/components/reviewBoard/ReviewListForm.vue";
export default {
    components: {
        NaviTest,
        ReviewListForm
    },
    computed: {
        ...mapState(reviewModule, ['reviewBoards']),
        // output() {
        //     console.log('이게 뭐하는 거지..?')
    },
    mounted() {
        //vue의 action 호출
        this.requestReviewBoardListToSpring()
    },
    methods: {
        //vuex의 action을 method에 맵핑
        ...mapActions(
            reviewModule, ['requestReviewBoardListToSpring']
        )
    }
}

</script>
<style></style>