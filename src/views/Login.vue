<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-img src="../assets/logo.png" max-height="100"></v-img>
        <SignIn />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignIn from "@/components/SignIn.vue";
export default {
  name: "LoginPage",
  components: {
    SignIn,
  },
};
</script>

<style>
.v-row {
  justify-content: center;
}
</style>