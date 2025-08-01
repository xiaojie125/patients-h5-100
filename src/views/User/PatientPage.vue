<template>
  <div class="patient-page">
    <cp-nav-bar title="家庭档案"></cp-nav-bar>
    <div class="patient-list">
      <div v-for="item in list" :key="item.id" class="patient-item">
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{ item.idCard.replace(/^(.{6}).+(.{4})$/, "\$1********\$2") }}</span>
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div class="icon" @click="showPopup(item)"><cp-icon name="user-edit" /></div>
        <div v-if="item.defaultFlag === 1" class="tag">默认</div>
      </div>
      <div v-if="list.length < 6" class="patient-add" @click="showPopup()">
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
    <!-- 侧滑栏 -->
    <van-popup v-model:show="show" position="right">
      <cp-nav-bar
        :title="patientForm.id ? '编辑患者' : '添加患者'"
        right-text="保存"
        :back="() => (show = false)"
        @click-right="onSubmit"
      ></cp-nav-bar>
      <van-form ref="form" autocomplete="off">
        <van-field
          v-model="patientForm.name"
          label="真实姓名"
          placeholder="请输入真实姓名"
          :rules="nameRules"
        />
        <van-field
          v-model="patientForm.idCard"
          label="身份证号"
          placeholder="请输入身份证号"
          :rules="idCardRules"
        />
        <van-field label="性别" class="pb4">
          <!-- 单选按钮组件 -->
          <template #input>
            <cp-radio-btn v-model="patientForm.gender" :options="options"></cp-radio-btn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox v-model="defaultFlag" :icon-size="18" round />
          </template>
        </van-field>
      </van-form>
      <van-action-bar v-if="patientForm.id">
        <van-action-bar-button @click="removePatient">删除</van-action-bar-button>
      </van-action-bar>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import UserAPI from "@/api/user";
import { Patient, PatientList } from "@/types/user";
import { idCardRules, nameRules } from "@/utils/rules";
import { FormInstance, showConfirmDialog, showSuccessToast } from "vant";
import { computed, onMounted, ref } from "vue";

// 页面初始化加载数据
const list = ref<PatientList>([]);
const loadList = async () => {
  const res = await UserAPI.getPatientList();
  list.value = res.data;
};

onMounted(() => {
  loadList();
});

// 性别选项
const options = [
  { label: "男", value: 1 },
  { label: "女", value: 0 },
];
// 侧滑栏
const show = ref(false);
const showPopup = (item?: Patient) => {
  if (item) {
    // 编辑患者
    const { id, name, idCard, gender, defaultFlag } = item;
    patientForm.value = { id, name, idCard, gender, defaultFlag };
  } else {
    patientForm.value = { ...initPatient };
  }
  show.value = true;
};
// 侧滑栏表单
const initPatient: Patient = {
  name: "",
  idCard: "",
  gender: 1,
  defaultFlag: 0,
};
const patientForm = ref<Patient>({ ...initPatient });
// 默认值需要转换
const defaultFlag = computed({
  get() {
    return patientForm.value.defaultFlag === 1 ? true : false;
  },
  set(val: boolean) {
    patientForm.value.defaultFlag = val ? 1 : 0;
  },
});

const form = ref<FormInstance>();
// 提交表单
const onSubmit = async () => {
  await form.value?.validate();
  // 身份证倒数第二位，单数是男，双数是女
  const genderValue = +patientForm.value.idCard.slice(-2, -1) % 2;
  if (genderValue !== patientForm.value.gender) {
    await showConfirmDialog({
      title: "温馨提示",
      message: "填写的性别和身份证号中的不一致\n您确认提交吗？",
    });
  }
  if (patientForm.value.id) {
    // 编辑患者
    await UserAPI.editPatient(patientForm.value);
  } else {
    await UserAPI.addPatient(patientForm.value);
  }
  show.value = false;
  loadList();
  showSuccessToast(patientForm.value.id ? "编辑成功" : "添加成功");
};
// 删除患者
const removePatient = async () => {
  if (patientForm.value.id) {
    const { id, name } = patientForm.value;
    await showConfirmDialog({
      title: "温馨提示",
      message: `您确认要删除 ${name} 患者信息吗？`,
    });
    await UserAPI.deletePatient(id);
    show.value = false;
    loadList();
    showSuccessToast("删除成功");
  }
};
</script>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;
  :deep() {
    .van-popup {
      width: 80%;
      height: 100%;
      padding-top: 46px;
      box-sizing: border-box;
    }
    // 底部操作栏
    .van-action-bar {
      padding: 0 10px;
      margin-bottom: 10px;
      .van-button {
        color: var(--cp-price);
        background-color: var(--cp-bg);
      }
    }
  }
}
.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;
      &.name {
        font-size: 16px;
        color: var(--cp-text1);
        width: 80px;
        margin-right: 0;
      }
      &.id {
        color: var(--cp-text2);
        width: 180px;
      }
    }
  }
  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);
    .icon {
      color: var(--cp-primary);
    }
  }
}
.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}
.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}
.pb4 {
  padding-bottom: 4px;
}
</style>
