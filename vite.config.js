import { defineConfig, loadEnv } from "vite";
import { createVuePlugin } from "vite-plugin-vue2"; // 使用Vue2版本
import requireContext from "rollup-plugin-require-context"; // 处理兼容webpack工具require-context;
const path = require("path");

export default defineConfig(({ command, mode }) => {
  let config = {};
  const env = loadEnv(mode, process.cwd()); // 根据服务环境获取环境变量
  // 情景模式配置
  if (command === "serve") {
    // dev 独有配置
    config = {
      base: "/",
    };
  } else {
    // build 独有配置
    config = {
      base: env.VITE_APP_BASE, // 生产环境基础路径必须前后都带斜杠否则打包会出现警告提示
      build: {
        terserOptions: {
          // 打包编译清除控制台输出及debugger
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
        outDir: env.VITE_APP_DIR,
        assetsDir: env.VITE_APP_ASSETS,
        rollupOptions: {
          output: {
            entryFileNames: `${env.VITE_APP_ASSETS}/js/entry[hash].js`, // [name]-[hash] 入口文件
            chunkFileNames: `${env.VITE_APP_ASSETS}/js/chunk[hash].js`, // [name]-[hash] 共享文件
            assetFileNames: `${env.VITE_APP_ASSETS}/assets/[hash][extname]`, // [name]-[hash] 静态资源
          },
        },
        brotliSize: false, // 计算打包时间关闭，不进行该环节；提升bundle效率
      },
    };
  }
  return {
    ...config, // 合并开发生产环境配置
    css: {
      preprocessorOptions: {
        scss: {
          // 处理全局公共样式兼容问题
          additionalData: `@import "./src/assets/css/_config.scss"; 
        @import "./src/assets/css/bem.scss"; 
        @import "./src/assets/css/mixins.scss";
        @import "./src/assets/css/vars.scss";`,
        },
      },
    },
    resolve: {
      extensions: [".js", ".vue", ".json", ".scss"], // 处理文件扩展名
      alias: {
        "@": path.resolve(__dirname, "src"), // 处理全局别名
      },
    },
    plugins: [createVuePlugin(), requireContext()],
    // 代理配置
    server: {
      port: 8888,
      strictPort: true,
      proxy: {
        "/api": {
          target: "http://127.0.0.1:8888",
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
  };
});
