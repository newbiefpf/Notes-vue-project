import router from "./router";
// import store from "./store";
// import { Message } from "element-ui";
import { getToken } from "@/utils/auth";
const whiteList = ["/login", "/community"];
router.beforeEach(async (to, from, next) => {
  const hasToken = getToken();
  if (!hasToken) {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

router.afterEach(() => { });
