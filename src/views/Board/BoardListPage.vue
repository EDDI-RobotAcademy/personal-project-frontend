<template>
    <div>
        <navi-test />
        <div style="padding-top: 90px;"></div>
        <h4>Board List Page</h4>
        <board-list-from />
    </div>
</template>
<script>
import NaviTest from "@/components/NaviTest.vue"
import BoardListFrom from "@/components/board/BoardListFrom.vue";
export default {
    components: {
        NaviTest,
        BoardListFrom
    }
}
</script>
<style></style>