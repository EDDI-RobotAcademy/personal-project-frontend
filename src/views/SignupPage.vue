<template lang="">
    <div>
        <NaviTest/>
        <div style="padding-top: 90px">
            <template>
                <div class="card" style="width: 350px; margin: auto;">
                    <img src="../assets/water.png" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">Sign Up</h5>
                        <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="signUpIdInput" placeholder="name@example.com">
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div class="form-floating mb-3">
                            <!-- <input type="password" class="form-control" style="height: 50px;" id="floatingPassword" placeholder="Password"> -->
                            <input type="password" class="form-control" id="signUpPasswordInput" placeholder="Password">

                            <label for="floatingPassword">Password</label>
                        </div>
                        <div class="form-floating">
                            <!-- <input type="password" class="form-control" style="height: 50px;" id="floatingPassword" placeholder="Password"> -->
                            <input type="password" class="form-control" id="signUpPasswordCheckInput" placeholder="Password">

                            <label for="floatingPassword">Password Check</label>
                        </div>
                        <button type="button" class="btn btn-outline-primary" style="margin-top: 10px;">Sign up</button>
                        <!-- <a href="#" class="btn" style="margin-top: 10px;">Sign up</a> -->
                    </div>
                </div>
    <!-- <v-container>
        <v-row justify="space-around">
        <v-card width="400">
            <v-img
            height="100px"
            src='../assets/water.png'
            >
            <v-app-bar
                flat
                color="rgba(0, 0, 0, 0)"
            >
                줄세개 설정바 
                    <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

                <v-toolbar-title class="text-h6 white--text pl-0">
                Sign up
                </v-toolbar-title>

                <v-spacer></v-spacer>

                
                    점세개
                    <v-btn
                color="white"
                icon
                >
                <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-app-bar>

            <v-card-title class="white--text mt-8">
                <v-avatar size="56">
                <img
                    alt="user"
                    src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
                >
                </v-avatar>
                <p class="ml-3">
                John Doe
                </p>
            </v-card-title>
            </v-img>

            <v-card-text>
            <div class="font-weight-bold mb-2">
                회원가입
            </div>
            <v-form ref="signupForm">
                <v-row>
                    <v-text-field placeholder="dkssud">
                        v-model="user_id"
                        label="id"
                    </v-text-field>
                    <v-text-field>
                        v-model="user_pw"
                        label="pw"
                    </v-text-field>
                    <v-text-field>
                        v-model="user_pw_check"
                        label="pw"
                    </v-text-field>
                </v-row>
            </v-form>

            타임라인 
                <v-timeline
                align-top
                dense
            >
                <v-timeline-item
                v-for="message in messages"
                :key="message.time"
                :color="message.color"
                small
                >
                <div>
                    <div class="font-weight-normal">
                    <strong>{{ message.from }}</strong> @{{ message.time }}
                    </div>
                    <div>{{ message.message }}</div>
                </div>
                </v-timeline-item>
            </v-timeline>
            </v-card-text>
        </v-card>
        </v-row>
    </v-container> -->
</template>          
        </div>
    </div>
</template>
<script>
import NaviTest from '@/components/NaviTest.vue'
export default {
    components: {
        NaviTest
    },
    // data() {
    //     return {
    //         messages: [
    //     {
    //       from: 'You',
    //       message: `Sure, I'll see you later.`,
    //       time: '10:42am',
    //       color: 'deep-purple lighten-1',
    //     },
    //     {
    //       from: 'John Doe',
    //       message: 'Yeah, sure. Does 1:00pm work?',
    //       time: '10:37am',
    //       color: 'green',
    //     },
    //     {
    //       from: 'You',
    //       message: 'Did you still want to grab lunch today?',
    //       time: '9:47am',
    //       color: 'deep-purple lighten-1',
    //     },
    //   ]
    //     }
    // },
}
</script>
<style lang="">
    
</style>