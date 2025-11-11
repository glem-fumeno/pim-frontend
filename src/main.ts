import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.ts";
import { library } from "@fortawesome/fontawesome-svg-core";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas, far);

const app = createApp(App);

app.use(router);

app.mount("#app");
