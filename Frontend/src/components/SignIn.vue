<template>
    <v-card>
        <v-card-title>
            <span class="headline">登入帳號</span>
        </v-card-title>

        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation @keyup.enter="signIn">
                <v-text-field v-model="username" :rules="usernameRules" label="使用者名稱" required></v-text-field>
                <v-text-field v-model="password" :rules="passwordRules" label="密碼" type="password"
                    required></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="signIn" :disabled="checkForm">登入</v-btn>
            <v-btn color="primary" @click="signUp">註冊</v-btn>
        </v-card-actions>
    </v-card>


    <v-snackbar v-model="loginSuccess" :timeout="2000" color="green">
        登入成功
    </v-snackbar>

    <v-snackbar v-model="loginFailed" :timeout="2000" color="red">
        登入失敗，帳號或密碼錯誤
    </v-snackbar>
</template>

<script>
import { useRouter } from "vue-router";
export default {
    name: "SignIn",
    data: () => {
        return {
            loginSuccess: false,
            loginFailed: false,
            valid: false,
            username: "",
            password: "",
            usernameRules: [
                (v) => !!v || "欄位不可留空",
                (v) => /^[A-Za-z0-9]+$/.test(v) || "使用者名稱只能有英文字母或數字",
            ],
            passwordRules: [
                (v) => !!v || "欄位不可留空",
                (v) => (v && v.length >= 6) || "密碼至少需有 6 個字元",
            ],
        };
    },
    computed: {
        checkForm() {
            return !this.valid;
        },
    },
    setup() {
        if (localStorage.getItem("isLogin") != null) {
            const router = useRouter();
            router.push("/edit");
        }
    },
    methods: {
        async signIn() {
            try {
                this.$store.dispatch("login/logoutUser")
                if (this.valid) {
                    await this.$store.dispatch("login/loginUser", {
                        username: this.username,
                        password: this.password,
                    });
                    if (this.$store.state.login.isLogin) {
                        this.loginSuccess = true;
                        this.$router.push("/edit");
                    } else {
                        this.loginFailed = true;
                    }
                } else {
                    this.loginFailed = true;
                }
            } catch (err) {
                console.log(err)
            }
        },
        signUp() {
            this.$router.push("/signup");
        },
        callback() {
            console.log("callback");
        },
    },
};
</script>
