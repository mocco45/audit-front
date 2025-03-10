import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import { createPinia } from "pinia";
import { useAuthStore } from "./store/authStore";
import VChart, { THEME_KEY } from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

const app = createApp(App);
app.provide(THEME_KEY, "dark");
app.component("v-chart", VChart);
app.use(router);
app.use(Toast);
app.use(createPinia());

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

  window.addEventListener("mousemove", resetTimer);
  window.addEventListener("keypress", resetTimer);

  window.addEventListener("logout", () => {
    clearTimeout(timeoutId);
  });
  window.addEventListener("beforeunload", () => {
    clearTimeout(timeoutId);
  });

  resetTimer();
}

const storedToken = localStorage.getItem("authToken");
// const storedUser = localStorage.getItem('userDetails');

if (storedToken) {
  authStore.token = storedToken;
  // authStore.user = JSON.parse(storedUser);
}

app.mount("#app");

startAutoLogout();
