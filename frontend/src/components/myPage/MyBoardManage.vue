<template lang="html">
    <v-container class="boardList">
      
        <v-row v-if="myBoards && myBoards.length > 0">
            <v-col v-for="(item, index) in myBoards" :key="index" cols="4">
                <v-card class="card-item" @click="goRead(item.id)" style="height: 250px; width: 226px;"> 
                    <v-img :src="dynamicLink(item.imgPath)" height="66%"/>
                    <v-card-text style="font-weight:900; height:16%;font-size: 20px;"  >
                        {{ item.boardTitle }}
                    </v-card-text>
                    <v-card-text style="text-align:center;font-weight:500; height:18%;font-size: 20px;"  >
                      <span class="mdi mdi-walk"></span>{{ item.view }} <span style="margin-left: 10px;" class="mdi mdi-text-box-check-outline"></span> {{ item.comments }}
                    </v-card-text>
                </v-card>
            </v-col>
            
        </v-row>
        
        <div v-else>
           
        </div>
    </v-container>
</template>
<script>
import router from '@/router';
const ProfileModule = 'ProfileModule';
import { mapActions, mapState } from 'vuex';
const LINK = process.env.VUE_APP_S3_LINK
export default {
    computed:{
        ...mapState(ProfileModule,['myBoards'])
    },
    data() {
        return {
            prevBoards: [] ,
            userToken:'',
            link:LINK
        }
    },
    methods: {
        ...mapActions(ProfileModule, ['requestMyBoardListToSpring']),
        goRead(id) {
            router.push({
                name: 'myWalkBoardRead',
                params: { id }
            });
        }, dynamicLink(extraPath) {
      return `${this.link}/${extraPath}`;
    },
        async fetchData() {
            this.userToken = localStorage.getItem('userToken'); // Retrieve userToken from localStorage
            console.log(this.userToken);
            const payload = { userToken: this.userToken };
            await this.requestMyBoardListToSpring(payload);
        }
    },
    async created() {
        await this.fetchData();
    }
}
</script>
<style lang="css">

.card-item:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
    transition: box-shadow 0.3s, transform 0.3s;
}
.boardList{
    width: 1200px;
    
}
</style>