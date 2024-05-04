<template>
    <v-app-bar>
        <v-toolbar-title>File System</v-toolbar-title>
        <v-btn text @click="edit">Edit</v-btn>
        <v-btn text @click="approve">Approve</v-btn>
        <v-btn text @click="view">View</v-btn>
        <h4 class="font-weight-regular text-center">Hi, {{ this.$store.state.login.username }}</h4>
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
        logout() {
            this.$store.dispatch("login/logoutUser")
            this.$store.state.login.isLogin = false
            this.$router.push("/");
        },
    },
};
</script>