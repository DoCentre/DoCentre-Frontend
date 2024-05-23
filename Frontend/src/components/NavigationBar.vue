<template>
    <v-app-bar>
        <v-toolbar-title>Hi, {{ this.$store.state.login.username }}</v-toolbar-title>
        <div id="computer">
            <v-btn v-if="this.$store.state.login.identity == 'admin'" text @click="admin">Admin</v-btn>
            <v-btn text @click="history">History</v-btn>
            <v-btn text @click="edit">Edit</v-btn>
            <v-btn text @click="approve">Approve</v-btn>
            <v-btn text @click="view">View</v-btn>
            <v-btn text @click="logout">Logout</v-btn>
        </div>
        <div id="mobile">
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                </template>
                <v-list>
                    <v-list-item v-if="this.$store.state.login.identity == 'admin'" text
                        @click="admin">Admin</v-list-item>
                    <v-list-item @click="history">History</v-list-item>
                    <v-list-item @click="edit">Edit</v-list-item>
                    <v-list-item @click="approve">Approve</v-list-item>
                    <v-list-item @click="view">View</v-list-item>
                    <v-list-item @click="logout">Logout</v-list-item>
                </v-list>
            </v-menu>
        </div>
    </v-app-bar>
</template>


<script>
import { useRouter } from "vue-router";
export default {
    name: "NavigationBar",
    setup() {
        if (localStorage.getItem("username") == null) {
            const router = useRouter();
            router.push("/");
        }
    },
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

<style>
#computer {
    display: block;
}

#mobile {
    display: none;
}

@media (max-width: 700px) {
    #computer {
        display: none;
    }

    #mobile {
        display: block;
    }
}
</style>