<template>
  <div class="login-page">
    <cp-nav-bar right-text="注册" @click-right="$router.push('/register')"></cp-nav-bar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass ? "密码登录" : "短信验证码登录" }}</h3>
      <a href="javascript:;">
        <span @click="isPass = !isPass">
          {{ isPass ? "短信验证码登录" : "密码登录" }}
        </span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form ref="form" autocomplete="off" @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="mobile"
        :rules="mobileRules"
        placeholder="请输入手机号"
        type="tel"
      ></van-field>
      <van-field
        v-if="isPass"
        v-model="password"
        :rules="passwordRules"
        placeholder="请输入密码"
        :type="isShow ? 'text' : 'password'"
      >
        <template #button>
          <cp-icon
            :name="`login-eye-${isShow ? 'on' : 'off'}`"
            style="margin-right: 10px"
            @click="isShow = !isShow"
          ></cp-icon>
        </template>
      </van-field>
      <van-field v-else v-model="code" :rules="codeRules" placeholder="短信验证码">
        <template #button>
          <span class="btn-send" :class="{ active: time > 0 }" @click="onSend">
            {{ time > 0 ? `${time}s后再次发送` : "发送验证码" }}
          </span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button native-type="submit" block round type="primary">登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <a class="icon" :href="url">
        <img src="@/assets/qq.svg" alt="" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "loginPage",
});
import { useMobileCode } from "@/hooks/useMobileCode";
import UserAPI from "@/api/user";
import { useUserStore } from "@/store";
import { codeRules, mobileRules, passwordRules } from "@/utils/rules";
import { showSuccessToast, showToast } from "vant";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const mobile = ref("13211112222");
const password = ref("abc12345");
const agree = ref(false);

const store = useUserStore();
const router = useRouter();
const route = useRoute();
const onSubmit = async () => {
  if (!agree.value) return showToast("请勾选协议");
  // 进行登录(合并短信登录)
  const res = isPass.value
    ? await UserAPI.loginByPassword(mobile.value, password.value)
    : await UserAPI.loginByMobile(mobile.value, code.value);
  store.setUser(res.data);
  showSuccessToast("登录成功");
  router.replace((route.query.redirect as string) || "/user");
};

// 短信登录界面切换
const isPass = ref(true);
const code = ref("");

// 发送短信验证码
const { onSend, time, form } = useMobileCode(mobile);

// 密码的可见与不可见
const isShow = ref(false);

// http%3A%2F%2Fconsult-patients.itheima.net%2Flogin%2Fcallback

const url =
  "https://graph.qq.com/oauth2.0/authorize?client_id=102015968&response_type=token&scope=all&redirect_uri=" +
  encodeURIComponent(import.meta.env.VITE_APP_CALLBACK + "/login/callback");
</script>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }

  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;

    h3 {
      font-weight: normal;
      font-size: 24px;
    }

    a {
      font-size: 15px;
    }
  }

  &-other {
    margin-top: 60px;
    padding: 0 30px;

    .icon {
      display: flex;
      justify-content: center;

      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}

.van-form {
  padding: 0 14px;

  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }

  .btn-send {
    color: var(--cp-primary);

    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
