<template>
    <v-container>
      <v-card outlined>
        <v-toolbar color="light-blue" dark>
          <v-toolbar-title>Climate Change Impact Report</v-toolbar-title>
        </v-toolbar>
  
        <v-card-text>
          <v-textarea
            v-model="Title"
            solo
            flat
            auto-grow
            readonly
            rows="17"
            value="The report delves into the multifaceted effects of climate change, highlighting rising greenhouse gas emissions, temperature shifts, and extreme weather events. It emphasizes the urgent need for mitigation and adaptation strategies, underscoring the disproportionate impact on vulnerable populations and advocating for international cooperation to address this pressing global challenge."
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

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-card-text>
                <v-text-field
                    v-model="Content"
                    :loading="loading"
                    density="compact"
                    label="comment"
                    hide-details
                    single-line
                    @click:append-inner="onClick"
                ></v-text-field>
            </v-card-text>
            
            <v-btn color="red" dark>
                Reject
            </v-btn>
        </v-card-actions>
        
      </v-card>
    </v-container>
  </template>

  

<script>
import { getDocHistory } from '@/api/docApi';

export default{
    name: "ApproveComponent",
    data: () => {
        return {
           Title: "",
           Content: "",
        };
    },
    async created() {
      const result = await getDocHistory(this.$route.params.id, this.$store.state.login.id); // docID, userId
      this.Title = result
    },

    
    
};
</script>