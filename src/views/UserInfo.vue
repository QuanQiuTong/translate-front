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
                        <img src="@/assets/img/bruce-mars.jpg" alt="profile_image"
                            class="shadow-sm w-100 border-radius-lg" />
                    </div>
                </div>
                <div class="col-auto my-auto">
                    <div class="h-100">
                        <h5 class="mb-1">{{ userinfo.username }}</h5>
                        <p class="mb-0 text-sm font-weight-bold">{{ userinfo.nickname }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="py-4 container-fluid">
        <div class="mt-3 row">
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
                                    label-class="mb-0 text-body ms-3 text-truncate w-80" class="ps-0 ms-auto"
                                    checked>Email me when someone mentions me</soft-switch>
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
            <div class="mt-4 col-12 col-md-6 col-xl-4 mt-md-0">
                <profile-card title="Profile Information"
                    description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                    :info="{
                        fullName: 'Alec M. Thompson',
                        mobile: '(44) 123 1234 123',
                        email: userinfo.email,
                        location: 'USA',
                    }" :social="[
                        {
                            link: 'https://www.facebook.com/CreativeTim/',
                            icon: faFacebook,
                        },
                        {
                            link: 'https://twitter.com/creativetim',
                            icon: faTwitter,
                        },
                        {
                            link: 'https://www.instagram.com/creativetimofficial/',
                            icon: faInstagram,
                        },
                    ]" :action="{
                route: editProfile,
                tooltip: 'Edit Profile',
            }" />
            </div>
        </div>
    </div>
</template>

<script setup>
import backgroundImage from "@/assets/img/curved-images/curved14.jpg";
import SoftSwitch from "@/components/SoftSwitch.vue";
import ProfileCard from "../components/ProfileCard.vue";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const body = document.getElementsByTagName("body")[0];

onMounted(() => {
    store.commit('toggleEveryDisplay')
    store.commit('toggleHideConfig')
    body.classList.remove("bg-gray-100");
})

onBeforeUnmount(() => {
    store.commit('toggleEveryDisplay')
    store.commit('toggleHideConfig')
    body.classList.add("bg-gray-100");
})


import MyNavBar from '../components/MyNavBar.vue';
import { getUserInfo } from "../request/user";

let userinfo = {
    "id": 2,
    "username": "sunge",
    "password": "e10adc3949ba59abbe56e057f20f883e",
    "nickname": "",
    "email": "",
    "userPic": "",
    "createTime": "2024-04-10T22:18:09",
    "updateTime": "2024-04-10T22:18:09",
    "targetLanguage": "zh",
    "sourceLanguage": null
}

getUserInfo().then(res => {
    console.log(res.data.data);
    userinfo = res.data.data;
}).catch(err => {
    console.error(err);
})

const edit = ref(false);
const editProfile = () => {
    console.log('edit profile');
    edit.value = true;
}
</script>