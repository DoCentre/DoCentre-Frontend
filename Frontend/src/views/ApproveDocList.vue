<template>
    <NavigationBar />
    <v-container>
        <v-layout row wrap v-for="(status) in ['VERIFY', 'REJECT']" :key="status">
            <v-row>
                <v-card>
                    <v-card-title align="center">{{ status }}</v-card-title>
                    <v-progress-linear color="orange" model-value="100" rounded></v-progress-linear>
                    <v-sheet class="d-flex mb-10 flex-wrap">
                        <v-layout row wrap v-for="(doc) in docs.filter((doc) => doc.status === status)" :key="doc.id">
                            <v-col>
                                <v-card class="ma-2 pa-2" :title="doc.title" :subtitle="doc.status" hover width="350"
                                    :color="color[doc.level]" @click="check(doc.id)">
                                    <v-card-text>
                                        {{ doc.time }}<br>
                                        {{ doc.date }}
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-layout>
                    </v-sheet>
                </v-card>
            </v-row>
        </v-layout>
    </v-container>
</template>

<script>
import { getDocViewerList } from "@/api/docApi";
import NavigationBar from "@/components/NavigationBar.vue";
export default {
    name: "ApproveDocList",
    components: {
        NavigationBar,
    },
    data() {
        return {
            color: ["green", "gray", "yellow", "red"],
            docs: [],
        };
    },
    async created() {
        const docList = await getDocViewerList(this.$store.state.login.id);
        if (docList === null) {
            return;
        }
        if (docList.documents === null) {
            return;
        }
        this.docs = docList.documents.map((doc) => {
            return {
                id: doc["id"],
                title: doc["title"] || "untitled",
                level: doc["status"] === "EDIT" ? 1 : doc["status"] === "VERIFY" ? 2 : doc["status"] === "REJECT" ? 3 : 0,
                status: doc["status"],
                date: new Date(new Date(doc["updated_at"]).getTime()).toLocaleDateString(),
                time: new Date(new Date(doc["updated_at"]).getTime()).toLocaleTimeString([], { hour12: false }),
            };
        });
        this.docs.sort((a, b) => {
            return new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time);
        });
    },
    methods: {
        check(id) {
            this.$router.push("/approveDoc/" + id);
        },
    },
};
</script>