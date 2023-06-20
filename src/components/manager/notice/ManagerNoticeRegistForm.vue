<template lang="">
    <div>
        <v-form @submit.prevent="onSubmit" ref="form">
            <v-container>
                <v-table>
                    <tr>
                        <v-text-field clearable label="Title" v-model="title" placeholder="제목을 입력하세요." style="width:500px;"/>
                    </tr>

                    <tr>
                        <v-textarea label="Content" variant="outlined" v-model="content" placeholder="내용을 입력하세요." outlined style="width:800px"/>
                    </tr>

                     <td>
                        <v-btn class="noticeButton" style="float:right; margin-right: 10px;" type="submit">글 등록</v-btn>
                    </td>

                    <td>
                        <v-btn class="noticeButton" style="float:right; " to="/manager-notice-list-page">돌아가기</v-btn>
                    </td>
                </v-table>


            </v-container>

        </v-form>
    </div>
</template>
<script>
export default {
    name: "ManagerNoticeRegistForm",
    data() {
        return {
            title: '',
            content: '',
        }
    },
    methods: {
        onSubmit() {
            const { title, content } = this
            this.$emit('submit', { title, content })
        }
    }
}
</script>
<style scoped>
.noticeButton {
    background-color: black !important;
    color: white;
}
</style>