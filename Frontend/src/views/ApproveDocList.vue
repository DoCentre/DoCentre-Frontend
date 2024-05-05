<template>
    <NavigationBar />
    <v-container>
        <v-row>
            <v-layout row wrap v-for="(doc) in docs" :key="doc.id">
                <v-col>
                    <v-card class="mx-auto" :title="doc.title" :subtitle="doc.status" hover max-width="400"
                        :color="color[doc.level]" @click="check(doc.id)">
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
    name: "ApproveDocList",
    components: {
        NavigationBar,
    },
    data() {
        return {
            color: ["green", "gray", "red", "yellow"],
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
                level: doc["status"] === "EDIT" ? 1 : doc["status"] === "VERIFY" ? 3 : doc["status"] === "REJECT" ? 2 : 0,
                status: doc["status"],
                date: new Date(new Date(doc["updated_at"]).getTime()).toLocaleDateString(),
                time: new Date(new Date(doc["updated_at"]).getTime()).toLocaleTimeString([], { hour12: false }),
            };
        });
        this.docs = this.docs.filter((doc) => doc.level !== 0 && doc.level !== 1);
        this.docs.sort((a, b) => {
            if (a.level !== b.level) {
                return b.level - a.level;
            }
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