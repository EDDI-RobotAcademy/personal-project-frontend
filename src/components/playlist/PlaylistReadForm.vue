<template lang="">
    <div>
        <table v-if="playlist.playlist">
            <tr>
                <td>플레이리스트 번호</td>
                <td>
                    <input type="text" :value="playlist.playlist.id" readonly/>
                </td>
            </tr>
            <tr>
                <td>이름</td>
                <td>
                    <input type="text" :value="playlist.playlist.title" readonly/>
                </td>
            </tr>
        </table>
        <table v-if="playlist.songList">
            <tr> 목록 </tr>
            <tr v-for="songList in playlist.songList" :key="songList.title">
                <router-link :to="{
              name: 'SongReadPage',
              params: { id: songList.id.toString()}
            }">
                <td>{{songList.id}}. {{songList.title}}</td>
            </router-link>
            </tr>
        </table>
        <div v-if="playlist.playlist">
            <router-link :to="{
                name: 'SongRegisterPage',
                params: {playlistId: playlist.playlist.id}}">
            노래 등록
            </router-link>
    </div>
    </div>
</template>
<script>
export default {
    props: {
        playlist: {
            type: Object,
            required: true,
        }
    }
}
</script>
<style lang="">
    
</style>