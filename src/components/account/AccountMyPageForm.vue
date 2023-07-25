<template>
    <v-app>
        <v-container fluid>
            <v-row class="d-flex justify-center">
                <!-- 사이드바 -->
                <v-col cols="2">
                    <v-sheet class="pt-3 pb-6 pl-2 pr-2"
                        style="border-radius: 15px; margin: 20px; border: 1px solid #e0e0e0;">
                        <v-list>
                            <v-list-item v-for="link in links" :key="link.title">
                                <router-link :to="link.address" class="link" link>
                                    <v-btn text>
                                        {{ link.title }}
                                    </v-btn>
                                </router-link>
                            </v-list-item>
                        </v-list>
                    </v-sheet>
                </v-col>

                <!-- 메인 컨텐츠 -->
                <v-col cols="5">
                    <v-sheet class="pt-3 pb-6 pl-2 pr-2" style="border-radius: 15px;">
                        <v-card>
                            <v-card-title>{{ nickname }} 님</v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="6">
                                        <div class="subtitle-1">등록된 플레이리스트 수</div>
                                        <div class="headline">{{ playlistValue }}</div>
                                    </v-col>
                                    <v-col cols="6">
                                        <div class="subtitle-1">등록된 곡 수</div>
                                        <div class="headline">{{ songValue }}</div>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
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
            { title: "회원 탈퇴", address: "/account-withdraw-page" },
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
  
<style>
.link {
    padding: 12px;
    cursor: pointer;
    border-radius: 15px;
    transition: all 0.3s;
}

.link:hover {
    background-color: rgba(0, 0, 0, 0.04);
}

.headline {
    font-size: 24px;
    font-weight: 500;
}

.subtitle-1 {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.54);
    font-weight: 400;
}
</style>