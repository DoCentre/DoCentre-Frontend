<template>
    <NavigationBar />
    <v-container>
        <v-row>
            <v-layout row wrap v-for="(doc) in docs" :key="doc.id">
                <v-col>
                    <v-card class="mx-auto" :title="doc.title" :subtitle="doc.status" hover max-width="400"
                        :color="doc.color" @click="check(doc.id)">
                        <v-card-text>
                            {{ doc.time }}<br>
                            {{ doc.date }}
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-layout>
        </v-row>
    </v-container>
</template>

<script>
import { getDocViewerList } from "@/api/docApi";
import NavigationBar from "@/components/NavigationBar.vue";
export default {
    name: "ViewDocList",
    components: {
        NavigationBar,
    },
    data() {
        return {
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
                color: doc["status"] === "EDIT" ? "gray" : doc["status"] === "VERIFY" ? "yellow" : doc["status"] === "REJECT" ? "red" : "green",
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