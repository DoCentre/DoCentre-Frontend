<template>
    <v-container>
      <v-card outlined>
        <v-text-field
            v-model="subject"
            label="Subject"
            hide-details
            single-line
        ></v-text-field>
  
        <v-card-text>
            <v-textarea
                v-model="title"
                label="Message"
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
export default{
    name: "EditComponent",
//   components: {
//     PopEdit,
//   },
    
};
</script>