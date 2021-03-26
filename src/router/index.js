import { createRouter, createWebHistory } from "vue-router";
import TeamsList from "../views/TeamsList";
import UsersList from "../views/UsersList";
import NotFound from "../components/nav/NotFound.vue";
import TeamsFooter from "../components/teams/TeamsFooter.vue";
import TeamMembers from "../components/teams/TeamMembers.vue";
import UsersFooter from "../components/users/UsersFooter.vue";
const routes = [
  {
    path: "/",
    redirect: "/teams",
  },
  {
    path: "/teams",
    name: "TeamList",
    components: { default: TeamsList, footer: TeamsFooter },
    children: [
      {
        path: ":teamId",
        name: "TeamsMembers",
        component: TeamMembers,
        props: true,
      },
    ],
    // alias:'/'
  },
  {
    path: "/users",
    name: "Users",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: { default: UsersList, footer: UsersFooter },
  },
  {
    path: "/:notFound(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "router-link-active",
  scrollBehavior(_, _2, savedPosition) {
    // console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, left: 0 };
  },
});
router.beforeEach(function(to, from, next) {
  console.log("global baforeEach");
  console.log(to, from);
  next(true);
});
export default router;
