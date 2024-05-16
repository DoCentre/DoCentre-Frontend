<template>
    <v-container>
      <v-card outlined>
        <v-text-field
            v-model="Title"
            label="Title"
            hide-details
            single-line
            id="Title"
        ></v-text-field>
  
        <v-card-text>
            <v-textarea
                v-model="Content"
                label="Content"
                counter
                single-line
                rows="15"
            ></v-textarea>
        </v-card-text>
  
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-chip color="grey lighten-2" class="ma-2">
            Last Edit: 
          </v-chip>
          <v-chip color="grey lighten-2" class="ma-2">
            Approver: Mike
          </v-chip>
          <v-btn @click="update" :disabled="checkForm" color="green" dark>
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-snackbar v-model="isOpenSnackbar" :timeout="2000" color="red">
          無法儲存
      </v-snackbar>
    </v-container>
  </template>

<script>
import { updateDoc } from '@/api/docApi';
export default{
    name: "EditComponent",
    data () {
        return {
            isOpenSnackbar: false,
            submitSuccess: false, 
            submitFailed: false,
            Title: "",
            Content: "",

            titleRules:[
                (v) => !!v || "欄位不可留空",
            ],
            contentRules:[
                (v) => !!v || "欄位不可留空",
            ],
        };
    },
    computed: {
        checkForm(){
          return !this.Title;
        }
    },
    methods: {
        async update() {
          try {
            console.log(this.$store.state.login.id + " " + this.$route.params.id);
            await updateDoc(this.$store.state.login.id, this.$route.params.id, "hhh", "asdf", "", 0, "EDIT");
            // this.$router.push("/edit");
          } catch (err) {
            this.isOpenSnackbar = true;
            console.log("error");
            console.log(err);
          }
        },
    },
};
</script>