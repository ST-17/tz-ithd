import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import "material-design-icons-iconfont/dist/material-design-icons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(vuetify, {
  icons: {
    iconfont: "mdi",
  },
});

app.mount("#app");
