<template>
    <NavigationBar />
    <v-container>
        <v-col cols="12">
            <v-card class="mx-auto" hover @click="expand = !expand;">
                <v-card-item class="text-h5">
                    <v-card-title>Title</v-card-title>
                    <v-row>
                        <v-col cols="3">
                            <v-card-text>
                                Last Edit time: 2021-09-01 12:00:00
                            </v-card-text>
                        </v-col>
                        <v-col cols="2">
                            <v-card-text>
                                Editor: SomeOne
                            </v-card-text>
                        </v-col>
                        <v-col cols="2">
                            <v-card-text>
                                Approver: SomeOne
                            </v-card-text>
                        </v-col>
                        <v-col cols="2">
                            <v-card-text>
                                Status: EDIT
                            </v-card-text>
                        </v-col>
                    </v-row>
                    <template v-slot:append>
                        <v-btn color="primary" text="Edit" variant="text" @click="test"></v-btn>
                    </template>
                </v-card-item>

                <v-expand-transition>
                    <div v-if="expand">
                        <v-list lines="two">
                            <v-list-subheader>File History</v-list-subheader>
                            <v-list-item-group>
                                <v-list-item>
                                    <v-list-item-title>APPROVE @ 2021-09-01
                                        12:00:00</v-list-item-title>
                                    <v-list-item-subtitle>Comment: </v-list-item-subtitle>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-title>EDIT @ 2021-09-01
                                        12:00:00</v-list-item-title>
                                    <v-list-item-subtitle>Comment: </v-list-item-subtitle>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-title>CREATE @ 2021-09-01
                                        12:00:00</v-list-item-title>
                                    <v-list-item-subtitle>Comment: </v-list-item-subtitle>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </div>
                </v-expand-transition>
            </v-card>
        </v-col>
    </v-container>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
export default {
    name: "AdminView",
    components: {
        NavigationBar,
    },
    data() {
        return {
            expand: false,
        };
    },
    methods: {
        test() {
            console.log("test");
        },
    },
};
</script>