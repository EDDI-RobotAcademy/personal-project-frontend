<template lang="">
    <div>
        <v-card class="comments_card">
        <ul class="comments_ul">
        <li class="comments_li" v-for="comment in board.commentList">
            <p class="comments_name">
                <v-img class="logoImg" src="../../assets/icon/no_logo.png" />
              <span class="comments_nickname">{{ comment.member.nickname }} <br></span>
            <span class="comments_postdate">{{ comment.createdDate }} <br></span>
            </p>
                <div class="comments_content"> 
                    <span class="comments_description">{{ comment.text }} <br></span>
                    <div class="button_icon">
                    <button class="mr-1"><v-icon>mdi-note-edit-outline</v-icon></button>
                    <button><v-icon>mdi-alpha-x-circle-outline</v-icon></button>
                </div>
            </div>
          </li>
      </ul>
    </v-card>
    </div>
</template>
<script>
export default {
    props: { 
        board: {
            type: Object,
            required: true,
        },
    },
    data(){
        return{
            text:'',
        }
    },
}
</script>
<style scoped>
.comments_content{
    display: flex;
    flex-direction: row;
    text-align: right;
    justify-content: space-between;
}
.button_icon{
    margin-left: auto;
}
.comments_card{
    padding: 20px 0px;
    width: 1000px; 
    margin: 0px auto; 
    padding: 10px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.1), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 2px 0px rgba(0, 0, 0, 0.12)
}
.comments_ul{
    padding-left: 15px;
    padding-right: 15px;
}

.comments_li{
    list-style-type: none;
    border-bottom: 1px solid #e6e6eb;
    padding: 20px 0px 10px 0px;
}
.comments_description{
    font-size: 15px;
    color: #505050;
    display: block;
    font-weight: bold;
    padding-left: 30px;
}
.comments_name{
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    margin-bottom: 0px;
    /* justify-content: space-between; */
}
.logoImg{
      max-height: 30px; 
      max-width: 30px; 
      aspect-ratio: 1;
    }
.comments_nickname{
margin-right: 5px;

}
.comments_postdate{
color: grey;
font-size: 15px;
margin-left: auto;
}
</style>