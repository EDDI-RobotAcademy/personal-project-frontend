<template lang="">
    <div>
        <form @submit.prevent="onSubmit">
            <table>
                <tr>
                    <td>제목</td>
                    <td>
                        <input type="text" v-model="title"/>
                    </td>
                </tr>
            </table>

            <div>
                <button type="submit">등록</button>
                <router-link :to="{ name: 'home' }">
                    취소
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '제목 입력',
        }
    },
    methods: {
        onSubmit() {
            const { title } = this
            this.$emit('submit', { title })
        }
    }
}
</script>

<style lang="">
    
</style>