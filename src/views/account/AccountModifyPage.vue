<template lang="">
    <div>
    <AccountMyPage />
        <template v-if="account">
            <AccountEditForm :account="account" />
        </template>
    </div>
</template>

<script>
import AccountEditForm from "@/components/account/AccountEditForm.vue"
import AccountMyPage from "@/components/account/AccountMyPage.vue";

import { mapActions, mapState } from "vuex";

const accountModule = 'accountModule'

export default {
  name: "AccountModifyPage",
  
  components: {
    AccountEditForm,
    AccountMyPage
  },
  methods: {
    ...mapActions(accountModule, ['requestAccountToSpring']),
    
  },
  computed: {
    ...mapState(accountModule, ["account"]),
  },

  async created() {
    this.userToken = localStorage.getItem("userToken")
    await this.requestAccountToSpring({ userToken: this.userToken });
  }
}

</script>

<style lang="">
    
</style>