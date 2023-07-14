<template>
    <div>
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
    </div>
  </template>
  
  <script>
  export default {
    props: {
      articles: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      goToHref(href) {
        window.open(href, '_blank');
      },
    },
  };
  </script>
