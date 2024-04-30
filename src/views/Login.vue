<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-img src="../assets/logo.png" max-height="100"></v-img>
        <SignIn />
        <GoogleLogin />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignIn from "@/components/SignIn.vue";
import GoogleLogin from "@/components/GoogleLogin.vue";
export default {
  name: "LoginPage",
  components: {
    SignIn,
    GoogleLogin,
  },
};
</script>

<style>
.v-row {
  justify-content: center;
}
</style>