/**
 * 作者：Hyhello
 * 时间：2019-05-23
 * 描述：index.js
 */
import requireAll from "@/utils/requireAll";

const modules = requireAll(require.context("./src", false, /\.js$/));

const install = (Vue) => {
  for (const i in modules) {
    Vue.filter(modules[i].name, modules[i].handler);
  }
};

export default install;
