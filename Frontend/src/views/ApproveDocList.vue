<template>
    <NavigationBar />
    <v-container>
        <v-layout v-for="(status) in ['VERIFY', 'REJECT', 'APPROVE']" :key="status">
            <v-col v-if="docs.filter((doc) => doc.status === status).length > 0">
                <v-card-title align="center">{{ status }}</v-card-title>
                <hr style="height:5px;border-width:0;color:orange;background-color:orange">
                <v-row>
                    <v-layout v-for="(doc) in docs.filter((doc) => doc.status === status)" :key="doc.id">
                        <v-col>
                            <v-card class="mx-auto ma-2 pa-2" :title="doc.title" :subtitle="doc.status" hover
                                width="350" :color="color[doc.level]" @click="check(doc.id)">
                                <v-card-text>
                                    {{ doc.time }}<br>
                                    {{ doc.date }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-layout>
                </v-row>
            </v-col>
        </v-layout>
    </v-container>
</template>

<script>
import { getDocApproverList } from "@/api/docApi";
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
        const docList = await getDocApproverList(this.$store.state.login.id);
        console.log(docList)
        if (docList === null) {
            return;
        }
        if (docList.documents === null) {
            return;
        }
        try {
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
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
        check(id) {
            this.$router.push("/approveDoc/" + id);
        },
    },
};
</script>