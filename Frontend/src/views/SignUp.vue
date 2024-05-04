<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-img src="../assets/logo.png" max-height="100"></v-img>
        <SignUp />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignUp from "@/components/SignUp.vue";
export default {
  name: "LoginPage",
  components: {
    SignUp,
  },
};
</script>

<style>
.v-row {
  justify-content: center;
}
</style>