import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' 
const whiteList = ['/login'] 
router.beforeEach(async(to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
    console.log(1);
    } else {
      console.log(1.1);
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
  console.log(2);
    }
  }
})

router.afterEach(() => {
})
