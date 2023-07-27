<template>
    <div>
        <form @submit.prevent="onSubmit" id="signupInfo">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" v-model="title" id="title" placeholder="title">
                <label for="floatingInput">Title</label>
            </div>
            <div class="form-floating mb-3">
                <input type="content" class="form-control" v-model="content" id="content" placeholder="content"
                    style="height: 400px;">

                <label for="floatingPassword">Content</label>
            </div>
        </form>
        <div>
            <button type="submit" class="btn btn-outline-primary" style="margin-top: 10px;" @click="onSubmit">
                등록
            </button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            title: '',
            content: ''
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
<style></style>