import { readFileSync } from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import typescript from '@rollup/plugin-typescript'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import vue from '@vitejs/plugin-vue'

const packageJson = JSON.parse(
  readFileSync('./package.json', { encoding: 'utf-8' }),
)
const globals = {
  ...(packageJson?.dependencies || {}),
}

function resolve(str: string) {
  return path.resolve(__dirname, str)
}

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
    typescript({
      target: 'es5',
      rootDir: resolve('src/packages/'),
      declaration: true,
      declarationDir: resolve('dist'),
      exclude: resolve('node_modules/**'),
      allowSyntheticDefaultImports: true,
    }),
  ],
  build: {
    // 输出文件夹
    outDir: 'dist',
    lib: {
      // 组件库源码的入口文件
      entry: resolve("./src/packages/index.ts"),
      // 组件库名称
      name: 'demo-design',
      // 文件名称, 打包结果举例: suemor.cjs
      fileName: 'afu-vehicle-plate-keyboard-vue',
      // 打包格式
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ["vue"],
        output: {
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            globals: {
                vue: "Vue",
            },
        },
    }, // rollup打包配置
  }
})
