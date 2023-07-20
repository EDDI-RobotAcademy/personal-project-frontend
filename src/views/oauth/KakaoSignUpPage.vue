<template lang="">
    <div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
const memberModule='memberModule'
export default {
  created() {
    this.create();
  },
  data() {
    return {
      codes: "",
    };
  },
  methods: {
    create() {
      this.codes = this.$route.query.code;
      this.getToken();
      this.$router.push("/")
      
    },
    async getToken() {
      await this.getTokenToSpring(this.codes)
    },
    ...mapActions(memberModule, ['getTokenToSpring'])
  },
  computed:{
    ...mapState(memberModule, ['nickname'])
  }
};
</script>