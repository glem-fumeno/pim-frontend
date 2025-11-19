import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.ts";
import NaiveUI from 'naive-ui'

const app = createApp(App);

app.use(router);
app.use(NaiveUI)

app.mount("#app");
