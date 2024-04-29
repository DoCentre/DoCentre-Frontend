<template>
    <v-app-bar :elevation="24">
        <v-toolbar-title>File Sharing</v-toolbar-title>
        <h5 class="font-weight-regular text-center">Hi, {{ this.$store.state.login.username }}</h5>
        <v-btn text @click="logout">登出</v-btn>
    </v-app-bar>
</template>


<script>
import { useRouter } from "vue-router";
export default {
    name: "NavigationBar",
    setup() {
        if (sessionStorage.getItem("username") == null) {
            const router = useRouter();
            router.push("/");
        }
    },
    methods: {
        logout() {
            this.$store.dispatch("login/logoutUser")
            this.$store.state.login.isLogin = false
            this.$router.push("/");
        },
    },
};
</script>