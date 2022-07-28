<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户登录" name="first">用户登录</el-tab-pane>
        <el-tab-pane label="用户注册" name="second">用户注册</el-tab-pane>
      </el-tabs>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="user">
          <el-input
            type="text"
            v-model="ruleForm.user"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            type="email"
            v-model="ruleForm.email"
            autocomplete="off"
          ></el-input>
          <el-button class="codeStyle">发送验证码</el-button>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input
            type="text"
            v-model="ruleForm.code"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { ping, login } from "@/api/index";
export default {
  name: "loginForm",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
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
        pass: "",
        user: "",
        email: "",
        code: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        user: [{ validator: validateUser, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var formdata = new FormData();
          formdata.append("username", this.ruleForm.user);
          formdata.append("password", this.ruleForm.pass);
          login(formdata).then((res) => {
            if (res.code == 200) {
              console.log(res);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 切换登录注册
    handleClick(tab, event) {
      console.log(tab, event);
      ping().then((res) => {
        if (res.code == 200) {
          console.log(res.code);
        }
      });
    },
    //关闭弹窗
    handleClose(done) {
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
