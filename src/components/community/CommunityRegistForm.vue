<template lang="">
    <div>
        <v-form @submit.prevent="onSubmit" ref="form">
            <v-container>
                <table>
                    <tr>
                        <v-text-field clearable label="Title" v-model="title" placeholder="제목을 입력하세요." style="width:500px;"/>
                    </tr>
                    <tr>
                        <v-textarea label="Content" variant="outlined" v-model="content" placeholder="내용을 입력하세요." outlined style="width:800px"/>
                    </tr>
                     <td>
                        <v-btn class="communityButton" style="float:right; margin-right: 10px;" type="submit">글 등록</v-btn>
                    </td>
                    <td>
                        <v-btn class="communityButton" style="float:right; " to="/community-page">돌아가기</v-btn>
                    </td>
                </table>
            </v-container>
        </v-form>
    </div>
</template>
<script>
export default {
    name: "CommunityRegistForm",
    data() {
        return {
            title: '',
            content: '',
        }
    },
    methods: {
        onsubmit() {
            const { title, content } = this
            this.$emit('submit', { title, content })
        }
    }
}
</script>
<style scoped>
.communityButton {
    background-color: black !important;
    color: white;
}
</style>