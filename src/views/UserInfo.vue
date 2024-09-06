<template>
  <MyNavBar />
  <div class="container-fluid">
    <div class="mt-4 page-header min-height-300 border-radius-xl" :style="{
      backgroundImage: 'url(' + backgroundImage + ')',
      backgroundPositionY: '50%',
    }">
      <span class="mask bg-gradient-success opacity-6"></span>
    </div>
    <div class="mx-4 overflow-hidden card card-body blur shadow-blur mt-n6">
      <div class="row gx-4">
        <div class="col-auto">
          <div class="avatar avatar-xl position-relative">
            <img src="@/assets/img/bruce-mars.jpg" alt="profile_image" class="shadow-sm w-100 border-radius-lg" />
          </div>
        </div>
        <div class="col-auto my-auto">
          <div class="h-100">
            <h5 class="mb-1">{{ userinfo.username }}</h5>
            <p class="mb-0 text-sm font-weight-bold">{{ userinfo.nickname }}</p>
          </div>

        </div>
        <div class="col-auto">
          <router-link class="nav-link me-2" to="/sign-out">
            <i class="fas fa-sign-out-alt opacity-6 me-1" aria-hidden="true"></i>
            Sign Out
          </router-link>
          <a style="cursor: pointer;" @click="dialogVisible = true" title="更改密码">
            <i class="text-sm fas fa-lock text-secondary" data-bs-toggle="tooltip" data-bs-placement="top"></i>
            Change Password
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class="py-4 container-fluid">
    <div class="mt-3 row">
      <div class="mt-4 col-12 col-md-6 col-xl-4 mt-md-0">
        <div class="card h-100">
          <div class="p-3 pb-0 card-header">
            <div class="row">
              <div class="col-md-8 d-flex align-items-center">
                <h6 class="mb-0">Profile Information</h6>
              </div>
              <div class="col-md-4 text-end">
                <a style="cursor: pointer;" @click.prevent="action.route">
                  <i class="text-sm fas fa-user-edit text-secondary" data-bs-toggle="tooltip" data-bs-placement="top"
                    :title="action.tooltip"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="p-3 card-body">
            <p class="text-sm">
              {{ description }}
            </p>
            <hr class="my-4 horizontal gray-light" />
            <ul class="list-group" v-show="!edit">
              <li class="pt-0 text-sm border-0 list-group-item ps-0">
                <strong class="text-dark">Nick Name:</strong> &nbsp;
                {{ userinfo.nickname }}
              </li>
              <li class="text-sm border-0 list-group-item ps-0">
                <strong class="text-dark">Email:</strong> &nbsp;
                {{ userinfo.email }}
              </li>
              <li class="text-sm border-0 list-group-item ps-0">
                <strong class="text-dark">Source Language:</strong> &nbsp;
                {{ userinfo.sourceLanguage }}
              </li>
              <li class="text-sm border-0 list-group-item ps-0">
                <strong class="text-dark">Target Language:</strong> &nbsp;
                {{ userinfo.targetLanguage }}
              </li>
              <li class="text-sm border-0 list-group-item ps-0">
                <strong class="text-dark">Style:</strong> &nbsp;
                {{ userinfo.style }}
              </li>
              <li class="pb-0 border-0 list-group-item ps-0">
                <strong class="text-sm text-dark">Social:</strong> &nbsp;
                <a v-for="({ icon, link }, index) of social" :key="index" class="py-0 mb-0 btn-simple ps-1 pe-2"
                  :href="link">
                  <font-awesome-icon :icon="icon" />
                </a>
              </li>
            </ul>
            <ul class="list-group" v-show="edit">
              <li class="pt-0 text-sm border-0 list-group-item ps-0">
                <input type="text" class="form-control" v-model="userinfo.username" placeholder="Name" />
              </li>
              <li class="pt-0 text-sm border-0 list-group-item ps-0">
                <input type="text" class="form-control" v-model="userinfo.nickname" placeholder="Nick Name" />
              </li>
              <li class="text-sm border-0 list-group-item ps-0">
                <input type="email" class="form-control" v-model="userinfo.email" placeholder="Email" />
              </li>
              <li class="text-sm border-0 list-group-item ps-0">
                <SourceLanguage class="menu-bar" url="/user" />
              </li>
              <li class="text-sm border-0 list-group-item ps-0">
                <TargetLanguage class="menu-bar" url="/user" />
              </li>
              <li class="text-sm border-0 list-group-item ps-0">
                <input type="text" class="form-control" v-model="userinfo.style" placeholder="Style" />
              </li>
              <soft-button class="btn btn-primary" @click="save">Save</soft-button>
            </ul>
          </div>
        </div>
      </div>
      <div class="mt-4 col-12 col-xl-4 mt-xl-0">
        <div class="card h-100">
          <ReplaceList :is-user="true" style="margin-left: 2px; margin-right: 2px;"/>
        </div>
      </div>
      <div class="col-12 col-md-6 col-xl-4">
        <div class="card h-100">
          <div class="p-3 pb-0 card-header">
            <h6 class="mb-0">Platform Settings</h6>
          </div>
          <div class="p-3 card-body">
            <h6 class="text-xs text-uppercase text-body font-weight-bolder">
              Account
            </h6>
            <ul class="list-group">
              <li class="px-0 border-0 list-group-item">
                <soft-switch id="flexSwitchCheckDefault" name="email" class="ps-0 ms-auto"
                  label-class="mb-0 text-body ms-3 text-truncate w-80" checked>Email me when someone
                  follows me</soft-switch>
              </li>
              <li class="px-0 border-0 list-group-item">
                <soft-switch id="flexSwitchCheckDefault1" name="Email"
                  label-class="mb-0 text-body ms-3 text-truncate w-80" class="ps-0 ms-auto">Email me
                  when someone answers on my post</soft-switch>
              </li>

              <li class="px-0 border-0 list-group-item">
                <soft-switch id="flexSwitchCheckDefault2" name="Email"
                  label-class="mb-0 text-body ms-3 text-truncate w-80" class="ps-0 ms-auto" checked>Email me when
                  someone mentions me</soft-switch>
              </li>
            </ul>
            <h6 class="mt-4 text-xs text-uppercase text-body font-weight-bolder">
              Application
            </h6>
            <ul class="list-group">
              <li class="px-0 border-0 list-group-item">
                <soft-switch id="flexSwitchCheckDefault3" name="Project Launch" class="ps-0 ms-auto"
                  label-class="mb-0 text-body ms-3 text-truncate w-80">New launches and
                  projects</soft-switch>
              </li>
              <li class="px-0 border-0 list-group-item">
                <soft-switch id="flexSwitchCheckDefault4" name="Product Update" class="ps-0 ms-auto"
                  label-class="mb-0 text-body ms-3 text-truncate w-80" checked>Monthly product
                  updates</soft-switch>
              </li>
              <li class="px-0 pb-0 border-0 list-group-item">
                <soft-switch id="flexSwitchCheckDefault5" name="Newsletter" class="ps-0 ms-auto"
                  label-class="mb-0 text-body ms-3 text-truncate w-80">Subscribe to
                  newsletter</soft-switch>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <el-dialog title="Change Password" v-model="dialogVisible" width="40%">
    <form role="form" @submit="handleSubmit($event)">
      <div class="mb-3">
        <soft-input id="old" type="text" placeholder="OldPassWord" aria-label="OldPassword" />
      </div>
      <div class="mb-3">
        <soft-input id="new" type="text" placeholder="NewPassWord" aria-label="NewPassword" />
      </div>
      <div class="mb-3">
        <soft-input id="confirm" type="text" placeholder="ConfirmPassWord" aria-label="ConfirmPassword" />
      </div>
      <soft-button variant="gradient" color="success" type="primary">Confirm</soft-button>
      <soft-button variant="gradient" color="danger" @click="dialogVisible = false">Cancel</soft-button>
    </form>
  </el-dialog>
