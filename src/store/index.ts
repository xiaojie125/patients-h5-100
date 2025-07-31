import { createPinia } from "pinia";
import persist from "pinia-plugin-persistedstate";
import type { App } from "vue";

// 创建pinia实例
const store = createPinia();
// 使用pinia-plugin-persistedstate插件
store.use(persist);

// 全局注册 store
export function setupStore(app: App<Element>) {
  app.use(store);
}

// 导出pinia实例
export default store;

// 统一导出
export * from "./modules/user";
