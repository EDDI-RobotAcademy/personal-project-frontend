<template lang="">
    <v-container>
        <v-card>
        <v-card-title>Reported Comments</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="comment in reportedCommentList" :key="comment.id">
              <v-list-item-title>@{{ comment.author }}</v-list-item-title>
              <v-list-item style="font-size: 15px;"> {{ comment.content }}</v-list-item> 
              <v-btn @click="commentDelete(comment.id)">Delete</v-btn>
              <v-btn @click="rejectReport(comment.id)">Reject</v-btn>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
  
    </v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex';

const ProfileModule = 'ProfileModule'
const CommentModule = 'CommentModule'
export default {
    watch: {
    'reportedCommentList.length': {
      immediate: true,
      handler(newLength, oldLength) {
      
        if (newLength !== oldLength) {
         this.showComments();
        }
      },
    },
  },
    computed:{
        ...mapState(ProfileModule,['reportedCommentList'])
    },
    methods: {
        ...mapActions(ProfileModule,['requestReportedCommentListToSpring']),
        ...mapActions(CommentModule,['requestCommentDeleteToSpring','requestRejectReportCommentToSpring']),
        showComments(){
            this.requestReportedCommentListToSpring()
           
        },
        async rejectReport(id){
            this.requestRejectReportCommentToSpring(id)
            await this.showComments()
        },
        async commentDelete(id){
            this.requestCommentDeleteToSpring(id)
            await this.showComments()
        }

    },
    mounted() {
        this.showComments()
    },
    
}
</script>
<style lang="">
    
</style>