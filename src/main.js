import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
import { createPinia } from 'pinia';
import { useAuthStore } from '@/store/authStore';

const app = createApp(App);
app.use(router)
app.use(createPinia())

const authStore = useAuthStore();
const inactiveTime = 6 * 60 * 1000;
let timeoutId = null;

function startAutoLogout() {
  function resetTimer() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      logout();
    }, inactiveTime);
  }

  const logout = async () => {
    await authStore.logout();
  };

  window.addEventListener('mousemove', resetTimer);
  window.addEventListener('keypress', resetTimer);
  // Other event listeners for user activity

  // Optional: Clear the timer if the user logs out or leaves the page
  window.addEventListener('logout', () => {
    clearTimeout(timeoutId);
  });
  window.addEventListener('beforeunload', () => {
    clearTimeout(timeoutId);
  });

  resetTimer();
}


const storedToken = localStorage.getItem('authToken');
const storedUser = localStorage.getItem('userDetails');

if (storedToken) {
  authStore.token = storedToken;
  // authStore.user = JSON.parse(storedUser);
}

app.mount('#app');

startAutoLogout();
