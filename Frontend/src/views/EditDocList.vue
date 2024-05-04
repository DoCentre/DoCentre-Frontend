<template>
    <NavigationBar />
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card hover height="200px" align="center" @click="appendDoc">
                    <v-avatar size="200">
                        <v-icon color="blue" size="100">mdi-plus</v-icon>
                    </v-avatar>
                </v-card>
            </v-col>
            <v-layout row wrap v-for="(doc) in docs" :key="doc.id">
                <v-col>
                    <v-card class="mx-auto" :title="doc.title" :subtitle="doc.status" hover height="200px"
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
    <v-snackbar v-model="clickCard" :timeout="2000" color="green">
        {{ snackbarContent }}
    </v-snackbar>
</template>

<script>
import { createDoc, getDocList, initDoc } from "@/api/docApi";
import NavigationBar from "@/components/NavigationBar.vue";
export default {
    name: "FileList",
    components: {
        NavigationBar,
    },
    data() {
        return {
            snackbarContent: "",
            clickCard: false,
            docs: [],
        };
    },
    async created() {
        const docList = await getDocList(this.$store.state.login.id);
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
                time: new Date(new Date(doc["updated_at"]).getTime()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
            };
        });
        this.docs.sort((a, b) => {
            return new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time);
        });

    },
    methods: {
        check(id) {
            this.$router.push("/editDoc/" + id);
        },
        async appendDoc() {
            const result = await createDoc(this.$store.state.login.id);
            const id = result["document_id"];
            const temp = await initDoc("", 0, this.$store.state.login.id, "", id, "EDIT", "");
            this.$router.push("/editDoc/" + id);
        },
    },
};
</script>