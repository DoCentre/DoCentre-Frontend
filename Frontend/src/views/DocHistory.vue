<template>
    <NavigationBar />
    <v-container>
        <v-col cols="12">
            <v-layout v-for="(doc) in docs" :key="doc.id">
                <v-card class="mx-auto ma-2 pa-2" hover @click="expand(doc.id)">
                    <v-card-item class="text-h5">
                        <v-card-title>{{ doc.title }}</v-card-title>
                        <v-row>
                            <v-col cols="3">
                                <v-card-text>
                                    Last Edit time: {{ doc.date }} {{ doc.time }}
                                </v-card-text>
                            </v-col>
                            <v-col cols="2">
                                <v-card-text>
                                    Editor: {{ doc.editor }}
                                </v-card-text>
                            </v-col>
                            <v-col cols="2">
                                <v-card-text>
                                    Approver: {{ doc.approver }}
                                </v-card-text>
                            </v-col>
                            <v-col cols="2">
                                <v-card-text>
                                    Status: {{ doc.status }}
                                </v-card-text>
                            </v-col>
                        </v-row>
                        <template v-slot:append>
                            <v-btn color="primary" text="Edit" variant="text" @click="test"></v-btn>
                        </template>
                    </v-card-item>
                    <v-expand-transition>
                        <div v-if="doc.expand">
                            <v-list lines="two">
                                <v-list-subheader>File History</v-list-subheader>
                                <v-list-item-group>
                                    <v-layout v-for="(history) in doc.history">
                                        <v-list-item>
                                            <v-list-item-title>{{ history.status }} @ {{ history.date }}
                                                {{ history.time }}</v-list-item-title>
                                            <v-list-item-subtitle>Comment: {{ history.comment }}</v-list-item-subtitle>
                                        </v-list-item>
                                    </v-layout>
                                </v-list-item-group>
                            </v-list>
                        </div>
                    </v-expand-transition>
                </v-card>
            </v-layout>
        </v-col>
    </v-container>
</template>

<script>
import { getDocList, getDocHistory } from "@/api/docApi";
import NavigationBar from "@/components/NavigationBar.vue";
export default {
    name: "AdminView",
    components: {
        NavigationBar,
    },
    data() {
        return {
            docs: [],
        };
    },
    async created() {
        const docList = await getDocList(this.$store.state.login.id);
        if (docList.documents === null) {
            return;
        }
        for (let i = 0; i < docList.documents.length; i++) {
            const history = await getDocHistory(docList.documents[i]["id"], this.$store.state.login.id);
            let fileHistory = [];
            if (history.histories !== null) {
                fileHistory = history.histories.map((doc) => {
                    return {
                        status: doc["status"],
                        comment: doc["comment"],
                        date: new Date(new Date(doc["created_at"]).getTime()).toLocaleDateString(),
                        time: new Date(new Date(doc["created_at"]).getTime()).toLocaleTimeString([], { hour12: false }),
                    };
                });
                fileHistory.sort((a, b) => {
                    return new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time);
                });
            }
            this.docs.push({
                id: docList.documents[i]["id"],
                editor: sessionStorage.getItem("username"),
                approver: docList.documents[i]["approver"],
                title: docList.documents[i]["title"] || "untitled",
                level: docList.documents[i]["status"] === "EDIT" ? 1 : docList.documents[i]["status"] === "VERIFY" ? 2 : docList.documents[i]["status"] === "REJECT" ? 3 : 0,
                status: docList.documents[i]["status"],
                date: new Date(new Date(docList.documents[i]["updated_at"]).getTime()).toLocaleDateString(),
                time: new Date(new Date(docList.documents[i]["updated_at"]).getTime()).toLocaleTimeString([], { hour12: false }),
                history: fileHistory,
                expand: false,
            });
        }
        this.docs.sort((a, b) => {
            return new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time);
        });
    },
    methods: {
        expand(id) {
            this.docs = this.docs.map((doc) => {
                if (doc.id === id) {
                    doc.expand = !doc.expand;
                } else {
                    doc.expand = false;
                }
                return doc;
            });
        },
        async test() {
            console.log("test");
        },
    },
};
</script>