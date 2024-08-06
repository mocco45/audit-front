import { useAuthStore } from "@/store/authStore";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
            {
                path: '/',
                component: () => import('../views/auth/loginPage.vue'),
            },
            {
                path: '/register',
                component: () => import('../views/auth/registerPage.vue')
            },
            {
                path: '/dashboard',
                component: () => import('../views/pages/dashboard.vue'),
                // meta: {requiresAuth: true}
            },
            {
                path: '/upload',
                component: () => import('../views/pages/filesimport.vue'),
            },

    {
        path: '/login',
        component: () => import('../views/auth/loginPage.vue')
    },
    {
        path: '/403',
        component: () => import('../views/responses/403.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('../views/responses/404.vue')
    },
    {
        path: '/companies',
        name: 'CompanyList',
        component: () => import('../views/pages/company.vue'),
      },
      {
        path: '/company/:companyId',
        name: 'CompanyDetail',
        component: () => import('../views/pages/mineralYear.vue'),
        props: true,
      },{
        path: '/contributions/:companyId',
        name: 'contributes',
        component: () => import('../views/pages/contribution.vue')
      }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to,from,next) => {
    const authStore = useAuthStore();
  if (to.matched.some(record => record.meta.requiresAuth)) {
      if(!authStore.isAuthenticated){
        next('/login');
        }
        else if(to.matched.some(record => record.meta.roles)){
            const role = to.meta.roles;
            if(role.includes(authStore.user.role)){
                next();
            }
            else{
                next('/403')
            }
        } else {
            next();
        } 
    }else {
        next();
    }
});

export default router;