<template>
    <div>
        <table style="margin: 30px">
            <!-- 1줄 -->
            <tr class="textCenter">
                <th width="2%">번호</th>
                <th width="10%">수영장 이름</th>
                <th width="2%">수질 별점</th>
                <th width="2%">시설 별점</th>
                <th width="2%">작성자</th>
            </tr>
            <tr v-for="reviewBoard in reviewBoards" :key="reviewBoard.id" class="textCenter">
                <td>{{ reviewBoard.id }}</td>
                <td>{{ reviewBoard.placeName }}</td>
                <td>{{ reviewBoard.starRating1 }}</td>
                <td>{{ reviewBoard.starRating2 }}</td>
                <td>{{ reviewBoard.userEmail }}</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    props: {
        reviewBoards: {
            type: Array
        }
    }
}
</script>
<style>
.textCenter {
    text-align: center;
}
</style>