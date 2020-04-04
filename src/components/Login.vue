<template>
  <div class="login-container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avater_box">
        <img src="../assets/avater.jpg" alt="">
      </div>
      <!-- 登录表单 -->
      <el-form ref="loginFromRef" :model="loginFrom" :rules="loginFromRules" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginFrom.username"
            placeholder="请输入账号"
            clearable
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginFrom.password"
            placeholder="请输入密码"
            prefix-icon="iconfont icon-3702mima"
            clearable
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //  登录表单的数据绑定对象
      loginFrom: {
        username: "admin",
        password: "123456"
      },
      // 表单的验证对象
      loginFromRules: {
        // 验证用户名
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        // 验证密码
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    //重置表单
    resetLoginForm() {
      // console.log(this)
      this.$refs.loginFromRef.resetFields();
    },
    // 登录表单
    submitForm() {
      this.$refs.loginFromRef.validate(async valid => {
        if (!valid) return;
        // console.log(this)
        const { data: res } = await this.$http.post("login", this.loginFrom);
        // console.log(res);
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')

        /**
         * 登录成功后 token, 保存到客户端的 sessionStorage中
         * 项目中的除了登录之外的API接口，必须在登陆之后才能访问
         * token 只应该在当前网站打开期间生效，所以将 token 保存在 sessionStorage
         * 
         */
        window.sessionStorage.setItem('token', res.data.token)
        // 成功后跳转到后台页面  /home
        this.$router.push('/home')
      });
    }
  }
};
</script>


<style lang="less" scoped>
.login-container {
  // background-color: #2b4b6b;
  background-image: url("../assets/kakushigoto.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avater_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>

