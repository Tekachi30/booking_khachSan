import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/home.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../pages/client/home.vue"),
        },
        {
          path: "/checkout",
          name: "checkout",
          component: () => import("../pages/client/checkout.vue"),
        },
        {
          path: "/favourite",
          name: "favourite",
          component: () => import("../pages/client/favourite.vue"),
        },
        {
          path: "/blog",
          name: "blog",
          component: () => import("../pages/client/blog.vue"),
        },
        {
          path: "/users",
          name: "users",
          component: () => import("../pages/client/user.vue"),
          children: [
            {
              path: "",
              name: "usersPage",  // Thay đổi tên thành "usersPage"
              component: () => import("../pages/client/user/user.vue"),
            },
            {
              path: "cart",
              name: "carts",
              component: () => import("../pages/client/user/cart.vue"),
            },
            {
              path: "favorite",
              name: "favorites",
              component: () => import("../pages/client/user/favorite.vue")
            },
          ]
        },
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login.vue"),
    },
    {
      path: "/demo",
      name: "demo",
      component: () => import("../views/demo.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/register.vue"),
    },
    {
      path: "/login_admin",
      name: "login_admin",
      component: () => import("../views/login_admin.vue"),
    },
    {
      path: "/login_owner",
      name: "login_owner",
      component: () => import("../views/login_owner.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/admin.vue"),
      children: [
        {
          path: "",
          name: "admin",
          component: () => import("../pages/admin/home.vue"),
        },
        {
          path: "user",
          name: "user",
          component: () => import("../pages/admin/user.vue"),
        },
        {
          path: "owners",
          name: "owners",
          component: () => import("../pages/admin/owner.vue"),
        },
        {
          path: "ratings",
          name: "ratings",
          component: () => import("../pages/admin/rating.vue"),
        },
        {
          path: "report",
          name: "report",
          component: () => import("../pages/admin/report.vue"),
        },
        {
          path: "banner",
          name: "banner",
          component: () => import("../pages/admin/banner.vue"),
        },
      ],
    },
    {
      path: "/owner",
      name: "owner",
      component: () => import("../views/owner.vue"),
      children: [
        {
          path: "",
          name: "owner",
          component: () => import("../pages/owner/home.vue"),
        },
        {
          path: "hotel",
          name: "hotel",
          component: () => import("../pages/owner/hotel.vue"),
        },
        {
          path: "room",
          name: "room",
          component: () => import("../pages/owner/room.vue"),
        },
        {
          path: "rating",
          name: "rating",
          component: () => import("../pages/owner/rating.vue"),
        },
        {
          path: "cart",
          name: "cart",
          component: () => import("../pages/owner/cart.vue"),
        },
        {
          path: "coupon",
          name: "coupon",
          component: () => import("../pages/owner/coupon.vue"),
        },
        {
          path: "chat",
          name: "chat",
          component: () => import("../pages/owner/chat.vue"),
        },
      ],
    },
  ],
});
export default router;
