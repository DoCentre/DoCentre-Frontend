<template>
    <NavigationBar />
    <v-container>
        <v-row>
            <v-col cols="12" md="4">
                <v-card class="mx-auto" subtitle="This is a card subtitle" title="This is a title" hover height="200px">
                    <template v-slot:append>
                        <v-avatar size="24">
                            <v-img color="red"></v-img>
                        </v-avatar>
                    </template>
                    <v-card-text>This is card content</v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="mx-auto" subtitle="This is a card subtitle" title="This is a title" hover height="200px">
                    <template v-slot:append>
                        <v-avatar size="24">
                            <v-img color="yellow"></v-img>
                        </v-avatar>
                    </template>
                    <v-card-text>This is card content</v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="mx-auto" subtitle="This is a card subtitle" title="This is a title" hover height="200px">
                    <template v-slot:append>
                        <v-avatar size="24">
                            <v-img color="green"></v-img>
                        </v-avatar>
                    </template>
                    <v-card-text>This is card content</v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="mx-auto" subtitle="This is a card subtitle" title="This is a title" hover height="200px">
                    <template v-slot:append>
                        <v-avatar size="24">
                            <v-img color="green"></v-img>
                        </v-avatar>
                    </template>
                    <v-card-text>This is card content</v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card hover height="200px" align="center">
                    <v-avatar size="200">
                        <v-icon color="blue" size="100">mdi-plus</v-icon>
                    </v-avatar>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
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