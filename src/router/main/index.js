import Vue from "vue";
import VueRouter from "vue-router";
import ProjectMainPage from "@/views/main/ProjectMainPage.vue"
Vue.use(VueRouter)

const mainRoutes = [
  {
    path: '/project-main-page',
    name: 'ProjectMainPage',
    component: ProjectMainPage,
  },
]

export default mainRoutes