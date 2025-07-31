import { createApp } from "vue";
import setupPlugins from "@/plugins";
import App from "./App.vue";

// 本地SVG图标
import "virtual:svg-icons-register";

// 引入vant的全局样式
import "vant/lib/index.css";
import "./styles/main.scss";

const app = createApp(App);

// 注册插件
app.use(setupPlugins);
app.mount("#app");
