<template>
    <v-btn color="primary" @click="handleGoogleAccessTokenLogin">使用 Google 進行登入</v-btn>

    <div v-if="userDetails">
        <h2>User Details</h2>
        <p>Name: {{ userDetails.name }}</p>
        <p>Email: {{ userDetails.email }}</p>
        <p>Profile Picture: <img :src="userDetails.picture" alt="Profile Picture"></p>
    </div>
</template>

<script>
import { googleSdkLoaded } from "vue3-google-login";
import { loginByGoogle } from "@/api/OAuth";

export default {
    data() {
        return {
            userDetails: null
        };
    },
    name: "GoogleLogin",
    methods: {
        handleGoogleAccessTokenLogin() {
            googleSdkLoaded(google => {
                google.accounts.oauth2
                    .initCodeClient({
                        client_id:
                            "14365237599-a54jh4i11057dsf1fme2shiu501efdue.apps.googleusercontent.com",
                        scope: "email profile openid",
                        callback: response => {
                            if (response.code) {
                                // this.sendCodeToBackend(response.code);
                                const data = loginByGoogle(response.code);
                                console.log(data);

                            }
                        }
                    })
                    .requestCode();
            });
        },
    }
};
</script>
