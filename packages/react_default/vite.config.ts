import { readFileSync } from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import typescript from '@rollup/plugin-typescript'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import react from '@vitejs/plugin-react'

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
    react(),
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
      fileName: 'auto-vehicle-plate-keyboard-react',
      // 打包格式
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      //排除不相关的依赖
      external: ['react', 'react-dom', ...Object.keys(globals)],
    },
  }
})
