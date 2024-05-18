<template>
    <v-container>
      <v-card outlined>
        <v-toolbar color="light-blue" dark>
          <v-toolbar-title>{{ this.Title }}</v-toolbar-title>
        </v-toolbar>
  
        <v-card-text>
          <v-textarea
            v-model="Content"
            solo
            flat
            auto-grow
            readonly
            rows="17"
          ></v-textarea>
        </v-card-text>
  
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-chip color="grey lighten-2" class="ma-2">
            Author: {{ this.Author }}
          </v-chip>
          <v-chip color="grey lighten-2" class="ma-2">
            Last Edit: {{ this.lastUpdate }}
          </v-chip>
          <v-btn @click="approve" color="green" dark>
            Approve
          </v-btn>
        </v-card-actions>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-card-text>
                <v-text-field
                    v-model="Comment"
                    density="compact"
                    label="comment"
                    hide-details
                    single-line
                ></v-text-field>
            </v-card-text>
            
            <v-btn @click="reject" :disabled="checkForm" color="red" dark>
                Reject
            </v-btn>
        </v-card-actions>
        
      </v-card>
      <v-snackbar v-model="isOpenSnackbar" :timeout="2000" color="red">
          送出失敗
      </v-snackbar>
    </v-container>
  </template>

  

<script>
import { getDocContent, updateDocStatus } from '@/api/docApi';

export default{
    name: "ApproveComponent",
    data () {
        return {
          isOpenSnackbar: false,
          Title: "",
          Content: "",
          Comment: "",
          Author: "",
          lastUpdate: "",
        };
    },
    computed: {
        checkForm(){
          return !this.Comment;
        },
    },
    async created(){
      const result = await getDocContent(parseInt(this.$store.state.login.id), parseInt(this.$route.params.id)); // docID, userId
      // console.log(result);
      this.Title = result["document"]["Title"];
      this.Content = result["document"]["Content"];
      this.lastUpdate = result["document"]["UpdatedAt"].substring(0,10);
      this.Author = result["document"]["Author"]["ID"];
    },
    methods:{
      async approve(){
        try {
          await updateDocStatus(parseInt(this.$store.state.login.id), "", parseInt(this.$route.params.id), "APPROVE");
          this.$router.push("/approve");
        } catch (err) {
          this.isOpenSnackbar = true;
          console.log(err);
        }
      },
      async reject(){
        try {
          await updateDocStatus(parseInt(this.$store.state.login.id), this.Comment, parseInt(this.$route.params.id), "REJECT");
          this.$router.push("/approve");
        } catch (err) {
          this.isOpenSnackbar = true;
          console.log(err);
        }
      },
    }
};
</script>