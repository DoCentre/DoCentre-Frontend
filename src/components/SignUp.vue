<template>
    <v-card>
        <v-card-title>
            <span class="headline">註冊帳號</span>
        </v-card-title>

        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="email" :rules="emailRules" label="信箱" type="email" required></v-text-field>
                <v-text-field v-model="username" :rules="usernameRules" label="使用者名稱" required></v-text-field>
                <v-text-field v-model="password" :rules="passwordRules" label="密碼" type="password"
                    required></v-text-field>
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-btn color="primary" @click="signUp" :disabled="checkForm">註冊</v-btn>
            <v-btn color="primary" @click="backToLogin">返回</v-btn>
        </v-card-actions>
    </v-card>

    <v-snackbar v-model="isOpenSnackbar" :timeout="2000" color="red">
        此使用者信箱、名稱已被使用
    </v-snackbar>
</template>

<script>
import { createUser } from "@/api/userApi";

export default {
    name: "SignUp",
    data: () => {
        return {
            isOpenSnackbar: false,
            valid: false,
            username: "",
            password: "",
            email: "",
            emailRules: [
                (v) => !!v || "欄位不可留空",
                (v) => /.+@.+\..+/.test(v) || "信箱格式錯誤",
            ],
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
    methods: {
        async signUp() {
            const result = await createUser(
                this.username,
                this.password,
                this.email
            );

            if (result == null) {
                this.isOpenSnackbar = true;
            } else {
                this.$router.push("/");
            }
        },
        backToLogin() {
            this.$router.push("/");
        },
    },
};
</script>
