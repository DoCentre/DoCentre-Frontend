<template>
    <v-app-bar>
        <v-toolbar-title>Hi, {{ this.$store.state.login.username }}</v-toolbar-title>
        <v-btn v-if="this.$store.state.login.identity == 'admin'" text @click="admin">Admin</v-btn>
        <v-btn text @click="history">history</v-btn>
        <v-btn text @click="edit">Edit</v-btn>
        <v-btn text @click="approve">Approve</v-btn>
        <v-btn text @click="view">View</v-btn>
        <v-btn text @click="logout">Logout</v-btn>
    </v-app-bar>
</template>


<script>
// import { useRouter } from "vue-router";
export default {
    name: "NavigationBar",
    // setup() {
    //     if (sessionStorage.getItem("username") == null) {
    //         const router = useRouter();
    //         router.push("/");
    //     }
    // },
    methods: {
        edit() {
            this.$router.push("/edit");
        },
        approve() {
            this.$router.push("/approve");
        },
        view() {
            this.$router.push("/view");
        },
        admin() {
            this.$router.push("/admin");
        },
        history() {
            this.$router.push("/history");
        },
        logout() {
            this.$store.dispatch("login/logoutUser")
            this.$store.state.login.isLogin = false
            this.$router.push("/");
        },
    },
};
</script>