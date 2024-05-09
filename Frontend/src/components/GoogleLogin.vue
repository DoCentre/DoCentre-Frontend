<template>
    <v-btn type="button" @click="handleGoogleLogin">
        使用 Google 登入
    </v-btn>
    <v-snackbar v-model="loginFailed" :timeout="2000" color="red">
        Google登入失敗，可能的問題很多zz
    </v-snackbar>
</template>

<script>
import { googleTokenLogin } from 'vue3-google-login'
import { loginByGoogle } from '@/api/OAuthApi'
import { createUser } from "@/api/userApi";
export default {
    name: 'GoogleLogin',
    data: () => {
        return {
            loginFailed: false,
        }
    },
    methods: {
        handleGoogleLogin() {
            googleTokenLogin({
                clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
            }).then(async (response) => {
                try {
                    this.$store.dispatch("login/logoutUser")
                    this.$store.state.login.isLogin = false;
                    const data = await loginByGoogle(response['access_token'])
                    await this.$store.dispatch('login/loginUser', {
                        username: data['username'],
                        password: data['token'],
                    })
                    if (this.$store.state.login.isLogin) {
                        this.loginSuccess = true;
                        this.$router.push("/edit");
                    } else {
                        const result = await createUser(
                            data['username'],
                            data['token'],
                            data['email']
                        );
                        if (result == null) {
                            this.loginFailed = true;
                        } else {
                            await this.$store.dispatch('login/loginUser', {
                                username: data['username'],
                                password: data['token'],
                            })
                            if (this.$store.state.login.isLogin) {
                                this.loginSuccess = true;
                                this.$router.push("/edit");
                            } else {
                                this.loginFailed = true;
                            }
                        }
                    }
                } catch (err) {
                    console.log(err)
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>