<template>
    <NavigationBar />
    <!-- <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>File List</v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item v-for="file in files" :key="file.id">
                                <v-list-item-content>
                                    <v-list-item-title>{{ file.name }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container> -->
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
export default {
    name: "FileList",
    components: {
        NavigationBar,
    },
};
</script>