</template>

<script setup>
import backgroundImage from "@/assets/img/curved-images/curved14.jpg";
import SoftSwitch from "@/components/SoftSwitch.vue";
import SoftButton from "@/components/SoftButton.vue";
import SoftInput from "@/components/SoftInput.vue";
import MyNavBar from '../components/MyNavBar.vue';
import SourceLanguage from "../components/SourceLanguage.vue";
import TargetLanguage from "../components/TargetLanguage.vue";
import ReplaceList from "../components/ReplaceList.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { ElMessage, ElDialog } from 'element-plus';
import { getUserInfo, updateUserInfo, updatePassword, removeStorage } from "../request/user";
import { useRouter } from 'vue-router';

const store = useStore();
const body = document.getElementsByTagName("body")[0];

onMounted(() => {
  store.commit('toggleEveryDisplay');
  store.commit('toggleHideConfig');
  body.classList.remove("bg-gray-100");
});

onBeforeUnmount(() => {
  store.commit('toggleEveryDisplay');
  store.commit('toggleHideConfig');
  body.classList.add("bg-gray-100");
});

const userinfo = ref({
  "id": -1,
  "username": "Guest",
  "password": "now allowed to see",
  "nickname": "",
  "email": "",
  "userPic": "",
  "createTime": "2024-04-10T22:18:09",
  "updateTime": "2024-04-10T22:18:09",
  "targetLanguage": "zh",
  "sourceLanguage": "en"
});

