<template>
  <div>
    <div>
      <Tabs type="card" @on-click="changeTab">
        <TabPane label="个人信息" name="gr">
          <Form ref="formValidate" :model="userInfo" :rules="ruleValidate" :label-width="80">
            <FormItem label="昵称" prop="name">
              <Input v-model="userInfo.name" placeholder="请输入昵称"></Input>
            </FormItem>
            <FormItem label="账号" prop="username">
              <Input v-model="userInfo.username" placeholder="请输入账号"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
              <Input v-model="userInfo.password" type="password" placeholder="请输入密码"></Input>
            </FormItem>
            <!-- <FormItem label="确认密码" prop="repassword">
              <Input v-model="userInfo.repassword" type="password" placeholder="请确认密码"></Input>
            </FormItem> -->
            <FormItem label="头像" prop="avatar">
              <UploadImg @sendImgPath="getImgPath" :imgList="defaultImgUrlList" />
            </FormItem>
            <FormItem label="年龄" prop="age">
              <Input v-model="userInfo.age" placeholder="请输入年龄"></Input>
            </FormItem>
            <FormItem label="电话" prop="phone">
              <Input v-model="userInfo.phone" placeholder="请输入电话"></Input>
            </FormItem>
            <FormItem label="性别" prop="sex">
              <RadioGroup v-model="userInfo.sex">
                <Radio label="男" :value="1"></Radio>
                <Radio label="女" :value="0"></Radio>
              </RadioGroup>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
              <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="文章类型" name="wz">
          <Form ref="formDynamic" :model="formDynamic" :label-width="80">
            <template v-for="(item, index) in formDynamic.items">
              <FormItem
                v-if="item.status"
                :key="index"
                :prop="'items.' + index + '.label'"
                :rules="{ required: true, message: index + '.文章类型不能为空', trigger: 'blur' }">
                <Row>
                  <Col span="18">
                    <Input type="text" v-model="item.label" placeholder="请输入文章类型"></Input>
                  </Col>
                  <Col span="4" offset="1">
                    <Button @click="handleRemove(index)">删除</Button>
                  </Col>
                </Row>
              </FormItem>
            </template>
            <FormItem>
              <Row>
                <Col span="12">
                  <Button type="dashed" long @click="handleAdd" icon="md-add">添加类型</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmitDynamic('formDynamic')">提交</Button>
              <Button @click="handleResetDynamic('formDynamic')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="关注列表" name="gz">
          <Table stripe :columns="columns" :data="data">
            <template #name="{ row }">
              <strong>{{ row.name }}</strong>
            </template>
            <template #action="{ row, index }">
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">私信</Button>
              <Button type="error" size="small" @click="remove(index)">取关</Button>
            </template>
          </Table>
        </TabPane>
      </Tabs>
    </div>
    <popup :visible.sync="modalType" :width="'40%'" title="私信他" @handleCancel="modalType = false" @handleComfirm="sendToUser">
      <template slot="body">
        <div class="font-medium text-light-primary dark:text-dark-primary">
          <Input v-model="personalLetter" type="textarea" :autosize="{ minRows: 1, maxRows: 3 }" />
        </div>
      </template>
    </popup>
  </div>
</template>

<script>
import { articleClassifyGet, articleClassifyPost } from "@/api/articale";
import { userGet, userPost } from "@/api/user";
import UploadImg from "@/components/Upload/index.vue";
import popup from "@/components/popupWindows";
export default {
  name: "Settings",
  components: { UploadImg, popup },
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value !== this.userData.password) {
        callback(new Error("两次输入的密码不匹配！"));
      } else {
        callback();
      }
    };
    return {
      defaultImgUrlList: [
        {
          response: {
            data: [],
          },
        },
      ],
      userInfo: {
        sex: "女",
      },
      ruleValidate: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        // repassword: [
        //   {
        //     required: true,
        //     message: "确认密码不能为空！",
        //     trigger: "change",
        //   },
        //   { validator: validatePassCheck, trigger: "change" },
        // ],
      },
      formDynamic: {
        items: [],
      },
      columns: [
        {
          title: "昵称",
          slot: "name",
        },
        {
          title: "邮箱",
          key: "email",
        },
        {
          title: "操作",
          slot: "action",
        },
      ],
      data: [
        {
          userId: 2,
          name: "John Brown",
          email: 18,
        },
        {
          userId: 2,
          name: "Jim Green",
          email: 24,
        },
        {
          userId: 2,
          name: "Joe Black",
          email: 30,
        },
        {
          userId: 2,
          name: "Jon Snow",
          email: 26,
        },
      ],
      modalType: false,
      personalLetter: "",
      sendUserId: null,
    };
  },
  computed: {
    userData() {
      return this.$store.getters.userInfo;
    },
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      userGet().then((res) => {
        if (res.code == 200) {
          this.userInfo = res.data;
          if (this.userInfo.sex == 1) {
            this.userInfo.sex = "男";
          } else {
            this.userInfo.sex = "女";
          }
          this.defaultImgUrlList[0].response.data.push(this.userInfo.avatar);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    changeTab(name) {
      if (name == "wz") {
        articleClassifyGet().then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.formDynamic.items = res.data.map((res) => {
              return {
                status: 1,
                ID: res.ID,
                UserID: res.UserID,
                classId: res.classId,
                label: res.label,
              };
            });
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
    },

    show(row) {
      this.modalType = true;
      this.sendUserId = row.userId;
    },
    sendToUser() {
      if (this.personalLetter == "") {
        this.$Message.error("私信类容不能为空！！！");
        return;
      }
      let groupName = "";
      if (Number(this.sendUserId) > Number(this.userData.ID)) {
        groupName = this.userData.ID + "_" + this.sendUserId;
      } else {
        groupName = this.sendUserId + "_" + this.userData.ID;
      }
      let date = new Date();
      var data = {
        msg: {
          chat_msg_type: 2,
          data: {
            to_user_id: this.sendUserId,
            content: this.personalLetter,
            user_id: this.userData.ID,
            groupName: groupName,
            date: date,
            type: "chat",
          },
        },
      };

      this.$initWs.send(data);
      this.$Message.success("私信发送成功！！！");
      this.modalType = false;
      this.personalLetter = "";
    },
    remove(index) {
      this.data.splice(index, 1);
    },
    handleSubmitDynamic(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(this.formDynamic.items);
          articleClassifyPost(this.formDynamic.items).then((res) => {
            if (res.code == 200) {
              this.$Message.success(res.msg);
            } else {
              this.$Message.error(res.msg);
            }
          });
        }
      });
    },
    handleResetDynamic(name) {
      this.$refs[name].resetFields();
      this.changeTab("wz");
    },
    handleAdd() {
      let arr = this.formDynamic.items.slice(-1);
      console.log(arr);
      this.formDynamic.items.push({
        status: 1,
        ID: null,
        UserID: this.userData.ID,
        classId: arr[0].classId + 1,
        label: "",
      });
    },
    handleRemove(index) {
      this.formDynamic.items[index].status = 0;
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.userInfo.sex == "女") {
            this.userInfo.sex = 0;
          } else {
            this.userInfo.sex = 1;
          }
          userPost(this.userInfo).then((res) => {
            if (res.code == 200) {
              this.$Message.success(res.msg);
              this.getUserInfo();
            } else {
              this.$Message.error(res.msg);
            }
          });
        }
      });
    },

    handleReset(name) {
      this.$refs[name].resetFields();
      this.getUserInfo();
    },
    getImgPath(url) {
      this.userInfo.avatar = url;
    },
  },
};
</script>
