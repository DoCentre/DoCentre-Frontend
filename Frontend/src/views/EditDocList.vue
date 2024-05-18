<template>
    <NavigationBar />
    <v-container>
        <v-col cols="12" mb="6" align="center">
            <v-card hover height="100px" width="350px" align="center" @click="appendDoc">
                <v-avatar size="100">
                    <v-icon color="blue" size="50">mdi-plus</v-icon>
                </v-avatar>
            </v-card>
        </v-col>
        <v-layout v-for="(status) in ['REJECT', 'EDIT', 'VERIFY', 'APPROVE']" :key="status">
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
import { createDoc, getDocList, updateDoc } from "@/api/docApi";
import NavigationBar from "@/components/NavigationBar.vue";
export default {
    name: "EditDocList",
    components: {
        NavigationBar,
    },
    data() {
        return {
            clickCard: false,
            color: ["green", "gray", "yellow", "red"],
            docs: [],
        };
    },
    async created() {
        const docList = await getDocList(this.$store.state.login.id);
        if (docList.documents === null) {
            return;
        }
        try {
            this.docs = docList.documents.map((doc) => {
                return {
                    id: doc["id"],
                    title: doc["title"] || "untitled",
                    level: doc["status"] === "EDIT" ? 1 : doc["status"] === "VERIFY" ? 0 : doc["status"] === "REJECT" ? 3 : 2,
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
            this.$router.push("/editDoc/" + id);
        },
        async appendDoc() {
            try {
                const result = await createDoc(this.$store.state.login.id);
                const id = result["document_id"];
                await updateDoc(this.$store.state.login.id, id, "hhh", "hhh", "", 0, "EDIT");
                this.$router.push("/editDoc/" + id);
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>