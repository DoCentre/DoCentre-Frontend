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
                        @click="check(doc.id)">
                        <template v-slot:append>
                            <!-- <v-avatar size="24">
                                <v-img :color="green"></v-img>
                            </v-avatar> -->
                        </template>
                        <v-card-text></v-card-text>
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
                status: doc["status"],
            };
        });
    },
    methods: {
        check(id) {
            this.snackbarContent = "Card " + id + " is clicked";
            this.clickCard = true;
        },
        async appendDoc() {
            const result = await createDoc(this.$store.state.login.id);
            const id = result["document_id"];
            const temp = await initDoc("", 0, this.$store.state.login.id, "Doc content " + id, id, "EDIT", "Doc title " + id);
            console.log(temp);
            this.docs.push({ id: id, title: "Doc title " + id, status: "EDIT" });
        },
    },
};
</script>