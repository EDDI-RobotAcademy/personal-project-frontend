<template>
    <v-app>
        <v-main class="grey lighten-4">
            <v-container style="padding-left: 400px;">
                <v-row :style="{ width: '1200px' }">
                    <v-col cols="2">
                        <v-sheet rounded="lg">
                            <v-list>
                                <v-list-item v-for="link in links" :key="link.title" :to="link.address" link>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{ link.title }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-sheet>
                    </v-col>

                    <v-col>
                        <v-sheet min-height="70vh" width="700px" class="grey lighten-4">
                            <div>
                                {{ nickname }} 님
                            </div>
                            <div>
                                <p>등록된 플레이리스트 수</p>
                                {{ playlistValue }}
                            </div>
                            <br>
                            <div>
                                <p>등록된 곡 수</p>
                                {{ songValue }}
                            </div>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
  
<script>
import { mapActions } from 'vuex';

const playlistModule = 'playlistModule'
const songModule = 'songModule'

export default {
    data: () => ({
        links: [
            { title: "내 정보 홈", address: "/account-my-page" },
            { title: "회원 정보 수정", address: "/account-password-check-page" },
            { title: "플레이리스트 관리", address: "/playlist-list-manage-page" },
            { title: "회원 탈퇴", address: "/account-withdrawal-page" },
        ],
        playlistValue: 0,
        songValue: 0,
        nickname: '',
    }),
    methods: {
        ...mapActions(playlistModule, ['requestPlaylistCountToSpring']),
        ...mapActions(songModule, ['requestSongCountToSpring']),

    },
    async created() {
        this.playlistValue = await this.requestPlaylistCountToSpring()
        this.songValue = await this.requestSongCountToSpring()
        this.nickname = localStorage.getItem("nickname")
    },
}
</script>