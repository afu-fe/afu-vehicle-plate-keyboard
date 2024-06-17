import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import MukUI from "../../../packages/vue_default/src/packages"; //导入
const app = createApp(App);
app.use(MukUI); //注册
app.mount("#app");
