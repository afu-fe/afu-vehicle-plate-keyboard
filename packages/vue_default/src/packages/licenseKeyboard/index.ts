import type { App } from 'vue'
import licenseKeyboard from './licenseKeyboard.vue';
// 使用install方法，在app.use挂载
licenseKeyboard.install = (app: App): void => {
  app.component(licenseKeyboard.name as string, licenseKeyboard)
}

export default licenseKeyboard
