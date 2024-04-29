<template>
    <NavigationBar />
    <v-container>
        <v-row>
            <v-col cols="12" md="4">
                <v-card class="mx-auto" subtitle="This is a card subtitle" title="This is a title" hover height="200px">
                    <template v-slot:append>
                        <input type="checkbox" style="width: 25px;height: 25px;">
                    </template>
                    <v-card-text>This is card content</v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="mx-auto" subtitle="This is a card subtitle" title="This is a title" hover height="200px">
                    <template v-slot:append>
                        <input type="checkbox" style="width: 25px;height: 25px;">
                    </template>
                    <v-card-text>This is card content</v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="mx-auto" subtitle="This is a card subtitle" title="This is a title" hover height="200px">
                    <template v-slot:append>
                        <input type="checkbox" style="width: 25px;height: 25px;" checked>
                    </template>
                    <v-card-text>This is card content</v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="mx-auto" subtitle="This is a card subtitle" title="This is a title" hover height="200px">
                    <template v-slot:append>
                        <input type="checkbox" style="width: 25px;height: 25px;" checked>
                    </template>
                    <v-card-text>This is card content</v-card-text>
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