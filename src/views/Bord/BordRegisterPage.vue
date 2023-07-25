<template>
    <div>
        <NaviTest />
        <div style="padding-top: 90px">
            <template>
                <div class="card" style="width: 500px; margin: auto;">
                    <div class="card-body">
                        <h5 class="card-title">게시물 등록 페이지</h5>
                        <BordRegisterForm @submit="onSubmit" />
                    </div>
                </div>
            </template>
        </div>

    </div>
</template>
<script>
import NaviTest from '@/components/NaviTest.vue'
import BordRegisterForm from '@/components/bord/bordRegisterForm.vue'

import { mapActions } from 'vuex';

const bordModule = 'bordModule'

export default {
    components: {
        NaviTest,
        BordRegisterForm
    },
    methods: {
        ...mapActions(
            bordModule, ['requestRegisterBordToSpring']
        ),
        async onSubmit(payload) {
            const { title, content } = payload
            await this.requestRegisterBordToSpring({ title, content })
        }
    }

}
</script>
<style></style>