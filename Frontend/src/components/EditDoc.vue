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
            Last Edit: {{ this.lastUpdate }}
          </v-chip>

          <v-select
            v-model="selectedApprover"
            :items="approverList"
            density="compact"
            label="Approver"
            style="max-width: 170px"
          ></v-select>

          <v-btn @click="save" :disabled="checkForm" color="grey" dark>
            Save
          </v-btn>
          <v-btn @click="submit" :disabled="checkForm" color="green" dark>
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
import { updateDoc, getDocContent } from '@/api/docApi';

export default{
    name: "EditComponent",
    data () {
        return {
            isOpenSnackbar: false,
            submitSuccess: false, 
            submitFailed: false,
            approverList: [
              { index: 0, title: "0" },
              { index: 1, title: "1" },
              { index: 2, title: "2" },
              { index: 3, title: "3" },
              { index: 4, title: "4" },
            ],
            Title: "",
            Content: "",
            selectedApprover: 0,
            lastUpdate: "",

            titleRules:[
                (v) => !!v || "欄位不可留空",
            ],
            contentRules:[
                (v) => !!v || "欄位不可留空",
            ],
        };
    },
    // mounted: function(){
    //   this.getItems().then(data => {
    //     this.Title = data.find((obj) => ResizeObserver.index === "Title")["Title"];
    //   })
    // },
    async created(){
      const result = await getDocContent(parseInt(this.$store.state.login.id), parseInt(this.$route.params.id)); // docID, userId
      // var d = $.Deferred();
      // setTimeout(function(){
      //   var values = [
      //     {index: "Title", value: result["document"]["Title"]},
      //     {index: "Content", value: result["document"]["Content"]},
      //     {index: "selectedApprover", value: result["document"]["ApproverID"]},
      //     {index: "lastUpdate", value: result["document"]["UpdatedAt"]},
      //   ];
      //   d.resolve(values);
      // }, 2000);
      this.Title = result["document"]["Title"];
      this.Content = result["document"]["Content"];
      this.selectedApprover = result["document"]["ApproverID"]
      this.lastUpdate = result["document"]["UpdatedAt"].substring(0,10)
    },  
    computed: {
        checkForm(){
          return !this.Title;
        },
    },
    methods: {
        async submit() {
          try {
            await updateDoc(parseInt(this.$store.state.login.id), parseInt(this.$route.params.id), this.Title, this.Content, "", this.selectedApprover, "APPROVE");
            this.$router.push("/edit");
          } catch (err) {
            this.isOpenSnackbar = true;
            console.log(err);
          }
        },
        async save(){
          try {
            await updateDoc(parseInt(this.$store.state.login.id), parseInt(this.$route.params.id), this.Title, this.Content, "", this.Approver, "EDIT");
            this.$router.push("/edit");
          } catch (err) {
            this.isOpenSnackbar = true;
            console.log(err);
          }
        },
    },
};
</script>