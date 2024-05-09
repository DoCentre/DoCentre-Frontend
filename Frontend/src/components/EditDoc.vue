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
            Last Edit: 3/10
          </v-chip>
          <v-chip color="grey lighten-2" class="ma-2">
            Approver: Mike
          </v-chip>
          <v-btn color="green" dark>
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>

<script>
import { initDoc } from '@/api/docApi';

// import initDoc from "@/api/docApi.vue"
export default{
    name: "EditComponent",
    data: () => {
        return {
            submitSuccess: false, 
            submitFailed: false,
            valid: false, 
            Title: "",
            Content: "",

            titleRules:[
                (v) => !!v || "欄位不可留空",
            ],
            contentRules:[
                (v) => !!v || "欄位不可留空",
            ],
        };
        // this.$route.params.id
    },
    methods: {
        checkForm() {
          return !this.valid;
        },
        async updateDoc() {
          if(!this.valid) {
            console.log("Invalid Input!");
            return;
          }
          await initDoc("", 0, this.$store.state.login.id, this.Content, this.$route.params.id, "EDIT", this.Title); // To be change
          this.$router.push("/edit");
        }

    },
    
};
</script>