import Vue from 'vue';
import Router from 'vue-router';
const DashboardLayout = () =>
  import('../components/dashboardLayout.vue');

function loadView(view) {
  return () =>
    import(`../components/dashboardContents/${view}.vue`);
}
function isAuthenticated() {
  if (localStorage.getItem('token') == null) {
    return true;
  }
}

const routes = [
  { 
    path: '/',
    component: DashboardLayout,
    children: [
      {
        name: 'UserController',
        path: 'user',
        component: loadView('userController'),
        beforeEnter(to, from, next) {
          if (!isAuthenticated()) {
            next();
          } else {
            next('/');
            alert('Please Login to Continue!');
          }
        }
      },
      {
        name: 'KendaraanController',
        path: 'kendaraan',
        component: loadView('kendaraanController'),
        beforeEnter(to, from, next) {
          if (!isAuthenticated()) {
            next();
          } else {
            next('/');
            alert('Please Login to Continue!');
          }
        }
      },
      {
        name: 'LoginController',
        path: '',
        component: loadView('loginController')
      }
    ]
  }
];
Vue.use(Router);
const router = new Router({ mode: 'history', routes: routes });
export default router;