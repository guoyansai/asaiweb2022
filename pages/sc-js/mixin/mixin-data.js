import scJson from "../../sc-json/json.js";

export default {
  data() {
    return {
      dataObj: {},
      mJson: scJson,
    };
  },
  computed: {
    mApi() {
      return this.mJson.config.api;
    },
    mGlobal() {
      return this.mJson.config.global;
    },
    mMenu() {
      return this.mJson.config.menu;
    },
    mMenuArr() {
      return Object.entries(this.mMenu);
    },
    mUrl() {
      return this.mJson.config.api.url.keys[this.mJson.config.api.url.key];
    },
    isUni() {
      return this.mApi.type === "uni";
    },
  },
};