const description = ref("");
const social = ref([
  {
    link: 'https://www.facebook.com/CreativeTim/',
    icon: faFacebook
  },
  {
    link: 'https://twitter.com/creativetim',
    icon: faTwitter
  },
  {
    link: 'https://www.instagram.com/creativetimofficial/',
    icon: faInstagram
  }
]);

const edit = ref(false);
const action = ref({
  route: () => {
    if (edit.value)
      userinfo.value = { ...infoSave };
    edit.value = !edit.value;
  },
  tooltip: 'Edit Profile'
});


let infoSave = {};
getUserInfo().then(res => {
  console.log(res.data.data);
  userinfo.value = res.data.data;
  infoSave = { ...res.data.data };
}).catch(err => {
  console.error(err);
});
const validateInfo = (info) => {
  if (!info.id || info.id === -1) {
    ElMessage.error('请先登录');
    return false;
  }
  const regex = /^\S{5,16}$/;
  if (!regex.test(info.username)) {
    ElMessage.error('用户名应为5-16位');
    userinfo.value = infoSave;
    return false;
  }

  if (!info.nickname) {
    ElMessage.error('昵称不能为空');
    userinfo.value = infoSave;
    return false;
  }
  const emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (!emailRegex.test(info.email)) {
    ElMessage.error('邮箱格式不正确');
    userinfo.value = infoSave;
    return false;
  }
  return true;
};
import { postStyle } from '../request/pref';
const save = () => {
  const info = userinfo.value;
  if (!validateInfo(info)) return;
  updateUserInfo(info.id, info.username, info.nickname, info.email);
  postStyle(info.style, "/user");
  infoSave = { ...info };
  edit.value = false;
};
const dialogVisible = ref(false);

const router = useRouter()

const handleSubmit = async (e) => {
  e.preventDefault();
  if (dialogVisible.value === false) return;

  const old = e.target.old.value, newP = e.target.new.value, confirm = e.target.confirm.value;
  if (newP !== confirm) {
    ElMessage.error('两次密码不一致');
    return;
  }
  const res = await updatePassword(old, newP, confirm)
  if (res.data.code !== 0) {
    ElMessage.error(res.data.message);
    return;
  }

  ElMessage.success('修改成功');
  // token失效
  removeStorage();
  router.push('/sign-in');
};
</script>

<style scoped>
.menu-bar {
  height: 36px;
  background-color: transparent;
}
</style>