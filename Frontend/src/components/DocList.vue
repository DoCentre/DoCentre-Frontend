<template>
    <v-item-group selected-class="bg-primary">
      <PopEdit />
      <v-container>
        <v-row>
          <v-col
            v-for="n in 10"
            :key="n"
            cols="12"
            md="4"
          >
            <v-item v-slot="{ selectedClass }">
              <v-card :class="['d-flex align-center', selectedClass]" height="200" dark @click=" dialog = true;">
                <div class="text-h3 flex-grow-1 text-center">
                  Content
                </div>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </template>
  
  <script>
  import PopEdit from './PopEdit.vue';
  export default{
      name: "DocList",
      components: {
        PopEdit,
      },
      data () {
        return {
          dialog: false,
        }
      },
  };
  </script>