import type { App } from 'vue'
// import { setupDirective } from "@/directive";
// import { setupElIcons } from "./icons";
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
// import { setupI18n } from "@/lang";
import { setupPermission } from './permission'
// import { setupWebsocket } from "./websocket";
// import { setupVxeTable } from "./vxe-table";

export default {
  install(app: App<Element>) {
    // 自定义指令(directive)
    // setupDirective(app);
    // 路由(router)
    setupRouter(app)
    // 状态管理(store)
    setupStore(app)
    // 国际化
    // setupI18n(app);
    // Element-plus图标
    // setupElIcons(app);
    // 路由守卫
    setupPermission()
    // websocket连接
    // setupWebsocket();
    // vxe-table
    // setupVxeTable(app);
  }
}
