<template>
  <div>
    <div v-if="userInfo">
      <router-link to="/home" class="flex gap-x-3 items-center justify-center">
        <div class="headImg">
          <img src="@/assets/photo.jpeg" alt="出错了" srcset="" />
        </div>
        <div>
          <p class="font-bold text-sky-blue font-mono tracking-widest uppercase hidden md:block">{{ userInfo.name }}</p>
        </div>
      </router-link>
    </div>
    <div v-else class="flex gap-x-3 items-center justify-center login" ref="loginRegistration" @click="loginRegistration()">
      <v-icon name="logo" class="fill-current text-sky-blue w-8 h-8 ml-3 md:ml-0" />
      <p class="font-bold text-sky-blue font-mono tracking-widest uppercase md:block">请登录/请注册</p>
    </div>
    <transition name="dropdown">
      <nav
        class="absolute bg-white dark:bg-dark-secondary z-50 rounded-md flex flex-col p-4 gap-3 border border-gray-100 dark:border-gray-600 overflow-y-auto"
        v-click-outside="{
          handler: 'closeDropDown',
          exclude: ['loginRegistration'],
        }"
        v-if="isOpen">
        <div>
          <template>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <div @click="tab = !tab" style="margin-left: 8px" class="tagChange">
                <div v-if="tab" class="text-gray-600 dark:text-gray-400 opacity-75 font-normal leading-tight mb-8">去注册</div>
                <div v-else class="text-gray-600 dark:text-gray-400 opacity-75 font-normal leading-tight mb-8">去登录</div>
              </div>

              <div>
                <div v-if="tab">
                  <FormItem label="登录名" prop="username">
                    <Input v-model="formValidate.username" placeholder="请输入登录名"></Input>
                  </FormItem>
                  <FormItem label="密码" prop="password">
                    <Input v-model="formValidate.password" placeholder="请输入密码" type="password"></Input>
                  </FormItem>
                  <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">登录</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                  </FormItem>
                </div>
                <div v-else>
                  <FormItem label="昵称" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入昵称"></Input>
                  </FormItem>
                  <FormItem label="登录名" prop="username">
                    <Input v-model="formValidate.username" placeholder="请输入登录名"></Input>
                  </FormItem>
                  <FormItem label="密码" prop="password">
                    <Input v-model="formValidate.password" placeholder="请输入密码"></Input>
                  </FormItem>
                  <FormItem label="确认密码" prop="reRassword">
                    <Input v-model="formValidate.reRassword" placeholder="请输入确认密码"></Input>
                  </FormItem>
                  <FormItem label="手机号" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入手机号"></Input>
                  </FormItem>
                  <FormItem label="E-mail" prop="mail">
                    <Row>
                      <Col span="14">
                        <Input v-model="formValidate.mail" placeholder="请输入邮箱"></Input>
                      </Col>
                      <Col span="3" offset="1">
                        <Button>获取验证码</Button>
                      </Col>
                    </Row>
                  </FormItem>
                  <FormItem label="验证码" prop="code">
                    <Input v-model="formValidate.code" placeholder="请输入验证码"></Input>
                  </FormItem>
                  <FormItem label="性别" prop="gender">
                    <RadioGroup v-model="formValidate.gender">
                      <Radio label="男">男</Radio>
                      <Radio label="女">女</Radio>
                    </RadioGroup>
                  </FormItem>

                  <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">注册</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                  </FormItem>
                </div>
              </div>
            </Form>
          </template>
        </div>
      </nav>
    </transition>
  </div>
</template>

<script>
import { login } from "@/api/user";
export default {
  name: "TheLogo",
  data() {
    return {
      showHead: false,
      isOpen: false,
      tab: true,
      formValidate: {},
      ruleValidate: {
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        mail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式错误", trigger: "blur" },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        username: [{ required: true, message: "请输入登录账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        reRassword: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
  },

  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          login(this.formValidate).then((res) => {
            if (res.code == 200) {
              this.isOpen = false;
              this.$Message.success("登录成功!");
              this.$store.dispatch("user/refreshToken", res.data.token);
              this.$store.dispatch("user/refreshUserInfo", res.data.user);
              this.$router.replace({ path: "/home" });
              setTimeout(() => {
                this.$initWs.init();
              }, 1000);
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    loginRegistration() {
      this.isOpen = !this.isOpen;
    },
    closeDropDown() {
      if (this.isOpen === false) return;
      this.isOpen = false;
    },
  },
};
</script>
<style scoped>
.headImg > img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
.login {
  cursor: pointer;
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 500ms;
}
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.tagChange {
  width: 50px;
  cursor: pointer;
}
</style>
