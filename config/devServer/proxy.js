export default (env) => {
  return {
    "/material": {
      target: env.VITE_FORWARD_URL,
      changeOrigin: true,
      // 重写路径 --> 作用与vue配置pathRewrite作用相同
      // rewrite: (path) => path.replace(/^\/api/, "")
    },
    "/report": {
      target: env.VITE_FORWARD_URL,
      changeOrigin: true,
    },
    "/userInfo": {
      target: env.VITE_FORWARD_URL,
      changeOrigin: true,
    },
  };
};
