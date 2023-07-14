<template lang="">
    <div>
        <form @submit.prevent="onSubmit">
            <table>
                <tr>
                    <td>제목</td>
                    <td>
                        <input type="text" v-model="playlist.title"/>
                    </td>
                </tr>
            </table>

            <div>
                <button type="submit">수정하기</button>
                <router-link :to="{
                    name: 'PlaylistReadPage',
                    params: {id: playlist.id.toString()}
                    }"> 취소 </router-link>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        playlist: {
            type: Object,
            required: true,
        }
    },
    methods: {
        onSubmit() {
            const title = this.playlist.title
            this.$emit('submit', { title })
        }
    }
}
</script>

<style lang="">
    
</style>