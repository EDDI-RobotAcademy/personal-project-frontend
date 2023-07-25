<template>
    <div>
        <NaviTest />
        <div style="padding-top: 90px">
            <div class="card" style="width: 350px; margin: auto;">
                <img src="../assets/water.png" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Login</h5>
                    <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="loginIdInput" placeholder="name@example.com">
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating mb-3">
                        <!-- <input type="password" class="form-control" style="height: 50px;" id="floatingPassword" placeholder="Password"> -->
                        <input type="password" class="form-control" id="loginPasswordInput" placeholder="Password">

                        <label for="floatingPassword">Password</label>
                    </div>
                    <button type="button" class="btn btn-outline-primary" style="margin-top: 10px;">Login</button>
                    <br />
                    <button type="button" class="btn btn-outline-primary" style="margin-top: 10px;"
                        @click="$router.push('/signupPage')">Sign up</button>
                    <!-- <a href="#" class="btn" style="margin-top: 10px;">Sign up</a> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import NaviTest from '@/components/NaviTest.vue'
export default {
    components: {
        NaviTest
    },
}
</script>
<style></style>