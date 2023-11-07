<template>
    <div>
        <div style="padding-top: 90px">
            <div class="card boardBack">
                <!-- <input class="form-control boardContentBox" type="text" value="제목" aria-label="readonly input example"
                    readonly> -->
                <br />
                <!-- <input class="form-control boardContentBox" type="text" value="board.title" readonly>
                <input class="form-control boardContentBox" type="text" value="board.userEmail" readonly>
                <input class="form-control boardContentBox" type="text" value="board.content" readonly> -->
                <!-- <form @submit.prevent="onSubmit"> -->
                <!-- <table>
                    <tr>
                        <td>
                            {{ board.title }}
                        </td>
                        <td>
                            {{ board.userEmail }}
                        </td>
                        <td>
                            {{ board.content }}
                        </td>
                    </tr>

                </table> -->
                <!-- </form> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "BoardReadForm",
    props: {
        board: {
            type: Object,
            required: true,
        }
    },
    // data() {
    //     return {
    //         boardId: '',
    //         title: '',
    //         userEmail: '',
    //         content: ''
    //     }
    // },
}
</script>
<style>
.boardBack {
    margin: auto;
    margin-bottom: 20px;
    width: 800px;
    height: 900px;

}

.boardContentBox {
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 600px;
}
</style>