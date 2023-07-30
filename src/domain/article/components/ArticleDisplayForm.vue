<template>
  <div v-if="isArticleLoading">
    <v-list>
      <v-list-item
        v-for="(article, index) in articles"
        :key="index"
        :title="article.title"
        :subtitle="article.company"
        @click="goToHref(article.href)"
      >
        <v-list-item-content class="text-start">
          <v-list-item-title>{{ article.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ article.company }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    
    <div class="text-center">
      <v-btn
        icon
        :disabled="nowPage === 1"
        @click="decreasePage"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="increasePage"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </div>
  <div v-else>
    <v-progress-circular indeterminate color="blue"></v-progress-circular>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowPage: 1,
    };
  },
  props: {
    articles: {
      type: Array,
      default: () => [],
    },
    isArticleLoading: {
            type: Boolean,
            required: true,
        },
  },
  methods: {
    goToHref(href) {
      window.open(href, "_blank");
    },
    increasePage() {
      this.nowPage += 10;
      this.$emit("update-now-page", this.nowPage);
    },
    decreasePage() {
      if (this.nowPage > 1) {
        this.nowPage -= 10;
        this.$emit("update-now-page", this.nowPage);
      }
    },
  },
};
</script>
