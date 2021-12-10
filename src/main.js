/**
 *@Description:入口函数
 *@Author: Jackson
 *@CreateTime: 2021年12月10日 10:42:36
 *@UpdateTime:
 **/
import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import filters from "@/filters";
import directives from "@/directives";

Vue.use(filters);
Vue.use(directives);
Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.$bus = new Vue({
  render: (h) => h(App),
}).$mount("#app");
