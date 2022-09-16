<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户登录" name="first">用户登录</el-tab-pane>
        <el-tab-pane label="用户注册" name="second">用户注册</el-tab-pane>
      </el-tabs>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item v-if="activeName == 'second'" prop="email" label="邮箱" :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ]">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button class="codeStyle" @click="sendCode">发送验证码</el-button>
        </el-form-item>
        <el-form-item label="验证码" prop="code" v-if="activeName == 'second'">
          <el-input type="text" v-model="ruleForm.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repass" v-if="activeName == 'second'">
          <el-input type="password" v-model="ruleForm.repass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { ping, login, getCode, register } from "@/api/index";
import { setToken } from "@/utils/auth";
export default {
  name: "loginForm",
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validaterePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else {
        if (value !== this.ruleForm.password) {
          callback(new Error("两次密码不相同"));
        } else {
          callback();
        }
      }
    };
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };

    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };

    return {
      dialogFormVisible: true,
      activeName: "first",
      ruleForm: {
        repass: "",
        password: "",
        username: "",
        email: "",
        code: "",
      },
      rules: {
        repass: [
          { required: true, validator: validaterePass, trigger: "blur" },
        ],
        password: [{ required: true, validator: validatePass, trigger: "blur" }],
        username: [{ required: true, validator: validateUser, trigger: "blur" }],
        code: [{ required: true, validator: validateCode, trigger: "blur" }],
      },
    };
  },
  methods: {
    sendCode () {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      let email = this.ruleForm.email;
      if (regEmail.test(email)) {
        // 合法的邮箱
        getCode({ email: email }).then((res) => {
          if (res.code == 200) {
            this.$message.success(res.message);
          }
        });
      }
    },
    // 提交
    submitForm (formName) {
      if (this.activeName == "first") {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const data = {
              username: this.ruleForm.username,
              password: this.ruleForm.password

            }

            login(data).then((res) => {
              if (res.code == 200) {
                setToken(res.data.token)
                this.$router.push('/home')
              }
            });
          } else {
            return false;
          }
        });
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var formdata = new FormData();
            formdata.append("username", this.ruleForm.username);
            formdata.append("password", this.ruleForm.password);
            formdata.append("email", this.ruleForm.email);
            formdata.append("code", this.ruleForm.code);
            register(formdata).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.message);
              }
            });
          } else {
            return false;
          }
        });
      }
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    // 切换登录注册
    handleClick () {
      this.ruleForm = {
        repass: "",
        password: "",
        username: "",
        email: "",
        code: "",
      };
      ping().then((res) => {
        if (res.code == 200) {
          console.log(res.code);
        }
      });
    },
    //关闭弹窗
    handleClose (done) {
      this.$router.go(-1);
      done();
    },
  },
};
</script>
<style scoped lang="less">
.codeStyle {
  position: absolute;
  right: -120px;
}

.adminh1 {
  text-shadow: 10px 13px 3px rgb(207, 207, 207);
  text-align: center;
}

.el-form {
  margin: 0 auto;
  width: 355px;
}
</style>
