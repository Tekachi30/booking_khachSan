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
          path: "/hoteldetail/:id",
          name: "hoteldetail",
          component: () => import("../pages/client/hoteldetail.vue"),
        },
        {
          path: "/hotels",
          name: "hotels",
          component: () => import("../pages/client/hotel.vue"),
        },
        {
          path: "/contact",
          name: "contact",
          component: () => import("../pages/client/contact.vue"),
        },
        {
          path: "/blog",
          name: "blog",
          component: () => import("../pages/client/blogs.vue"),
        },
        {
          path: "/information/:id",
          name: "information",
          component: () => import("../pages/client/information.vue"),
        },   
        {
          path: "/payment_return",
          name: "payment_return",
          component: () => import("../pages/client/payment.return.vue"),
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
      path: "/demo2",
      name: "demo2",
      component: () => import("../views/demo2.vue"),
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
